import { View, Input, Textarea, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
import { useRouter } from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { API } from '@utils/apiService';

const Index = () => {
  const [maleCount, setMaleCount] = useState('')
  const [femaleCount, setFemaleCount] = useState('')
  const [description, setDescription] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [contact, setContact] = useState('')
  const [skill, setSkill] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter();
  const id = router?.params?.id;
  const startDate = router?.params?.startDate;
  const endDate = router?.params?.endDate;

  useEffect(() => {
    // Initialize self-intro from GlobalStore
    if (GlobalStore.userInfo.aboutMe) {
      setIntroduction(GlobalStore.userInfo.aboutMe);
    }
  }, []);

  const handleNumberInput = (e, setter) => {
    const value = e.detail.value;
    // Only allow numbers and remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  }

  Taro.useShareAppMessage(res => {
    return {
      title: '房源申请',
    };
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Check if all required fields are filled
    if (!description || !introduction || !contact || !skill || maleCount == null || femaleCount == null) {
      Taro.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    
    // Check if at least one gender count is provided and valid
    const maleNum = Number(maleCount) || 0;
    const femaleNum = Number(femaleCount) || 0;
    
    if (maleNum <= 0 && femaleNum <= 0) {
      Taro.showToast({
        title: '请填写正确的人数',
        icon: 'none',
        duration: 2000,
      })
      return
    }

    setIsSubmitting(true);
    
    try {
      await API.property.applyProperty({
        pid: Number(id),
        maleNumber: maleNum,
        femaleNumber: femaleNum,
        description,
        startDate: startDate || '',
        endDate: endDate || '',
        contact,
        selfIntro: introduction,
        skill
      });

      Taro.showToast({
        title: '申请已提交',
        icon: 'success',
        duration: 2000,
      });
      
      setTimeout(() => {
        Taro.navigateBack();
      }, 2000);
    } catch (error) {
      Taro.showToast({
        title: error.message || '申请提交失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
    <View className='info-card'>
      <View className='info-card-header'>
        <View className='purple-badge'/>
        入住基本信息
      </View>

      <Text className='info-card-sec-title'>男生人数</Text>
      <Input 
        className='info-card-input'
        type='number'
        value={maleCount}
        onInput={(e) => handleNumberInput(e, setMaleCount)}
        placeholder='请输入男生人数（0表示无男生）'
        maxlength={2}
      />

      <Text className='info-card-sec-title'>女生人数</Text>
      <Input 
        className='info-card-input'
        type='number'
        value={femaleCount}
        onInput={(e) => handleNumberInput(e, setFemaleCount)}
        placeholder='请输入女生人数（0表示无女生）'
        maxlength={2}
      />
      
      <Text className='info-card-sec-title'>出行原因*</Text>
      <Textarea 
        className='info-card-input-multilines'
        value={description}
        onInput={e => setDescription(e.detail.value)}
        placeholder="你这趟为什么来这里呢，是出差，旅行或者是看演唱会？"
        autoHeight
        showConfirmBar={false}
      />

      <Text className='info-card-sec-title'>入住时间*</Text>
      <Textarea
        className='info-card-input'
        value={`${startDate} 至 ${endDate}`}
        disabled={true}
      />

      <Text className='info-card-sec-title'>你的联系方式*</Text>
      <Input 
        className='info-card-input'
        value={contact}
        placeholder="请填写一下自己的联系方式方便Host后续联系哦~"
        onInput={e => setContact(e.detail.value)}
      />
    </View>

    <View className='info-card'>
      <View className='info-card-header'>
        <View className='purple-badge'/>
        其他信息
      </View>

      <Text className='info-card-sec-title'>自我介绍*</Text>
      <Textarea 
        className='info-card-input-multilines'
        value={introduction}
        onInput={e => setIntroduction(e.detail.value)}
        placeholder='可以填写一个简单的自我介绍，讲讲自己的兴趣爱好，或者一些能为Host做的事情吧~'
        autoHeight
        showConfirmBar={false}
      />
      
      <Text className='info-card-sec-title'>我可以用什么技能换宿*</Text>
      <Textarea
        className='info-card-input-multilines'
        value={skill}
        onInput={e => setSkill(e.detail.value)}
        placeholder='可以讲讲能为Host做的一些事情吗？可以参考Host的需求，或许可以解锁技能/房源换宿哦~'
        autoHeight
        showConfirmBar={false}
      />
    </View>

    {/* 提交按钮 */}
    <View 
      className={`purple-fill-button ${isSubmitting ? 'disabled' : ''}`} 
      onClick={handleSubmit}
    >
      提交申请
    </View>
    </>
  )
}

export default observer(Index)