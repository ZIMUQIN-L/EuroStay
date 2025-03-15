import { View, Text, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
import {bgMonthly, bgYearly} from '@utils/cloudIcons';
import GlobalStore from '@store/GlobalStore';
import './index.scss';
import Taro from '@tarojs/taro';

const UserVip = () => {
  const [agreed, setAgreed] = useState(false);

  const handleAgreement = () => {
    setAgreed(!agreed);
  };

  const handleSubscribe = () => {
    if (!agreed) {
      Taro.showToast({
        title: '请先同意会员协议',
        icon: 'none'
      });
      return;
    }
    // 处理开通/续费会员逻辑
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
            {GlobalStore._userInfo?.isVip ? '包年会员LV1' : '暂未开通会员'}
          </Text>
        </View>
      </View>

      {/* 白色容器 */}
      <View className='content-container'>
        {/* 会员套餐选项 */}
        <View className='subscription-options'>
          <View className='option-card monthly'>
            <Image className='bg-image' src={bgMonthly} />
            <View className='price-info'>
              <Text className='label'>连续包月</Text>
              <Text className='currency'>€</Text>
              <Text className='amount'>19.9</Text>
            </View>
          </View>

          <View className='option-card yearly'>
            <Image className='bg-image' src={bgYearly} />
            <View className='price-info'>
              <Text className='label'>连续包年</Text>
              <Text className='currency'>€</Text>
              <Text className='amount'>x9.9</Text>
            </View>
            <Text className='save-tip'>立省€xx</Text>
          </View>
        </View>

        {/* 协议同意 */}
        <View className='agreement' onClick={handleAgreement}>
          <View className={`checkbox ${agreed ? 'checked' : ''}`} />
          <Text className='agreement-text'>
            我已阅读并同意Eurostay
            <Text className='link'>《会员协议》</Text>
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
            {Array(4).fill(null).map((_, index) => (
              <View key={index} className='benefit-item'>
                <View className='benefit-icon'>待解锁</View>
                <Text className='benefit-text'>联系房东</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 成长任务 */}
        <View className='tasks-section'>
          <Text className='section-title'>成长任务</Text>
        </View>
      </View>
    </View>
  );
};

export default UserVip;
