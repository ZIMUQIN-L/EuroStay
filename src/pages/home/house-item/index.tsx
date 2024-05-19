import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { HouseItemProps } from '@utils/interfaces';
import { DefaultHouse, DateIcon } from '@utils/cloudIcons';
import { checkImageUrl } from '@utils/validationUtil';
import { useState, useEffect } from 'react';
import RequestCustomCard from '../../../packageUser/request-custom-card';
import CustomModal from '@components/CustomModal';
import { UserAccomMessageItemProps, ContactInfo } from '@utils/interfaces';
import { accomMessageAdd } from '@common/database/accomMessage/accomMessage';

const initialRequestData: UserAccomMessageItemProps = {
  _id: '',
  _openid: '',
  end_date: '',
  start_date: '',
  capacity: 0,
  gender: '',
  location: '',
  sourceUserOpenid: '',
  description: '',
  type: '',
  status: '',
  contact: {} as ContactInfo,
  answerToOwner: '',
  houseId: '',
  images: [],
  targetUserNickName: '',
  targetUserOpenid: '',
};

const HouseItem: React.FC<HouseItemProps> = house => {
  const [imageSrc, setImageSrc] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [requestData, setRequestData] = useState<UserAccomMessageItemProps>(initialRequestData);
  // if user want to share this message to board or not
  const [shareToggle, setShareToggle] = useState(false);

  // const [requestData, setRequestData] = useState({
  //   capacity: 0,
  //   requestDes: '',
  //   sendToggle: false,
  //   requestInfoSelection: '',
  // });

  useEffect(() => {
    const imageUrl =
      house.images.length > 0 && checkImageUrl(house.images[0] as string)
        ? house.images[0]
        : DefaultHouse;
    console.log(house);
    setImageSrc(imageUrl);
  });

  const handleImageError = e => {
    setImageSrc(DefaultHouse);
  };

  const handleSendToggleEdit = (editSendToggle) => {
    setShareToggle(editSendToggle);
  };

  // request data
  const handleRequestDesEdit = (editRequestDes: string) => {
    setRequestData(prevData => {
      const newData = { ...prevData, description: editRequestDes };
      return newData;
    });
  };

  const handleRequestInfoSelectionEdit = (
    startDate: Date | undefined,
    endDate: Date | undefined,
    capacity: number,
    info: ContactInfo
  ) => {
    setRequestData(prevData => {
      const newStartDate = startDate && !(startDate instanceof Date) && startDate !== "" && !isNaN(new Date(startDate).getTime()) ? new Date(startDate) : startDate;
      const newEndDate = endDate && !(endDate instanceof Date) && endDate !== "" && !isNaN(new Date(endDate).getTime()) ? new Date(endDate) : endDate;
  
      const newData = {
        ...prevData,
        start_date: newStartDate ? newStartDate.toISOString() : '',
        end_date: newEndDate ? newEndDate.toISOString() : '',
        capacity: capacity,
        contact: info, // or any other relevant field
      };
      console.log("Updated requestData: ", newData);
      return newData;
    });
  };

  // submit message card content 
  const handleSubmitRequestCustomCard = async () => {
    try {
      const res = await accomMessageAdd(requestData);
      console.log('Message added successfully:', res);
    } catch (err) {
      console.error('Error adding message BUG :', err);
    }
    setModalOpen(false);
  };

  // 跳转至房源详情
  const toHouseDetail = () => {
    Taro.navigateTo({
      url: `../../packageHouse/house-detail/index?id=${house._id}`,
    });
  };

  //新建消息卡片
  const onCreateCustomCardFromTenant = () => {
    setModalOpen(true);
  }

  // 复制用户联系方式至剪贴板 -- 目前被新建消息卡片代替
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
          onClick={onCreateCustomCardFromTenant}
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

      <CustomModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <RequestCustomCard           
          onClose={() => setModalOpen(false)}
          onRequestDesEdit={handleRequestDesEdit}
          onSendToggleEdit={handleSendToggleEdit}
          onRequestInfoSelectionEdit={handleRequestInfoSelectionEdit} 
          onSubmitCard={handleSubmitRequestCustomCard}>
        </RequestCustomCard>
      
      </CustomModal>



    </View>
  );
};
export default HouseItem;
