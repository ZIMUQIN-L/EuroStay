import { View, Text } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import Taro from '@tarojs/taro';
import './index.scss';
import GlobalStore from '@store/GlobalStore';

const HouseContact: React.FC<HouseDetailItemProps> = house => {
  const onCopyContactToClipboard = () => {
    if (GlobalStore.userInfo._id == '') {
      Taro.showModal({
        title: '转至登录页面',
        content: '请登录后获取联系方式~',
        success: function (res) {
          if (res.confirm) {
            Taro.reLaunch({
              url: `/pages/login/index`,
            });
          }
        },
      });
    } else {
      if (house.contact == undefined || house.contact == '') {
        if (house.xhsContact != undefined && house.xhsContact != '') {
          Taro.setClipboardData({
            data: house.xhsContact,
            success: function (res) {
              Taro.showModal({
                title: '提示',
                content: '房主的小红书已复制到剪贴板',
              });
            },
            fail: function (err) {
              Taro.showToast({
                title: '联系方式复制失败',
                icon: 'error',
                duration: 2000,
              });
            },
          });
        } else {
          Taro.showToast({
            title: '暂无联系方式~',
            icon: 'error',
            duration: 2000,
          });
        }
      } else {
        Taro.setClipboardData({
          data: house.contact,
          success: function (res) {
            Taro.showModal({
              title: '提示',
              content: '房主的微信账号已复制到剪贴板',
            });
          },
          fail: function (err) {
            Taro.showToast({
              title: '联系方式复制失败',
              icon: 'error',
              duration: 2000,
            });
          },
        });
      }
    }
  };
  return (
    <View className='lists'>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>房客评价</Text>
        </View>
      </View>
      <View className='contact-container'>
        <View className='contact-button' onClick={onCopyContactToClipboard}>
          <Text className='contact-text'>联系房东</Text>
        </View>
      </View>
    </View>
  );
};

export default HouseContact;
