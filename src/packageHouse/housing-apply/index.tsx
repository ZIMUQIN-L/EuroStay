import { View, Input, Textarea, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useState } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
import { useRouter } from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';

const Index = () => {
  const [gender, setGender] = useState<'male' | 'female' | 'both'>('')
  const [identity, setIdentity] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [contact, setContact] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [reason, setReason] = useState('')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })

  const router = useRouter();
  const id = router?.params?.id;
  const type = router?.params?.type;
  const startDate = router?.params?.startDate;
  const endDate = router?.params?.endDate;

  const getGenderId = (g) => {
    switch(g) {
      case 'female': return 0
      case 'male': return 1
      case 'both': return 2
      default: return -1
    }
  }

  Taro.useShareAppMessage(res => {
    return {
      title: '房源申请',
    };
  });

  const handleGenderSelect = (selected: 'male' | 'female' | 'both') => {
    setGender(selected)
  }

  const handleSubmit = () => {
    if (Number(type) === 0) {
      Taro.request({
        url: 'https://api.eurostay.co/app/property/applyProperty',
        method: 'POST',
        header: {
          token: GlobalStore.userInfo.token,
        },
        data: {
          propertyId: Number(id),
          startDate: startDate,
          endDate: endDate,
          gender: getGenderId(gender),
          occupation: identity,
          contact: contact,
          capacity: Number(guestCount),
          why: reason,
          selfIntro: introduction
        },
        success: (res) => {
          // console.log(res)
          Taro.showToast({
            title: '申请已提交',
            icon: 'success',
            duration: 2000,
          })
        },
        fail: function (err) {
          Taro.showToast({
            title: '网络请求失败，请重试',
            icon: 'none',
            duration: 2000,
          });
        },
        complete: function () {
          Taro.navigateBack()
        }
      })
    } else {
      Taro.request({
        url: 'https://api.eurostay.co/app/activity/applyActivity',
        method: 'POST',
        header: {
          token: GlobalStore.userInfo.token,
        },
        data: {
          activityId: Number(id),
          gender: getGenderId(gender),
          occupation: identity,
          contact: contact,
          why: reason,
          selfIntro: introduction
        },
        success: async (res) => {
          Taro.showToast({
            title: '申请已提交',
            icon: 'success',
            duration: 2000,
          })
          Taro.navigateBack()
        },
        fail: async function (err) {
          Taro.showToast({
            title: '网络请求失败，请重试',
            icon: 'none',
            duration: 2000,
          });
          Taro.navigateBack()
        },
        complete: function () {
          // Taro.navigateBack()
        }
      })
    }
  }

  return (
    <>
    <View className='info-card'>
      <View className='info-card-header'>
        <View className='purple-badge'/>
        基本信息
      </View>

      <Text className='info-card-sec-title'>性别*</Text>
      <View className='info-card-options'>
        <View 
          className={`info-card-option ${gender === 'male' ? 'active' : ''}`}
          onClick={() => handleGenderSelect('male')}
        >
          男
        </View>
        <View 
          className={`info-card-option ${gender === 'female' ? 'active' : ''}`}
          onClick={() => handleGenderSelect('female')}
        >
          女
        </View>
        <View 
          className={`info-card-option ${gender === 'both' ? 'active' : ''}`}
          onClick={() => handleGenderSelect('both')}
        >
          都有
        </View>
      </View>
      
      <Text className='info-card-sec-title'>身份*</Text>
      <Input 
        className='info-card-input'
        value={identity}
        onInput={e => setIdentity(e.detail.value)}
      />

      <Text className='info-card-sec-title'>自我介绍*</Text>
      <Input 
        className='info-card-input-multilines'
        value={introduction}
        onInput={e => setIntroduction(e.detail.value)}
      />

      <Text className='info-card-sec-title'>联系方式*</Text>
      <Input 
        className='info-card-input'
        value={contact}
        onInput={e => setContact(e.detail.value)}
      />
    </View>

    <View className='info-card'>
      <View className='info-card-header'>
        <View className='purple-badge'/>
        {Number(type) === 0 ? '换宿信息' : '申请信息'}
      </View>

      {/* <View className='info-card-context'> */}
      { Number(type) === 0 &&
        <Text className='info-card-sec-title'>换宿人数*</Text>
      }
      { Number(type) === 0 &&
        <Input 
          className='info-card-input'
          type='number'
          value={guestCount}
          onInput={e => setGuestCount(e.detail.value)}
        />
      }
      {/* </View> */}
      
      {/* <View className='info-card-context'> */}
        <Text className='info-card-sec-title'>{Number(type) === 0 ? '换宿原因' : '申请原因'}*</Text>
        <Textarea
          className='info-card-input'
          // placeholder='请说明换宿原因'
          value={reason}
          onInput={e => setReason(e.detail.value)}
        />
      {/* </View> */}
      { Number(type) === 0 &&
        <Text className='info-card-sec-title'>换宿时间*</Text>
      }
      { Number(type) === 0 &&
        <Textarea
          className='info-card-input'
          value={`${startDate}至${endDate}`}
          disabled={true}
        />
      }
    </View>

    {/* 提交按钮 */}
    <View className='purple-fill-button' onClick={handleSubmit}>
      提交申请
    </View>
    </>
  )
}

export default observer(Index)