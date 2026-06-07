import { View, Text, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
import {bgMonthly, bgYearly, infoIcon, contactIcon, starIcon, editIcon} from '@utils/cloudIcons';
import GlobalStore from '@store/GlobalStore';
import './index.scss';
import Taro from '@tarojs/taro';
import { API } from '@utils/apiService';

const UserVip = () => {
  const [agreed, setAgreed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [vipEndDate, setVipEndDate] = useState('');

  // 获取会员信息
  useEffect(() => {
    fetchVipInfo();
  }, []);

  const fetchVipInfo = async () => {
    try {
      const result = await API.vip.getVipInfo();
      setVipEndDate(result.endDate);
    } catch (error) {
      console.error('获取会员信息失败', error);
    }
  };

  const handleAgreement = () => {
    setAgreed(!agreed);
  };

  const handleSubscribe = async () => {
    if (!agreed) {
      Taro.showToast({
        title: '请先同意会员协议',
        icon: 'none'
      });
      return;
    }

    try {
      // 调用充值接口
      const month = selectedPlan === 'monthly' ? 1 : 12;
      const price = selectedPlan === 'monthly' ? 55 : 199;
      
      const paymentData = await API.vip.recharge(month, price);
      console.log(paymentData);
      
      // 调用支付
      await Taro.requestPayment({
        timeStamp: paymentData.timeStamp,
        nonceStr: paymentData.nonceStr,
        package: paymentData.package,
        signType: paymentData.signType,
        paySign: paymentData.paySign,
        success: () => {
          Taro.showToast({
            title: '支付成功',
            icon: 'success'
          });
          GlobalStore.setIsVip(true);
          // 刷新会员信息
          fetchVipInfo();
        },
        fail: (err) => {
          console.error('支付失败', err);
          Taro.showToast({
            title: '支付失败',
            icon: 'none'
          });
        }
      });
    } catch (error) {
      console.error('请求失败', error);
      Taro.showToast({
        title: '请求失败',
        icon: 'none'
      });
    }
  };

  const handleNavigateToRights = () => {
    Taro.navigateTo({
      url: '/packageUser/vip-rights/index'
    });
  };

  return (
    <View className='user-vip'>
      {/* 顶部用户信息 */}
      <View className='user-header'>
        <Image className='avatar' src={GlobalStore._userInfo?.avatar || ''} />
        <View className='info-text'>
          <Text className='nickname'>{GlobalStore._userInfo?.username || ''}</Text>
          <Text className='vip-status'>
            {GlobalStore._userInfo?.isVip ? `会员有效期至 ${vipEndDate}` : '暂未开通会员'}
          </Text>
        </View>
      </View>

      {/* 白色容器 */}
      <View className='content-container'>
        {/* 会员套餐选项 */}
        <View className='subscription-options'>
          {/* <View 
            className={`option-card monthly ${selectedPlan === 'monthly' ? 'selected' : ''}`}
            onClick={() => setSelectedPlan('monthly')}
          >
            <Image className='bg-image' src={bgMonthly} />
            <View className='price-info'>
              <View className='left'>
                <Text className='label'>月度会员</Text>
                <View className='price'>
                  <Text className='currency'>€</Text>
                  <Text className='amount'>6.99</Text>
                  <Text className='unit'>/月</Text>
                </View>
              </View>
              <View className='right'>
                <Text className='original-price'>原价€9.9</Text>
                <Text className='discount'>限时7折</Text>
              </View>
            </View>
          </View> */}

          <View 
            className={`option-card yearly ${selectedPlan === 'yearly' ? 'selected' : ''}`}
            onClick={() => setSelectedPlan('yearly')}
          >
            <Image className='bg-image' src={bgYearly} />
            <View className='price-info'>
              <View className='left'>
                <Text className='label'>年度会员</Text>
                <View className='price'>
                  <Text className='currency'>€</Text>
                  <Text className='amount'>24.99</Text>
                  <Text className='unit'>/年 </Text>
                </View>
              </View>
              <View className='right'>
                <Text className='original-price'>原价€119.99</Text>
                <Text className='discount'>限时2折</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 协议同意 */}
        <View className='agreement' onClick={handleAgreement}>
          <View className={`checkbox ${agreed ? 'checked' : ''}`} />
          <Text className='agreement-text'>
            我已阅读并同意Eurostay
            <Text className='link' 
                          onClick={() => {
                            Taro.navigateTo({ url: '/pages/common-setting/index?type=vip' });
                          }}>《会员协议》</Text>
          </Text>
        </View>

        {/* 按钮 */}
        <View className='subscribe-button' onClick={handleSubscribe}>
          {GlobalStore._userInfo?.isVip ? '续费会员' : '开通会员'}
        </View>

        {/* 会员权益 */}
        <View className='benefits-section' onClick={handleNavigateToRights}>
          <Text className='section-title'>会员权益</Text>
          <View className='benefits-grid'>
            {[
              { icon: infoIcon, text: '房源详情' },
              { icon: contactIcon, text: '联系房东' },
              { icon: editIcon, text: '预定房源' },
              { icon: starIcon, text: '订单追踪' }
            ].map((item, index) => (
              <View key={index} className='benefit-item'>
                <View className='benefit-icon'>
                  <Image className='icon-image' src={item.icon} />
                  {!GlobalStore._userInfo?.isVip && (
                    <View className='mask'>
                      <Text className='unlock-text'>待解锁</Text>
                    </View>
                  )}
                </View>
                <Text className='benefit-text'>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

      </View>
    </View>
  );
};

export default UserVip;
