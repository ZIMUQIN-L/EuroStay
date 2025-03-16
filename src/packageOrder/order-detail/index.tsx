import { View, Input, Textarea, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useState } from 'react'
import { useRouter } from '@tarojs/taro';
import Taro from '@tarojs/taro'
import OrderInfo from '../../components/OrderInfo';
import ApplicantInfo from '../../components/ApplicantInfo';
import UserCardSmall from '../../components/UserCardSmall';
import './index.scss'

const Index: React.FC = () => {
    Taro.setBackgroundColor({
        backgroundColor: '#f5f5f5'
    })

    const router = useRouter();
    const role = router?.params?.role;
    const status = router?.params?.status;

    const mockDataApplicant = {
        avatar: 'https://s3-alpha-sig.figma.com/img/97db/b7df/347e0ff352700de47ef1413cb12e9dc3?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KFeX8o~0GFsUQx4TGKDn-SlumPmawxwESuVBlUzsteaUWqte3eFcX-5RvxdIuq2V63F0i3CjMRg~tFLf3GcLVSlB97ym4BSBNjh2s3PvbqpCTYbbc771BA0feZ5MR4yC5MSYOHx1ikwtHdYOsfVU6hq~KA5ORGYvOxDHgGNyWsni6529kWpK5uYsPxU5B8~v~-peMQIZ5fAbbipKZeDIx4mLtPpLRsrt-2ms3ylO5qUfP8zCd-uHawKc6IJSiZZceiOSm7AjpGK~Ttiz~vumkm5ttMlkHDmQWrfMKMdwPl5fr7zfHxqHHA50jtnONpVET0wxZ5cM3X7MuGd6d9P3ZA__',
        role: '申请人',
        userName: '下辈子想当棵草',
        tags: ['游戏', 'INFJ', '旅游'],
        buttonText: '和ta聊聊',
        buttonFunc: () => {}
        }
    const mockDataOrder = {
        orderStatus: status === 'ongoing' ? '订单进行中' : status === 'expired' ? '订单已失效' : role === 'host' ? '订单待审核' : '订单待确认',
        orderId: '12345',
        houseName: '柏林小木屋',
        houseId: '2001',
        price: 30,
        days: 2,
        time: '2025年2月9日 至 2025年2月11日'
    }

    const mockDataUser = {
        title: role === 'host' ? '申请人信息': '你的信息',
        name: '下辈子想当棵草',
        id: '1111',
        gender: '女',
        identity: '学生',
        selfIntroduction: '我是一个超级爱旅游的背包客，暑期出来旅游想要交朋友并且省钱旅游～我会设计、做甜点等等，你如果喜欢的话我也可以和你分享哦！',
        numberOfGuests: 1,
        reason: '来旅游~超级喜欢你的房子！'
    }

    return (
        console.log(role, status),
        // how to show some <View> only if the user is a host? Say there's const isHost = true
        // <View></View> How? 
        <>
            {role === 'host' && <UserCardSmall {...mockDataApplicant}/>}
            <OrderInfo {...mockDataOrder}/>
            <ApplicantInfo {...mockDataUser}/>
            {role === 'host' && status === 'awaiting' && 
                <>
                    <View 
                        className='purple-fill-button' 
                        // onClick={console.log('cofirm')}
                    >
                        同意申请
                    </View>
                    <View 
                        className='purple-empty-button' 
                        // onClick={cancel}>
                    >
                        拒绝申请
                    </View>
                </>
            }
            {role === 'host' && status === 'ongoing' && 
                <View 
                    className='purple-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    联系Guest
                </View>
            }
            {role === 'host' && status === 'expired' && 
                <View 
                    className='purple-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    和申请人聊聊
                </View>
            }
            {role === 'guest' && status === 'awaiting' && 
                <>
                    <View 
                        className='yellow-fill-button' 
                        // onClick={console.log('cofirm')}
                    >
                        确认入住
                    </View>
                    <View 
                        className='yellow-empty-button' 
                        // onClick={cancel}>
                    >
                        取消入住
                    </View>
                </>
            }
            {role === 'guest' && status === 'ongoing' && 
                <View 
                    className='yellow-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    联系Host
                </View>
            }
            {role === 'guest' && status === 'expired' && 
                <View 
                    className='yellow-fill-button' 
                    // onClick={console.log('cofirm')}
                >
                    和房东聊聊
                </View>
            }
            {/* <GeustAwaitingOrder {...mockDataOrder}/>
            <GeustAwaitingUser {...mockDataUser}/>
            <GeustAwaitingButton/> */}
        </>
    );
};

export default observer(Index);