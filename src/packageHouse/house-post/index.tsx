import { View, Text, Image, Textarea } from '@tarojs/components';
import { observer } from 'mobx-react';
import ImagesUpload from './images-upload';
import HouseDes from './house-des';
import HouseContact from './house-contact';
import { useState, useEffect } from 'react';
import InfoSelection from './info-selection';
import './index.scss';
import Taro from '@tarojs/taro';
import { houseInfoPost } from '@common/database/house/house';
import { UserDetailInfoItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import {
  pointDetailInfoAdd,
  pointIncrease,
} from '@common/database/pointSystem/pointSystem';
import { userInfoSearch } from '@common/database/user/user';
import { formatTimestamp } from '@utils/dateUtil';

const Index = () => {
  const [userInfo, setUserInfo] = useState<UserDetailInfoItemProps>();
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    userInfoSearch(GlobalStore.userInfo._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setUserInfo(ownerInfo[0]);
      },
    );
  }, []);

  const [images, setImages] = useState<string[]>([]);

  // 处理照片上传的逻辑
  const handleUploadImage = uploadedImagePath => {
    setImages([...images, uploadedImagePath]);
    handleButtonClickable();
  };

  // 删除image
  const handleDeleteImage = deletedImagePath => {
    const updatedImages = images.filter(image => image !== deletedImagePath);
    setImages(updatedImages);
    handleButtonClickable();
  };

  // 用户修改房源描述
  const [houseDescription, setHouseDescription] = useState<string>('');
  const handleUserDescriptionEdit = inputDescription => {
    setHouseDescription(inputDescription);
    handleButtonClickable();
  };

  // 用户联系方式描述
  const [userContact, setUserContact] = useState<string>('');
  const handleUserContactEdit = inputContact => {
    setUserContact(inputContact);
    handleButtonClickable();
  };

  // 房源info属性
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState(0);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState({});
  const [utility, setUtility] = useState({});
  const [surrounding, setSurrounding] = useState({});
  const [preference, setPreference] = useState({});

  const [state, setState] = useState(13);

  const handleButtonClickable = () => {
    if (
      images.length != 0 &&
      houseDescription != '' &&
      userContact != '' &&
      location != '' &&
      startDate &&
      endDate &&
      capacity != 0 &&
      Object.keys(gender).length != 0 &&
      (Object.keys(utility).length != 0 ||
        Object.keys(surrounding).length != 0 ||
        Object.keys(surrounding).length != 0)
    ) {
      setClickable(true);
    } else {
      setClickable(false);
    }
  };

  // 获取房源info信息
  const handleUserInfoEdit = (
    location,
    startDate,
    endDate,
    capacity,
    gender,
    utility,
    surrounding,
    preference,
  ) => {
    setLocation(location);
    setStartDate(startDate);
    setEndDate(endDate);
    setCapacity(capacity);
    setGender(gender);
    setUtility(utility);
    setSurrounding(surrounding);
    setPreference(preference);
    handleButtonClickable();
  };

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  useEffect(() => {
    handleButtonClickable();
  }, [
    images,
    location,
    startDate,
    endDate,
    userContact,
    capacity,
    utility,
    surrounding,
    houseDescription,
    preference,
    gender,
  ]);

  // post房源信息
  const handleClickPostSubmit = () => {
    // 上传房源
    if (images.length == 0) {
      Taro.showToast({
        title: '请上传房源图片~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (houseDescription == '') {
      Taro.showToast({
        title: '请填写房源描述~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (userContact == '') {
      Taro.showToast({
        title: '请填写联系方式~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (location == '') {
      Taro.showToast({
        title: '请填写房源地址~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (!startDate || !endDate) {
      Taro.showToast({
        title: '请选择可住时间',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (capacity == 0) {
      Taro.showToast({
        title: '请选择可住人数~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (Object.keys(gender).length === 0) {
      Taro.showToast({
        title: '请选择住客性别~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (
      Object.keys(utility).length === 0 &&
      Object.keys(surrounding).length === 0 &&
      Object.keys(surrounding).length === 0
    ) {
      Taro.showToast({
        title: '建议补充设施，周边信息和房主偏好等信息哦',
        icon: 'none',
        mask: true,
        duration: 2000,
      });
    } else {
      handleMessageRequest().then(res => {
        handleUploadHouseInfo();
      });
    }
  };

  const handleMessageRequest = async () => {
    try {
      await Taro.showModal({
        title: '接受消息通知（请勾选`总是保持以上选择`确保消息发送成功',
        content:
          '是否允许小程序在有求宿者联系您时给您发送提醒，这样你们的沟通会更有效哦~',
        confirmColor: '#A6A0E0',
      });

      await Taro.requestSubscribeMessage({
        tmplIds: ['I5kMb7W6-QbKBqcXLlzqZzK9N97JPkrFWdMHBI7hyA4'],
      });
    } catch (error) {
      console.info('be patient plz');
    }
  };

  const handleUploadHouseInfo = () => {
    Taro.showLoading({
      title: '上传中',
      mask: true,
    });
    const mergedPreference = { ...preference, ...gender };
    houseInfoPost(
      location,
      startDate,
      endDate,
      userContact,
      capacity,
      utility,
      surrounding,
      houseDescription,
      mergedPreference,
      images,
      userInfo?._openid,
    ).then(res => {
      pointIncrease(userInfo?._id, 10);
      const timestamp = formatTimestamp(new Date().valueOf());
      pointDetailInfoAdd(
        userInfo?._openid,
        timestamp,
        0,
        '发布房源信息',
        10,
        (userInfo ? userInfo?.point : 0) + 10,
      ).then(res1 => {
        Taro.hideLoading();
        Taro.navigateBack({
          delta: 1,
        });
      });
    });
  };
  return (
    <View className='house-post'>
      {state == 0 && <StepONE />}
      {state == 1 && <StepTWO />}
      {state == 2 && <StepTHREE />}
      {state == 3 && <StepFOUR />}
      {state == 4 && <StepFIVE />}
      {state == 5 && <StepSIX />}
      {state == 6 && <StepSeven />}
      {state == 8 && <StepNINE />}
      {state == 9 && <StepTEN />}
      {state == 10 && <StepELEVEN />}
      {state == 13 && <Step14 />}

      <View className='bottom-bar'>
        {state == 0 ? (
          <View
            className='bottom-bar-button'
            onClick={() => {
              setState(1);
            }}
          >
            开始
          </View>
        ) : (
          <View className='bottom-bar-next-step'>
            <View
              className='previous'
              onClick={() => {
                setState(state - 1);
              }}
            >
              上一步
            </View>
            <View
              className='next'
              onClick={() => {
                setState(state + 1);
              }}
            >
              下一步
            </View>
          </View>
        )}
      </View>
      {/* <ImagesUpload
        images={images}
        onUploadImage={handleUploadImage}
        onDeleteImage={handleDeleteImage}
      />
      <HouseDes onUserDescriptionEdit={handleUserDescriptionEdit} />
      <HouseContact onUserContactEdit={handleUserContactEdit} />
      <InfoSelection onUserInfoEdit={handleUserInfoEdit} />
      <View style={{ backgroundColor: 'white' }}>
        <View
          className='post-submit-button'
          style={{ backgroundColor: clickable ? '#FFD111' : '#d6d6d6' }}
          onClick={handleClickPostSubmit}
        >
          <Text>发布房源</Text>
        </View>
      </View> */}
    </View>
  );
};
export default observer(Index);

const StepONE = () => {
  return (
    <View className='step-one'>
      <View className='title'>开始添加您的第一套房源</View>
    </View>
  );
};

const StepTWO = () => {
  const houseTypeMap = [
    { type: 'Studio', des: '一段简单的解释一段简单的解释一段简单的解释' },
    { type: '公寓', des: '一段简单的解释一段简单的解释一段简单的解释' },
    { type: 'House', des: '一段简单的解释一段简单的解释一段简单的解释' },
    { type: 'ensuite', des: '一段简单的解释一段简单的解释一段简单的解释' },
    { type: '其他的', des: '一段简单的解释一段简单的解释一段简单的解释' },
  ];
  return (
    <View className='step-two'>
      <View className='title'>您的房源是？</View>
      <View className='house-type'>
        {houseTypeMap.map(item => {
          return (
            <View className='house-item'>
              <Image src='' className='pic'></Image>
              <View className='house-item-title'>{item.type}</View>
              <View className='des'>{item.des}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const StepTHREE = () => {
  return (
    <View className='step-three'>
      <View className='title'>您的房源地址是？</View>
      <View className='des'>
        房源详情只会展示房源的大致区位，您的详细地址不会直接展示给房客。
      </View>
    </View>
  );
};
const StepFOUR = () => {
  const facilityMap = [
    { name: 'wifi' },
    { name: '洗衣机' },
    { name: '独立卫浴' },
    { name: '厨房' },
    { name: '冰箱' },
    { name: '空调' },
    { name: '沙发' },
    { name: '暖气' },
  ];
  return (
    <View className='step-four'>
      <View className='title'>房源基本信息</View>
      <View className='des'>
        一些prompt，类似于 请选择您的房间内可供房客使用的设施：
      </View>
      <View className='facilities-wrap'>
        {facilityMap.map(item => {
          return (
            <View className='facility-item'>
              <Image src='' className='facility-pic'></Image>
              <View className='facility-name'>{item.name}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const StepFIVE = () => {
  const housePicMap = [
    { type: '房客住宿区', des: '请拍摄包含房客住宿的床的照片' },
    { type: '公共区', des: '请拍摄包含客厅/娱乐区的照片' },
    { type: '卫生间', des: '请拍摄包含卫浴区、马桶的照片' },
    { type: '其他', des: '点击添加拍摄其他照片' },
    // { type: '其他的', des: '一段简单的解释一段简单的解释一段简单的解释' },
  ];
  return (
    <View className='step-five'>
      <View className='title'>您的房源是？</View>
      <View className='step-five-des'>
        一些传照片的prompt，类似于 请根据指示拍摄清晰且未经修饰的照片之类的{' '}
      </View>
      <View className='house-type'>
        {housePicMap.map(item => {
          return (
            <View className='house-item'>
              <Image src='' className='pic'></Image>
              <View className='house-item-title'>{item.type}</View>
              <View className='des'>{item.des}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const StepSIX = () => {
  return (
    <View className='step-six'>
      <View className='title'>描述您的房源</View>
      <View className='question-title'>请给您的房源起一个简洁的标题吧！</View>
      <Textarea
        className='title-text-input'
        value={''}
        onInput={() => {}}
        placeholder=''
      />
      <View className='question-des'>请用您自己的话对房源进行描述吧！</View>
      <Textarea
        className='des-text-input'
        value={''}
        onInput={() => {}}
        placeholder='请填写回答（不要忘记您的房源最大的亮点是什么，推荐给房客吧！）'
      />
      <View className='question-message'>您想对预定成功的房客说的一句话？</View>
      <Textarea
        className='message-text-input'
        value={''}
        onInput={() => {}}
        placeholder='请填写回答'
      />
    </View>
  );
};
const StepSeven = () => {
  return (
    <View className='step-seven'>
      <View className='title'>您对房客的期待</View>

      <View className='guest-expectation'>您理想的房客是怎样的</View>
      <Textarea
        className='expectation-text-input'
        value={''}
        onInput={() => {}}
        placeholder='请填写回答'
      />
      <View className='guest-not-want'>不希望接待怎样的房客</View>
      <Textarea
        className='not-want-text-input'
        value={''}
        onInput={() => {}}
        placeholder='请填写回答'
      />
    </View>
  );
};
const StepNINE = () => {
  const interestMap = [
    { name: '玩桌游' },
    { name: '做饭' },
    { name: '看电影' },
    { name: '徒步' },
    { name: '唱K' },
    { name: '聊天' },
    { name: '学习新技能' },
    { name: '参观景点' },
    { name: '手工创作' },
    { name: '其他' },
  ];
  return (
    <View className='step-nine'>
      <View className='title'>您对房客的期待</View>
      <View className='des'>让房客了解您的兴趣，一起互动吧！</View>
      <View className='interest-wrap'>
        {interestMap.map(item => {
          return (
            <View className='interest-item'>
              <Image src='' className='interest-pic'></Image>
              <View className='interest-name'>{item.name}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const StepTEN = () => {
  return (
    <View className='step-ten'>
      <View className='title'>房客房屋注意事项</View>

      <View className='warning-title'>请填写您的房屋注意事项。</View>
      <Textarea
        className='warning-input'
        value={''}
        onInput={() => {}}
        placeholder='房屋注意事项提供与房源相关的特殊说明，针对房间的使用方式或条件。 比如房间内有宠物（如猫、狗等），房东会不定期进入某些空间（如共用的客厅），噪音环境提示（如邻近铁路或繁忙街道）。'
      />
    </View>
  );
};

const StepELEVEN = () => {
  return (
    <View className='step-eleven'>
      <View className='title'>房屋入住公约</View>

      <View className='warning-title'>请填写您的房屋入住公约。</View>
      <Textarea
        className='warning-input'
        value={''}
        onInput={() => {}}
        placeholder='房屋入住公约设定了方可的行为规范，强调房客需遵守的住宿规则。详细的入住公约会帮助您主管理预期行为，减少纠纷。 比如禁止吸烟或宠物，不允许举办聚会，需保持安静时间（如22:00-8:00）等。'
      />
    </View>
  );
};

const Step14 = () => {
  return (
    <View className='step-14'>
      <View className='title'>确认房源价值</View>

      <View className='step-14-recommend-title'>
        我们根据您提供的信息进行了房源价值评估
      </View>
      <View className='step-14-recommend-des'>
        评估依据详情请见《房源价值评估标准》
      </View>
      <View className='step-14-recommend-price'>推荐价格： 50旅行币/晚</View>
      <View className='step-14-border'></View>

      <View className='step-14-confirm-title'>请修改或确认房源的价值</View>
      <View className='step-14-confirm-des'>
        请在区间内修改并确认房源的旅行币价值。
      </View>
      <View className='step-14-confirm-price'>当前价格：</View>
      <View
        className='step-14-confirm-price-range'
        onClick={e => {
          console.log(e);
          console.log((e.changedTouches[0].screenX - 50) / 600.0);
          console.log(e.changedTouches[0].screenX, e.changedTouches[0].screenY);
        }}
      />
      <View className='step-14-confirm-tips'>
        当价格接近推荐值时，吸引力较高；当价格高于推荐值，可能影响房客的预订率噢。
      </View>
    </View>
  );
};
