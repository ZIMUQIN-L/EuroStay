import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { HouseItemProps } from '@utils/interfaces';
import { DefaultHouse, DateIcon } from '@utils/cloudIcons';
import { checkImageUrl } from '@utils/validationUtil';
import { useState, useEffect } from 'react';

const HouseItem: React.FC<HouseItemProps> = house => {
  const [imageSrc, setImageSrc] = useState('');
  useEffect(() => {
    const imageUrl =
      house.images.length > 0 && checkImageUrl(house.images[0] as string)
        ? house.images[0]
        : DefaultHouse;
    setImageSrc(imageUrl);
  });

  const handleImageError = e => {
    setImageSrc(DefaultHouse);
  };

  // 跳转至房源详情
  const toHouseDetail = () => {
    Taro.navigateTo({
      url: `../../packageHome/house-detail/index?id=${house._id}`,
    });
  };

  // 复制用户联系方式至剪贴板
  const onCopyContactToClipboard = () => {
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
  };

  return (
    <View className='house-item'>
      <Image
        src={imageSrc}
        className='house-image'
        onClick={toHouseDetail}
        onError={handleImageError}
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <View className='house-details'>
          <View className='house-location'>
            <Text>{house.location}</Text>
          </View>
          <View className='house-type'>
            <Text>
              {house.houseType !== 'unKnown' &&
              house.houseType !== '' &&
              house.houseType != undefined
                ? ` - ${house.houseType}`
                : ''}
            </Text>
          </View>
          <View className='house-date' style={{ alignItems: 'center' }}>
            <Image
              src={DateIcon}
              style={{ width: '17px', height: '17px', marginRight: '6px' }}
            />
            <Text style={{ color: '#979797', fontSize: '12px' }}>
              {house.start_date + ' to ' + house.end_date}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#FFD111',
            color: 'white',
            width: '30%',
            justifyContent: 'center',
            height: '32px',
            borderRadius: '32px',
            display: 'flex',
            alignItems: 'center',
          }}
          className='contact-button'
          onClick={onCopyContactToClipboard}
        >
          <Text style={{ fontSize: '14px' }}>联系房主</Text>
        </View>
      </View>
      <View
        style={{
          borderBottom: '1px solid #ddd',
          width: '100%',
          marginTop: '10px',
          marginBottom: '20px',
        }}
      ></View>
    </View>
  );
};
export default HouseItem;
