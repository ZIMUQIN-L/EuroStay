import { View, Input, Textarea, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
import { useRouter } from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';

const Index = () => {
  const [gender, setGender] = useState('')
  const [identity, setIdentity] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [contact, setContact] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [reason, setReason] = useState('')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter();
  const id = router?.params?.id;
  const type = router?.params?.type;
  const startDate = router?.params?.startDate;
  const endDate = router?.params?.endDate;

  useEffect(() => {
    // Initialize gender and self-intro from GlobalStore
    if (GlobalStore.userInfo.gender !== undefined) {
      setGender(GlobalStore.userInfo.gender === 0 ? 'female' : 
                GlobalStore.userInfo.gender === 1 ? 'male' : 'both');
    }
    if (GlobalStore.userInfo.aboutMe) {
      setIntroduction(GlobalStore.userInfo.aboutMe);
    }
  }, []);

  const getGenderId = (g) => {
    switch(g) {
      case 'female': return 0
      case 'male': return 1
      case 'both': return 2
      default: return -1
    }
  }

  const handleGuestCountInput = (e) => {
    const value = e.detail.value;
    // Only allow numbers and remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    setGuestCount(numericValue);
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
    if (isSubmitting) return;

    if (Number(type) === 0) {   
      if (!identity || !introduction || !contact || !reason || !gender || !guestCount) {
        Taro.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      // check if guestCount is a number, and it is a integer that is greater than 0
      if (!/^\d+$/.test(guestCount) || Number(guestCount) <= 0) {
        Taro.showToast({
          title: '请填写正确的人数',
          icon: 'none',
          duration: 2000,
        })
        return
      }
    } else {
      if (!identity || !introduction || !contact || !reason || !gender) {
        Taro.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 2000,
        })
        return
      }
    }

    setIsSubmitting(true);
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
          if (res.statusCode === 200 && res.data.code === 0) {
            Taro.showToast({
              title: '申请已提交',
              icon: 'success',
              duration: 2000,
            })
            setTimeout(() => {
              Taro.navigateBack();
            }, 2000);
          } else {
            Taro.showToast({
              title: res.data.msg + ' 申请提交失败，请重试',
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
        },
        complete: () => {
          setIsSubmitting(false);
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
          if (res.statusCode === 200 && res.data.code === 0) {
            Taro.showToast({
                title: '申请已提交',
                icon: 'success',
                duration: 2000,
              })
              setTimeout(() => {
                Taro.navigateBack();
              }, 2000);
            // const paymentData = res.data.data;
            // await Taro.requestPayment({
            //     timeStamp: paymentData.timeStamp,
            //     nonceStr: paymentData.nonceStr,
            //     package: paymentData.package,
            //     signType: paymentData.signType,
            //     paySign: paymentData.paySign,
            //     success: () => {
            //       Taro.showToast({
            //         title: '支付成功',
            //         icon: 'success'
            //       });
            //         setTimeout(() => {
            //         Taro.navigateBack();
            //         }, 2000);
            //     },
            //     fail: (err) => {
            //       console.error('支付失败', err);
            //       Taro.showToast({
            //         title: '支付失败',
            //         icon: 'none'
            //       });
            //     }
            //   });
            // Taro.showToast({
            //   title: '申请已提交',
            //   icon: 'success',
            //   duration: 2000,
            // })
            // setTimeout(() => {
            //   Taro.navigateBack();
            // }, 2000);
          } else {
            Taro.showToast({
              title: res.data.msg + ' 申请提交失败，请重试',
              icon: 'none',
              duration: 2000,
            })
          }
        },
        fail: async function (err) {
          Taro.showToast({
            title: '网络请求失败，请重试',
            icon: 'none',
            duration: 2000,
          });
        },
        complete: () => {
          setIsSubmitting(false);
        }
      })
    }
  }

  return (
    <>
    <View className='info-card'>
      <View className='info-card-header'>
        <View className='purple-badge'/>
        入住基本信息
      </View>

      <Text className='info-card-sec-title'>旅客生理性别*</Text>
      <View className='info-card-options'>
      <View 
          className={`info-card-option ${gender === 'female' ? 'active' : ''}`}
          onClick={() => handleGenderSelect('female')}
        >
          女
        </View>
        <View 
          className={`info-card-option ${gender === 'male' ? 'active' : ''}`}
          onClick={() => handleGenderSelect('male')}
        >
          男
        </View>
        <View 
          className={`info-card-option ${gender === 'both' ? 'active' : ''}`}
          onClick={() => handleGenderSelect('both')}
        >
          都有
        </View>
      </View>

        {/* <View className='info-card-context'> */}
        { Number(type) === 0 &&
        <Text className='info-card-sec-title'>旅客人数*</Text>
      }
      { Number(type) === 0 &&
        <Input 
          className='info-card-input'
          type='number'
          value={guestCount}
          onInput={handleGuestCountInput}
          placeholder='请输入换宿人数'
          maxlength={2}
        />
      }
      
      <Text className='info-card-sec-title'>出行原因*</Text>
      <Input 
        className='info-card-input'
        value={identity}
        placeholder="你这趟为什么来这里呢，是出差，旅行或者是看演唱会等等呢？"
        onInput={e => setIdentity(e.detail.value)}
      />

        {/* </View> */}
        { Number(type) === 0 &&
        <Text className='info-card-sec-title'>入住时间*</Text>
      }
      { Number(type) === 0 &&
        <Textarea
          className='info-card-input'
          value={`${startDate} 至 ${endDate}`}
          disabled={true}
        />
      }

      <Text className='info-card-sec-title'>联系方式*</Text>
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
        {Number(type) === 0 ? '其他信息' : '申请信息'}
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
      
      {/* <View className='info-card-context'> */}
        <Text className='info-card-sec-title'>{Number(type) === 0 ? '你有什么特殊技能吗？' : '申请原因'}*</Text>
        <Textarea
          className='info-card-input-multilines'
          value={reason}
          onInput={e => setReason(e.detail.value)}
          placeholder={Number(type) === 0 ? '可以讲讲能为host做的一些事情吗？可参考Host提供的需求，或许可以直接解锁技能/房源换宿哦！' : '请说明申请原因'}
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