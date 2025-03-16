import { View, Input, Textarea, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useState } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'

const Index = () => {
  const [gender, setGender] = useState<'male' | 'female' | 'both'>('male')
  const [identity, setIdentity] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [contact, setContact] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [reason, setReason] = useState('')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })

  Taro.useShareAppMessage(res => {
    return {
      title: '房源申请',
    };
  });

  const handleGenderSelect = (selected: 'male' | 'female' | 'both') => {
    setGender(selected)
  }

  const handleDateSelect = () => {
    Taro.showToast({
      title: '选择日期功能开发中',
      icon: 'none'
    })
  }

  const handleSubmit = () => {
    // 这里添加表单验证和提交逻辑
    // Taro.showToast({
    //   title: '申请已提交',
    //   icon: 'success'
    // })
    Taro.navigateBack()
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
        换宿信息
      </View>

      {/* <View className='info-card-context'> */}
        <Text className='info-card-sec-title'>换宿人数*</Text>
        <Input 
          className='info-card-input'
          type='number'
          value={guestCount}
          onInput={e => setGuestCount(e.detail.value)}
        />
      {/* </View> */}
      
      {/* <View className='info-card-context'> */}
        <Text className='info-card-sec-title'>换宿原因*</Text>
        <Textarea
          className='info-card-input'
          // placeholder='请说明换宿原因'
          value={reason}
          onInput={e => setReason(e.detail.value)}
        />
      {/* </View> */}
    </View>

    {/* 提交按钮 */}
    <View className='purple-fill-button' onClick={handleSubmit}>
      提交申请
    </View>
    </>
  )
}

export default observer(Index)