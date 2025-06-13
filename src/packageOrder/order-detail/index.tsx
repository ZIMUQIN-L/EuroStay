import { View, Input, Textarea, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react'
import { useRouter } from '@tarojs/taro';
import Taro from '@tarojs/taro'
import OrderInfo from '../../components/OrderInfo';
import ApplicantInfo from '../../components/ApplicantInfo';
import UserCardSmall from '../../components/UserCardSmall';
import './index.scss'
import GlobalStore from '@store/GlobalStore';
import { UserShortInfo, OrderDetail, ApplicantDetail } from '@utils/interfaces';
import { API } from '@utils/apiService';

const Index: React.FC = () => {
    Taro.setBackgroundColor({
        backgroundColor: '#f5f5f5'
    })

    const [infoHost, setInfoHost] = useState<UserShortInfo>({
        uid: 0,
        avatar: '',
        role: 'Host',
        username: '',
        tags: [],
        buttonText: '',
        buttonFunc: () => {}
    });
    
    const [infoGuest, setInfoGuest] = useState<UserShortInfo>({
        uid: 0,
        avatar: '',
        role: 'Guest',
        username: '',
        tags: [],
        buttonText: '',
        buttonFunc: () => {}
    });
    
    const [infoOrder, setInfoOrder] = useState<OrderDetail>({
        type: 0,
        orderStatus: '',
        orderId: 0,
        houseName: '',
        houseId: 0,
        price: 0,
        time: '',
        refuseReason: '',
        orderTime: ''
    });
    
    const [infoApplicant, setInfoApplicant] = useState<ApplicantDetail>({
        type: 0,
        title: '',
        name: '',
        id: 0,
        gender: '',
        identity: '',
        selfIntroduction: '',
        femaleNumber: 0,
        maleNumber: 0,
        reason: '',
        skill: ''
    });

    const [ifGotRejectReason, setIfGotRejectReason] = useState(false);

    const [loadingComplete, setLoadingComplete] = useState(false);

    const router = useRouter();
    const role = router?.params?.role;
    const status = router?.params?.status;
    const type = router?.params?.type;
    const id = router?.params?.id;
    const experienceId = router?.params?.experienceId;
    const title = router?.params?.title;

    const [rejectMessage, setRejectMessage] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [orderStatus, setOrderStatus] = useState<number | undefined>(undefined);
    const [showChatModal, setShowChatModal] = useState(false)
    const [chatMessage, setChatMessage] = useState('')
    const [username, setUsername] = useState('')

    const hostConfirm = async () => {
        try {
            await API.order.approveOrder(Number(id));
            
            Taro.showToast({
                title: '已同意申请',
                icon: 'none',
                duration: 2000,
            });
            
            setTimeout(() => {
                setLoadingComplete(false);
                Taro.navigateBack();
            }, 2000);
        } catch (error) {
            // Error handling is done in the apiRequest function
        }
    }

    const handelReject = () => {
        if (rejectMessage === '') {
            Taro.showToast({
                title: '请填写拒绝理由',
                icon: 'none',
                duration: 2000,
            });
            return;
        }
        if (role === 'host') {
            hostReject();
        } else {
            guestReject();
        }
    }

    const hostReject = async () => {
        try {
            await API.order.rejectOrder(Number(id), rejectMessage);
            
            Taro.showToast({
                title: '已拒绝申请',
                icon: 'none',
                duration: 2000,
            });
            
            setTimeout(() => {
                setLoadingComplete(false);
                Taro.navigateBack();
            }, 2000);
        } catch (error) {
            // Error handling is done in the apiRequest function
        }
    }

    const guestConfirm = async () => {
        try {
            await API.order.acceptOffer(Number(id));
            
            Taro.showToast({
                title: '已确认订单',
                icon: 'none',
                duration: 2000,
            });
            
            setTimeout(() => {
                setLoadingComplete(false);
                Taro.navigateBack();
            }, 2000);
        } catch (error) {
            // Error handling is done in the apiRequest function
        }
    }

    const guestReject = async () => {
        try {
            await API.order.rejectOffer(Number(id), rejectMessage);
            
            Taro.showToast({
                title: '已拒绝订单',
                icon: 'none',
                duration: 2000,
            });
            
            setTimeout(() => {
                setLoadingComplete(false);
                Taro.navigateBack();
            }, 2000);
        } catch (error) {
            // Error handling is done in the apiRequest function
        }
    }

    const getOrderStatus = (status: number, orderType?: number): string => {
        switch (status) {
            case 1:
                // Different status text based on order type
                if (orderType === 0) { // Host offer
                    return "旅行者未确认";
                } else { // Guest application
                    return "Host未确认";
                }
            case 2:
                return "进行中";
            case 3:
                return "已完成";
            case 4:
                return "已失效";
            default:
                return "";
        }
    }

    const getDays = (startDate: string, endDate: string): number => {
        if (startDate === '' || endDate === '') {
            return 0;
        }
        const start = new Date(startDate.replace('-', '/').replace('-', '/'));
        const end = new Date(endDate.replace('-', '/').replace('-', '/'));
        return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) - 1;
    }

    const getDate = (date: string): string => {
        if (date === '') {
            return '';
        }
        return date.replace('-', '/').replace('-', '/').substring(0, 10);
    }
    
    const formatDateChinese = (date: string): string => {
        if (date === '' || !date) {
            return '';
        }
        
        try {
            // Handle full datetime format like "2025-06-11 08:00:00"
            // Extract just the date part first
            const datePart = date.split(' ')[0];
            const parts = datePart.split('-');
            
            if (parts.length !== 3) return date;
            return `${parts[0]}年${parts[1]}月${parts[2]}日`;
        } catch (e) {
            return date;
        }
    }
    
    const formatDateTimeWithHours = (dateTime: string): string => {
        if (!dateTime) return '';
        
        try {
            // First try to parse directly if it's a standard format
            let date = new Date(dateTime);
            
            // If the date is invalid, try manual parsing
            if (isNaN(date.getTime())) {
                // Parse format like "2025-06-11 08:00:00"
                const parts = dateTime.split(/[- :]/);
                if (parts.length >= 6) {
                    // parts[0] = year, parts[1] = month, parts[2] = day
                    // parts[3] = hours, parts[4] = minutes, parts[5] = seconds
                    date = new Date(
                        parseInt(parts[0]), 
                        parseInt(parts[1]) - 1, // Months are 0-indexed in JS
                        parseInt(parts[2]),
                        parseInt(parts[3]),
                        parseInt(parts[4]),
                        parseInt(parts[5])
                    );
                }
            }
            
            // Check if date is valid after parsing
            if (isNaN(date.getTime())) {
                return dateTime; // Return original if parsing failed
            }
            
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            
            // Format as YYYY年MM月DD日 HH:MM
            return `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        } catch (e) {
            return dateTime;
        }
    }

    const getGender = (gender: number): string => {
        switch (gender) {
            case 0:
                return "女";
            case 1:
                return "男";
            case 2:
                return "都有";
            default:
                return "";
        }
    }

    const getOrderDetail = async () => {
        if (loadingComplete) {
            return;
        }
        
        try {
            const response = await API.order.getOrderDetail(Number(id));
            const orderType = response.type; // 0: Host offer, 1: Guest application
            
            // Format order creation time to match "2025年2月11日 15:00" format
            const orderDateTime = response.createTime ? 
                formatDateTimeWithHours(response.createTime) : '';
                
            // Format exchange dates in Chinese format with space around 至
            const formattedTime = `${formatDateChinese(response.startDate)}至${formatDateChinese(response.endDate)}`;
                
            if (response.status === 4) { // 已失效
                setRejectReason(response.result || '');
                setInfoOrder({
                    type: orderType,
                    orderStatus: getOrderStatus(response.status, orderType),
                    orderId: response.id,
                    houseName: response.title || title || '',
                    houseId: Number(response.pid),
                    price: response.price,
                    time: formattedTime,
                    refuseReason: response.result || '',
                    orderTime: orderDateTime
                });
                setIfGotRejectReason(true);
            } else {
                setRejectReason('');
                setInfoOrder({
                    type: orderType,
                    orderStatus: getOrderStatus(response.status, orderType),
                    orderId: response.id,
                    houseName: response.title || title || '',
                    houseId: Number(response.pid),
                    price: response.price,
                    time: formattedTime,
                    refuseReason: '',
                    orderTime: orderDateTime
                });
                setIfGotRejectReason(true);
            }
            
            setInfoGuest({
                uid: response.guestInfo.uid,
                avatar: response.guestInfo.avatar,
                role: 'Guest',
                username: response.guestInfo.username,
                tags: response.guestInfo.tags,
                buttonText: '和ta聊聊',
                buttonFunc: handleChat,
            });
            
            setOrderStatus(response.status);
            
            setInfoHost({
                uid: response.hostInfo.uid,
                avatar: response.hostInfo.avatar,
                role: 'Host',
                username: response.hostInfo.username,
                tags: response.hostInfo.tags,
                buttonText: '和ta聊聊',
                buttonFunc: handleChat,
            });
            
            if (orderType === 0) {
                // Type 0: Host initiated offer - always show Host information
                const hostGender = response.hostInfo.userGender;
                const hostGenderStr = getGender(hostGender);
                
                setInfoApplicant({
                    type: orderType,
                    title: 'Host信息', // Always "Host信息" for host offers
                    name: response.hostInfo.username,
                    id: response.hostInfo.uid,
                    gender: hostGenderStr,
                    identity: '',
                    selfIntroduction: response.hostInfo.aboutMe || '',
                    femaleNumber: response.hostInfo.femaleNumber || 0,
                    maleNumber: response.hostInfo.maleNumber || 0,
                    reason: '', // Don't show reason for host offers
                    skill: ''
                });
            } else {
                // Type 1: Guest initiated application - always show Applicant information
                const guestGender = response.guestInfo.userGender;
                const guestGenderStr = getGender(guestGender);
                
                setInfoApplicant({
                    type: orderType,
                    title: '申请人信息', // Always "申请人信息" for guest applications
                    name: response.guestInfo.username,
                    id: response.guestInfo.uid,
                    gender: guestGenderStr,
                    identity: '', 
                    selfIntroduction: response.guestInfo.aboutMe || '',
                    femaleNumber: parseInt(response.guestInfo.femaleNumber || '0'),
                    maleNumber: parseInt(response.guestInfo.maleNumber || '0'),
                    reason: response.guestInfo.description || '', // Using description as reason
                    skill: response.guestInfo.skill || '' // Add the skill field from guestInfo
                });
            }
        } catch (error) {
            // Error handling is done in the apiRequest function
        } finally {
            setLoadingComplete(true);
        }
    }
    
    useEffect(() => {
        getOrderDetail();
        
        // Map URL status parameter to numeric orderStatus if needed
        if (status && !loadingComplete) {
            const statusMap = {
                'awaiting': 1,
                'ongoing': 2,
                'completed': 3,
                'expired': 4
            };
            
            if (statusMap[status]) {
                setOrderStatus(statusMap[status]);
            }
        }
    }, []);

    const handleChat = () => {
        setShowChatModal(true)
    }

    const handleSendChat = async () => {
        try {
            const toUid = role === 'host' ? infoGuest.uid : infoHost.uid;
            let content = `订单${infoOrder.houseName}的${role === 'host' ? 'Host': 'Guest'}${role === 'host' ? infoHost.username : infoGuest.username}向您发送了消息：${chatMessage}`;
            
            await API.messages.sendLikeMsg(toUid, content);
            
            Taro.showToast({
                title: '消息已发送',
                icon: 'success'
            });
        } catch (error) {
            // Error handling is done in the apiRequest function
        }
        
        setShowChatModal(false);
        setChatMessage('');
    }

    return (
        <View style={{ paddingBottom: '120px' }}>
            {/* {role === 'host' && <UserCardSmall {...mockDataApplicant}/>}
            <OrderInfo {...mockDataOrder}/>
            <ApplicantInfo {...mockDataUser}/> */}
            {/* {console.log('role', role)}
            {console.log('orderStatus', orderStatus)}
            {console.log('status', status)} */}
            {loadingComplete && role === 'host' && <UserCardSmall {...infoGuest}/>}
            {loadingComplete && role === 'guest' && <UserCardSmall {...infoHost}/>}
            {loadingComplete && ifGotRejectReason && <OrderInfo {...infoOrder}/>}
            {loadingComplete && <ApplicantInfo {...infoApplicant}/>}
            
            {/* Status 1 buttons - depends on order type */}
            {loadingComplete && orderStatus === 1 && infoOrder.type === 0 && role === 'host' && 
                <View 
                    className='purple-fill-button' 
                    onClick={handleChat}
                >
                    联系Guest
                </View>
            }
            
            {loadingComplete && orderStatus === 1 && infoOrder.type === 0 && role === 'guest' && 
                <>
                    <View 
                        className='yellow-fill-button' 
                        onClick={() => guestConfirm()}
                    >
                        接受TA的邀请
                    </View>
                    <View 
                        className='yellow-empty-button' 
                        onClick={() => setShowRejectModal(true)}
                    >
                        拒绝邀请
                    </View>
                </>
            }
            
            {loadingComplete && orderStatus === 1 && infoOrder.type === 1 && role === 'host' && 
                <>
                    <View 
                        className='purple-fill-button' 
                        onClick={() => hostConfirm()}
                    >
                        通过TA的申请
                    </View>
                    <View 
                        className='purple-empty-button' 
                        onClick={() => setShowRejectModal(true)}
                    >
                        拒绝申请
                    </View>
                </>
            }
            
            {loadingComplete && orderStatus === 1 && infoOrder.type === 1 && role === 'guest' && 
                <View 
                    className='yellow-fill-button' 
                    onClick={handleChat}
                >
                    联系Host
                </View>
            }
            
            {/* Status 2 buttons */}
            {loadingComplete && role === 'host' && orderStatus === 2 && 
                <View 
                    className='purple-fill-button' 
                    onClick={handleChat}
                >
                    联系Guest
                </View>
            }
            {loadingComplete && role === 'guest' && orderStatus === 2 && 
                <View 
                    className='yellow-fill-button' 
                    onClick={handleChat}
                >
                    联系Host
                </View>
            }
            
            {/* Status 3 buttons */}
            {loadingComplete && role === 'host' && orderStatus === 3 && 
                <View 
                    className='purple-fill-button' 
                    onClick={handleChat}
                >
                    联系Guest
                </View>
            }
            {loadingComplete && role === 'guest' && orderStatus === 3 && 
                <View 
                    className='yellow-fill-button' 
                    onClick={handleChat}
                >
                    联系Host
                </View>
            }
            
            {/* Status 4 buttons */}
            {loadingComplete && role === 'host' && orderStatus === 4 && 
                <View 
                    className='purple-fill-button' 
                    onClick={handleChat}
                >
                    和申请人聊聊
                </View>
            }
            {loadingComplete && role === 'guest' && orderStatus === 4 && 
                <View 
                    className='yellow-fill-button' 
                    onClick={handleChat}
                >
                    和Host聊聊
                </View>
            }
            
            {/* 聊天弹窗 */}
            {showChatModal && (
                <View 
                    className='like-modal-mask'
                    onClick={() => setShowChatModal(false)}
                >
                    <View 
                        className='like-modal'
                        onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡，防止点击modal内部时关闭
                        }}
                    >
                        <View className='modal-title'>您将给{role === 'host' ? infoGuest.username : infoHost.username}发送消息</View>
                        <Input
                            className='message-input'
                            placeholder='说点什么吧...'
                            value={chatMessage}
                            onInput={e => setChatMessage(e.detail.value)}
                        />
                        <View 
                            className={role === 'host' ? 'purple-confirm-button' : 'yellow-confirm-button'}
                            onClick={handleSendChat}
                        >
                            发送
                        </View>
                    </View>
                </View>
            )}
            
            {/* 拒绝弹窗 */}
            {showRejectModal && (
                <View 
                    className='reject-modal-mask'
                    onClick={() => setShowRejectModal(false)}
                >
                    <View 
                        className='reject-modal'
                        onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡，防止点击modal内部时关闭
                        }}
                    >
                        <View className='modal-title'>确认拒绝？请简述拒绝理由</View>
                        <Input
                            className='message-input'
                            placeholder='请说明拒绝理由，此理由将发给对方'
                            value={rejectMessage}
                            onInput={e => setRejectMessage(e.detail.value)}
                        />
                        <View 
                            className={role === 'host' ? 'purple-confirm-button' : 'yellow-confirm-button'}
                            onClick={handelReject}
                        >
                            发送
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default observer(Index);