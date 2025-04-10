import { View, Text, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro, { useRouter } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import './index.scss';
import GlobalStore from '@store/GlobalStore';

const EditEmail = () => {
  const router = useRouter();
  const currentEmail = decodeURIComponent(router.params.currentValue || '');
  const [email, setEmail] = useState(currentEmail);
  const [verifyCode, setVerifyCode] = useState('');
  const [showVerifyPage, setShowVerifyPage] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isReauthMode, setIsReauthMode] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = async () => {
    if (!email.trim()) {
      Taro.showToast({
        title: '请输入邮箱',
        icon: 'none'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Taro.showToast({
        title: '请输入正确的邮箱格式',
        icon: 'none'
      });
      return;
    }

    setLoading(true);

    try {
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esuser/sendEmailCode',
        method: 'POST',
        header: {
          'token': GlobalStore.userInfo.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: `email=${encodeURIComponent(email.trim())}`
      });

      if (res.data.code === 0) {
        setShowVerifyPage(true);
        setCountdown(60);
        Taro.showToast({
          title: '验证码已发送',
          icon: 'success'
        });
      } else {
        Taro.showToast({
          title: res.data.msg || '发送失败',
          icon: 'none'
        });
      }
    } catch (error) {
      Taro.showToast({
        title: '网络请求失败',
        icon: 'none'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verifyCode.trim()) {
      Taro.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return;
    }

    try {
      // 验证邮箱的API调用
      const response = await Taro.request({
        url: 'https://api.eurostay.co/app/esuser/emailVerify',
        method: 'POST',
        data: {
          email: email.trim(),
          code: verifyCode.trim()
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          token: GlobalStore.userInfo.token,
        }
      });

      if (response.data.code === 0) {
        // 更新上一页的数据
        const pages = Taro.getCurrentPages();
        const prevPage = pages[pages.length - 1];
        const eventChannel = prevPage.getOpenerEventChannel();
        eventChannel.emit('updateData', {
          email: email.trim()
        });

        Taro.navigateBack();
      } else {
        Taro.showToast({
          title: response.data.msg || '验证失败',
          icon: 'none'
        });
      }
    } catch (error) {
      Taro.showToast({
        title: '网络请求失败',
        icon: 'none'
      });
    }
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className='edit-email'>
      <View className='content-container'>
        {!currentEmail ? (
          !showVerifyPage ? (
            // 第一个页面：输入邮箱
            <>
              <View className='input-section'>
                <Text className='label'>邮箱地址</Text>
                <Input
                  className='input'
                  value={email}
                  onInput={e => setEmail(e.detail.value)}
                  placeholder='为了方便后续的消息提醒～该信息不会对外展示！'
                  type='text'
                />
              </View>
              <View className='button-group'>
                <View 
                  className={`confirm-button ${loading ? 'loading' : ''}`} 
                  onClick={!loading ? handleSendCode : undefined}
                >
                  {loading ? '发送中...' : '发送验证码'}
                </View>
                <View className='cancel-button' onClick={handleCancel}>
                  取消
                </View>
              </View>
            </>
          ) : (
            // 第二个页面：输入验证码
            <>
              <View className='input-section'>
                <Text className='label'>邮箱地址</Text>
                <Text className='email-display'>{email}</Text>
              </View>
              <View className='input-section'>
                <Text className='label'>验证码</Text>
                <View className='verify-input-container'>
                  <Input
                    className='verify-input'
                    value={verifyCode}
                    onInput={e => setVerifyCode(e.detail.value)}
                    placeholder='请输入验证码'
                    type='number'
                    maxlength={6}
                  />
                  <View 
                    className={`resend-button ${countdown > 0 ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
                    onClick={countdown === 0 && !loading ? handleSendCode : undefined}
                  >
                    {loading ? '发送中...' : countdown > 0 ? `${countdown}s` : '重新发送'}
                  </View>
                </View>
                <Text className='resend-tip'>
                  未收到验证码？点击右侧按钮重新发送
                </Text>
              </View>
              <View className='button-group'>
                <View className='confirm-button' onClick={handleVerify}>
                  验证邮箱
                </View>
                <View className='cancel-button' onClick={handleCancel}>
                  取消
                </View>
              </View>
            </>
          )
        ) : (
          // 已有邮箱的页面
          isReauthMode ? (
            showVerifyPage ? (
              // 验证码输入界面
              <>
                <View className='input-section'>
                  <Text className='label'>新邮箱地址</Text>
                  <Text className='email-display'>{email}</Text>
                </View>
                <View className='input-section'>
                  <Text className='label'>验证码</Text>
                  <View className='verify-input-container'>
                    <Input
                      className='verify-input'
                      value={verifyCode}
                      onInput={e => setVerifyCode(e.detail.value)}
                      placeholder='请输入验证码'
                      type='number'
                      maxlength={6}
                    />
                    <View 
                      className={`resend-button ${countdown > 0 ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
                      onClick={countdown === 0 && !loading ? handleSendCode : undefined}
                    >
                      {loading ? '发送中...' : countdown > 0 ? `${countdown}s` : '重新发送'}
                    </View>
                  </View>
                  <Text className='resend-tip'>
                    未收到验证码？点击右侧按钮重新发送
                  </Text>
                </View>
                <View className='button-group'>
                  <View className='confirm-button' onClick={handleVerify}>
                    验证邮箱
                  </View>
                  <View className='cancel-button' onClick={() => {
                    setShowVerifyPage(false);
                    setVerifyCode('');
                  }}>
                    取消
                  </View>
                </View>
              </>
            ) : (
              // 重新认证模式：输入新邮箱
              <>
                <View className='input-section'>
                  <Text className='label'>新邮箱地址</Text>
                  <Input
                    className='input'
                    value={email}
                    onInput={e => setEmail(e.detail.value)}
                    placeholder='请输入新的邮箱地址'
                    type='text'
                  />
                </View>
                <View className='button-group'>
                  <View 
                    className={`confirm-button ${loading ? 'loading' : ''}`} 
                    onClick={!loading ? handleSendCode : undefined}
                  >
                    {loading ? '发送中...' : '发送验证码'}
                  </View>
                  <View className='cancel-button' onClick={() => setIsReauthMode(false)}>
                    取消
                  </View>
                </View>
              </>
            )
          ) : (
            // 显示当前邮箱的页面
            <>
              <View className='input-section'>
                <Text className='label'>邮箱地址</Text>
                <Text className='email-display'>{currentEmail}</Text>
              </View>
              <View className='button-group'>
                <View className='confirm-button' onClick={() => setIsReauthMode(true)}>
                  重新认证
                </View>
                <View className='cancel-button' onClick={handleCancel}>
                  取消返回
                </View>
              </View>
            </>
          )
        )}
      </View>
    </View>
  );
};

export default observer(EditEmail);
