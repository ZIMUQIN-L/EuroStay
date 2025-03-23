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

const Index: React.FC = () => {
    Taro.setBackgroundColor({
        backgroundColor: '#f5f5f5'
    })

    const [infoHost, setInfoHost] = useState<UserShortInfo>({});
    const [infoGuest, setInfoGuest] = useState<UserShortInfo>({});
    const [infoOrder, setInfoOrder] = useState<OrderDetail>({});
    const [infoApplicant, setInfoApplicant] = useState<ApplicantDetail>({});

    const [loadingComplete, setLoadingComplete] = useState(false);

    const router = useRouter();
    const role = router?.params?.role;
    const status = router?.params?.status;
    const type = router?.params?.type;
    const id = router?.params?.id;
    const experienceId = router?.params?.experienceId;
    const title = router?.params?.title;

    const [rejectMessage, setRejectMessage] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [orderStatus, setOrderStatus] = useState(0);

    const hostConfirm = () => {
        Taro.request({
            url: Number(type) === 0 ? `https://api.eurostay.co/app/property/approvePropertyApplication`: `https://api.eurostay.co/app/activity/approveActivityApplication`,
            method: 'POST',
            header: {
                token: GlobalStore.userInfo.token,
            },
            data: {
                id: Number(id),
            },
            success: function (response) {
                if (response.statusCode === 200 && response.data.code === 0) {
                    Taro.showToast({
                        title: '已同意申请，等待 Guest 确认',
                        icon: 'none',
                        duration: 2000,
                    });
                    setTimeout(() => {
                        setLoadingComplete(false);
                        Taro.navigateBack();
                      }, 2000);
                } else {
                    Taro.showToast({
                        title: response.data.msg + ' 同意申请失败，请稍后再试',
                        icon: 'none',
                        duration: 2000,
                    })
                }
            },
            fail: function (err) {
                Taro.showToast({
                    title: '网络请求失败，请重试',
                    icon: 'none',
                    duration: 2000,
                });
            }
        });
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

    const hostReject = () => {
        Taro.request({
            url: Number(type) === 0 ? `https://api.eurostay.co/app/property/rejectPropertyApplication` : 'https://api.eurostay.co/app/activity/rejectActivityApplication',
            method: 'POST',
            header: {
                token: GlobalStore.userInfo.token,
            },
            data: {
                id: Number(id),
                reason: rejectMessage,
            },
            success: function (response) {
                console.log('hostReject', {
                    id: Number(id),
                    reason: rejectMessage,
                    url: Number(type) === 0 ? `https://api.eurostay.co/app/property/rejectPropertyApplication` : 'https://api.eurostay.co/app/activity/rejectActivityApplication',
                });
                if (response.statusCode === 200 && response.data.code === 0) {
                    Taro.showToast({
                        title: '已拒绝申请，等待 Guest 确认',
                        icon: 'none',
                        duration: 2000,
                    });
                    setTimeout(() => {
                        setLoadingComplete(false);
                        Taro.navigateBack();
                      }, 2000);
                } else {
                    Taro.showToast({
                        title: response.data.msg + ' 拒绝申请失败，请稍后再试',
                        icon: 'none',
                        duration: 2000,
                    })
                }
            },
            fail: function (err) {
                Taro.showToast({
                    title: '网络请求失败，请重试',
                    icon: 'none',
                    duration: 2000,
                });
            }
        });
    }

    const guestConfirm = () => {
        Taro.request({
            url: Number(type) === 0 ? `https://api.eurostay.co/app/property/acceptOffer` : 'https://api.eurostay.co/app/activity/acceptOffer',
            method: 'POST',
            header: {
                token: GlobalStore.userInfo.token,
            },
            data: {
                id: Number(id),
            },
            success: function (response) {
                if (response.statusCode === 200 && response.data.code === 0) {
                    Taro.showToast({
                        title: '已确认订单',
                        icon: 'none',
                        duration: 2000,
                    });
                    setTimeout(() => {
                        setLoadingComplete(false);
                        Taro.navigateBack();
                      }, 2000);
                } else {
                    Taro.showToast({
                        title: response.data.msg + ' 确认订单失败，请稍后再试',
                        icon: 'none',
                        duration: 2000,
                    })
                }
            },
            fail: function (err) {
                Taro.showToast({
                    title: '网络请求失败，请重试',
                    icon: 'none',
                    duration: 2000,
                });
            }
        });
    }

    const guestReject = () => {
        Taro.request({
            url: Number(type) === 0 ? `https://api.eurostay.co/app/property/rejectOffer` : 'https://api.eurostay.co/app/activity/rejectOffer',
            method: 'POST',
            header: {
                token: GlobalStore.userInfo.token,
            },
            data: {
                id: Number(id),
                reason: rejectMessage,
            },
            success: function (response) {
                if (response.statusCode === 200 && response.data.code === 0) {
                    Taro.showToast({
                        title: '已拒绝订单',
                        icon: 'none',
                        duration: 2000,
                    });
                    setTimeout(() => {
                        setLoadingComplete(false);
                        Taro.navigateBack();
                      }, 2000);
                } else {
                    Taro.showToast({
                        title: response.data.msg + ' 拒绝订单失败，请稍后再试',
                        icon: 'none',
                        duration: 2000,
                    })
                }
            },
            fail: function (err) {
                Taro.showToast({
                    title: '网络请求失败，请重试',
                    icon: 'none',
                    duration: 2000,
                });
            }
        });
    }

    const getOrderStatus = (status: number): string => {
        switch (status) {
            case 0:
                return "申请中";
            case 1:
                return "申请通过待确认";
            case 2:
                return "进行中";
            case 3:
                return "待评价";
            case 4:
                return "已失效";
            case 5:
                return "已完成";
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
        // const dateObj = new Date(date.replace('-', '/').replace('-', '/'));
        // return `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDay()}日`;
        return date.replace('-', '/').replace('-', '/').substring(0, 10);
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

    const getOrderDetail = () => {
        if (loadingComplete) {
            return;
        }
        if (Number(type) === 0) {
            Taro.request({
                url: `https://api.eurostay.co/app/property/showApplicationInfo`,
                method: 'POST',
                header: {
                    token: GlobalStore.userInfo.token,
                },
                data: {
                    id: Number(id),
                },
                success: function (response) {
                    console.log('getOrderDetail', response.data.result);
                    setInfoGuest({
                        uid: response.data.result.guestInfo.uid,
                        avatar: response.data.result.guestInfo.avatar,
                        role: 'Guest',
                        username: response.data.result.guestInfo.username,
                        tags: response.data.result.guestInfo.tags,
                        buttonText: '和ta聊聊',
                    });
                    setInfoOrder({
                        type: 0,
                        orderStatus: getOrderStatus(response.data.result.status),
                        orderId: response.data.result.applicationId,
                        houseName: title,
                        houseId: Number(experienceId),
                        price: response.data.result.price,
                        time: `${getDate(response.data.result.startDate)} 至 ${getDate(response.data.result.endDate)}`,
                        refuseReason: rejectMessage,
                    });
                    setOrderStatus(response.data.result.status);
                    setInfoHost({
                        uid: response.data.result.hostInfo.uid,
                        avatar: response.data.result.hostInfo.avatar,
                        role: 'Host',
                        username: response.data.result.hostInfo.username,
                        tags: response.data.result.hostInfo.tags,
                        buttonText: '和ta聊聊',
                    });
                    setInfoApplicant({
                        type: 0,
                        title: role === 'host' ? '申请人信息': '你的信息',
                        name: response.data.result.guestInfo.username,
                        id: response.data.result.guestInfo.uid,
                        gender: getGender(response.data.result.gender),
                        identity: response.data.result.occupation,
                        selfIntroduction: response.data.result.selfIntro,
                        numberOfGuests: response.data.result.capacity,
                        reason: response.data.result.why
                    });
                },
                fail: function (err) {
                    Taro.showToast({
                        title: '网络请求失败，请重试',
                        icon: 'none',
                        duration: 2000,
                    });
                },
                complete: function () {
                    setLoadingComplete(true);
                }
            });
        } else {
            Taro.request({
                url: 'https://api.eurostay.co/app/activity/showApplicationInfo',
                method: 'POST',
                header: {
                    token: GlobalStore.userInfo.token,
                },
                data: {
                    id: Number(id),
                },
                success: function (response) {
                    setInfoGuest({
                        uid: response.data.result.guestInfo.uid,
                        avatar: response.data.result.guestInfo.avatar,
                        role: 'Guest',
                        username: response.data.result.guestInfo.username,
                        tags: response.data.result.guestInfo.tags,
                        buttonText: '和ta聊聊',
                    });
                    setInfoOrder({
                        type: 1,
                        orderStatus: getOrderStatus(response.data.result.status),
                        orderId: response.data.result.applicationId,
                        houseName: title,
                        houseId: Number(experienceId),
                        price: response.data.result.price,
                        time: response.data.result.startDate,
                        refuseReason: rejectMessage,
                    });
                    setOrderStatus(response.data.result.status);
                    setInfoHost({
                        uid: response.data.result.hostInfo.uid,
                        avatar: response.data.result.hostInfo.avatar,
                        role: 'Host',
                        username: response.data.result.hostInfo.username,
                        tags: response.data.result.hostInfo.tags,
                        buttonText: '和ta聊聊',
                    });
                    setInfoApplicant({
                        type: 1,
                        title: role === 'host' ? '申请人信息': '你的信息',
                        name: response.data.result.guestInfo.username,
                        id: response.data.result.guestInfo.uid,
                        gender: getGender(response.data.result.gender),
                        identity: response.data.result.occupation,
                        selfIntroduction: response.data.result.selfIntro,
                        reason: response.data.result.why
                    });
                },
                fail: function (err) {
                    Taro.showToast({
                        title: '网络请求失败，请重试',
                        icon: 'none',
                        duration: 2000,
                    });
                },
                complete: function () {
                    setLoadingComplete(true);
                }
            });
        }
    }
    
    useEffect(() => {
        getOrderDetail();
    }, []);

    return (
        <>
            {/* {role === 'host' && <UserCardSmall {...mockDataApplicant}/>}
            <OrderInfo {...mockDataOrder}/>
            <ApplicantInfo {...mockDataUser}/> */}
            {console.log('role', role)}
            {console.log('orderStatus', orderStatus)}
            {console.log('status', status)}
            {loadingComplete && role === 'host' && <UserCardSmall {...infoGuest}/>}
            {/* {role === 'guest' && <UserCardSmall {...infoHost}/>} */}
            {loadingComplete && <OrderInfo {...infoOrder}/>}
            {loadingComplete && <ApplicantInfo {...infoApplicant}/>}
            {loadingComplete && role === 'host' && status === 'awaiting' && orderStatus === 0 && 
                <>
                    <View 
                        className='purple-fill-button' 
                        onClick={() => hostConfirm()}
                    >
                        同意申请
                    </View>
                    <View 
                        className='purple-empty-button' 
                        onClick={() => setShowRejectModal(true)}
                    >
                        拒绝申请
                    </View>
                </>
            }
            {loadingComplete && role === 'host' && status === 'ongoing' && 
                <View 
                    className='purple-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    联系Guest
                </View>
            }
            {loadingComplete && role === 'host' && status === 'awaiting' && orderStatus === 1 && 
                <View 
                    className='purple-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    联系Guest
                </View>
            }
            {loadingComplete && role === 'host' && status === 'expired' && 
                <View 
                    className='purple-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    和申请人聊聊
                </View>
            }
            {loadingComplete && role === 'guest' && status === 'awaiting' && orderStatus === 1 && 
                <>
                    <View 
                        className='yellow-fill-button' 
                        onClick={() => guestConfirm()}
                    >
                        确认{Number(type) === 0 ? '入住' : '参加'}
                    </View>
                    <View 
                        className='yellow-empty-button' 
                        onClick={() => setShowRejectModal(true)}
                    >
                        取消{Number(type) === 0 ? '入住' : '参加'}
                    </View>
                </>
            }
            {loadingComplete && role === 'guest' && status === 'ongoing' && 
                <View 
                    className='yellow-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    联系Host
                </View>
            }
            {loadingComplete && role === 'guest' && status === 'awaiting' && orderStatus === 0 && 
                <View 
                    className='yellow-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    联系Host
                </View>
            }
            {loadingComplete && role === 'guest' && status === 'expired' && 
                <View 
                    className='yellow-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    和Host聊聊
                </View>
            }
            {/* 拒绝弹窗 */}
            {showRejectModal && (
                <View className='reject-modal-mask'>
                <View className='reject-modal'>
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
        </>
    );
};

export default observer(Index);