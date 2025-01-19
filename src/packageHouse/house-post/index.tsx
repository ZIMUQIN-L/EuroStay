import { View, Text, Image, Textarea } from '@tarojs/components';
import { observer } from 'mobx-react';
import ImagesUpload from './images-upload';
import HouseDes from './house-des';
import HouseContact from './house-contact';
import { useState, useEffect, useCallback, useRef } from 'react';
import InfoSelection from './info-selection';
import {
  formatToday,
  calculateDaysBetweenDates,
  formatTimestamp,
} from '@utils/dateUtil';
import './index.scss';
import Taro from '@tarojs/taro';
import { houseInfoPost } from '@common/database/house/house';
import { UserDetailInfoItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import {
  pointDetailInfoAdd,
  pointIncrease,
} from '@common/database/pointSystem/pointSystem';
import { AtCalendar } from 'taro-ui';
import { userInfoSearch } from '@common/database/user/user';
import {
  GreyAdd,
  GreySubstract,
  BlueEnable,
  GreyCircle,
  KeyArrowLeft,
  KeyArrowRight,
} from '@utils/cloudIcons';
import Popup from './popup';

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

  const [state, setState] = useState(8);
  const systemInfo = Taro.getSystemInfoSync();
  console.log(systemInfo.windowWidth, 'width');

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
    <View
      className='house-post'
      style={{ minHeight: '100%', backgroundColor: '#ffffff' }}
    >
      {state == 0 && <Start />}
      {state == 1 && <HouseType />}
      {state == 2 && <HouseAddress />}
      {state == 3 && <HouseInfo />}
      {state == 4 && <HouseFacility />}
      {state == 5 && <PostImage />}
      {/* {state == 6 && <StepSeven />} */}
      {state == 6 && <Description />}
      {state == 7 && <Question />}
      {state == 8 && <Interest />}
      {state == 9 && <Tips />}
      {state == 10 && <Agreement />}
      {state == 11 && <SelectDate />}
      {state == 12 && <Price />}

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

const Start = () => {
  return (
    <View className='start'>
      <View className='title'>开始添加您的第一套房源</View>
      <View className='steps'>
        <View className='step'>
          <View className='step-left'>
            <View className='step-subtitle'>1 介绍您的房源</View>
            <View className='des'>
              介绍房源基本信息，比如房源类型、房源位置、可接待人数、房客性别
            </View>
          </View>
          <View className='step-right'>
            <Image src=''></Image>
          </View>
        </View>
        <View className='step'>
          <View className='step-left'>
            <View className='step-subtitle'>2 添加房源亮点</View>
            <View className='des'>
              添加房源的基本设施，房源照片，以及房源描述，帮助房客更好的了解
            </View>
          </View>
          <View className='step-right'>
            <Image src=''></Image>
          </View>
        </View>
        <View className='step'>
          <View className='step-left'>
            <View className='step-subtitle'>3 填写Guest期待</View>
            <View className='des'>
              描述您理想中的房客、您的兴趣爱好，帮助您匹配到志同道合的房客
            </View>
          </View>
          <View className='step-right'>
            <Image src=''></Image>
          </View>
        </View>
        <View className='step'>
          <View className='step-left'>
            <View className='step-subtitle'>4 上架发布房源</View>
            <View className='des'>
              确认注意事项、入住公约、可用时间以及房源旅行币价格，上架发布
            </View>
          </View>
          <View className='step-right'>
            <Image src=''></Image>
          </View>
        </View>
      </View>
    </View>
  );
};

const HouseType = () => {
  const [houseType, setHouseType] = useState<String>('default');
  const houseTypeMap = [
    {
      type: 'Studio',
      des: '一段简单的解释一段简单的解释一段简单的解释',
      value: 'studio',
    },
    {
      type: '公寓',
      des: '一段简单的解释一段简单的解释一段简单的解释',
      value: 'flat',
    },
    {
      type: 'House',
      des: '一段简单的解释一段简单的解释一段简单的解释',
      value: 'house',
    },
    {
      type: 'ensuite',
      des: '一段简单的解释一段简单的解释一段简单的解释',
      value: 'ensuite',
    },
    {
      type: '其他的',
      des: '一段简单的解释一段简单的解释一段简单的解释',
      value: 'others',
    },
  ];
  return (
    <View className='house-type-wrap'>
      <View className='title'>您的房源是什么类型？</View>
      <View className={`house-type`}>
        {houseTypeMap.map(item => {
          return (
            <View
              className={`house-item ${item.value == houseType ? 'active' : ''}`}
              onClick={() => {
                setHouseType(item.value);
              }}
            >
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

const HouseAddress = () => {
  return (
    <View className='house-address'>
      <View className='title'>您的房源地址是？</View>
      <View className='des'>
        房源详情只会展示房源的大致区位，您的详细地址不会直接展示给房客。
      </View>
    </View>
  );
};
const HouseFacility = () => {
  const [hasWifi, setHasWifi] = useState(false);
  const [hasWashMachine, setHasWashMachine] = useState(false);
  const [hasBathroom, setHasBathroom] = useState(false);
  const [hasKitchen, setHasKitchen] = useState(false);
  const [hasFreezer, setHasFreezer] = useState(false);
  const [hasAirConditioner, setHasAirConditioner] = useState(false);
  const [hasSofa, setHasSofa] = useState(false);
  const [hasHeat, setHasHeat] = useState(false);
  return (
    <View className='house-facility'>
      <View className='title'>房源基础设施</View>
      <View className='des'>请选择您的房间内可供房客使用的设施</View>
      <View className='facilities-wrap'>
        <View
          className={`facility-item ${hasWifi ? 'active' : ''}`}
          onClick={() => {
            setHasWifi(!hasWifi);
          }}
        >
          <Image src='' className='facility-pic'></Image>
          <View className='facility-name'>wifi</View>
        </View>
        <View
          className={`facility-item ${hasWashMachine ? 'active' : ''}`}
          onClick={() => {
            setHasWashMachine(!hasWashMachine);
          }}
        >
          <Image src='' className='facility-pic'></Image>
          <View className='facility-name'>洗衣机</View>
        </View>
        <View
          className={`facility-item ${hasBathroom ? 'active' : ''}`}
          onClick={() => {
            setHasBathroom(!hasBathroom);
          }}
        >
          <Image src='' className='facility-pic'></Image>
          <View className='facility-name'>独立卫浴</View>
        </View>
        <View
          className={`facility-item ${hasKitchen ? 'active' : ''}`}
          onClick={() => {
            setHasKitchen(!hasKitchen);
          }}
        >
          <Image src='' className='facility-pic'></Image>
          <View className='facility-name'>厨房</View>
        </View>
        <View
          className={`facility-item ${hasFreezer ? 'active' : ''}`}
          onClick={() => {
            setHasFreezer(!hasFreezer);
          }}
        >
          <Image src='' className='facility-pic'></Image>
          <View className='facility-name'>冰箱</View>
        </View>
        <View
          className={`facility-item ${hasAirConditioner ? 'active' : ''}`}
          onClick={() => {
            setHasAirConditioner(!hasAirConditioner);
          }}
        >
          <Image src='' className='facility-pic'></Image>
          <View className='facility-name'>空调</View>
        </View>
        <View
          className={`facility-item ${hasSofa ? 'active' : ''}`}
          onClick={() => {
            setHasSofa(!hasSofa);
          }}
        >
          <Image src='' className='facility-pic'></Image>
          <View className='facility-name'>沙发</View>
        </View>
        <View
          className={`facility-item ${hasHeat ? 'active' : ''}`}
          onClick={() => {
            setHasHeat(!hasHeat);
          }}
        >
          <Image src='' className='facility-pic'></Image>
          <View className='facility-name'>暖气</View>
        </View>
      </View>
    </View>
  );
};
const PostImage = () => {
  const housePicMap = [
    { type: '房客住宿区', des: '请拍摄包含房客住宿的床的照片' },
    { type: '公共区', des: '请拍摄包含客厅/娱乐区的照片' },
    { type: '卫生间', des: '请拍摄包含卫浴区、马桶的照片' },
    { type: '其他', des: '点击添加拍摄其他照片' },
    // { type: '其他的', des: '一段简单的解释一段简单的解释一段简单的解释' },
  ];
  return (
    <View className='post-image'>
      <View className='title'>您的房源是？</View>
      <View className='post-image-des'>
        一些传照片的prompt，类似于 请根据指示拍摄清晰且未经修饰的照片之类的{' '}
      </View>
      <View className='house-type'>
        {housePicMap.map(item => {
          return (
            <View className='house-item'>
              <View className='house-item-title'>{item.type}</View>
              <View className='des'>{item.des}</View>
              <Image src='' className='pic'></Image>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Description = () => {
  return (
    <View className='description'>
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
const Interest = () => {
  const [isShowmPopup, setIsShowPopup] = useState(false);
  const interestMap = [
    { name: '玩桌游', value: 'board-games' },
    { name: '做饭', value: 'cooking' },
    { name: '看电影', value: 'movies' },
    { name: '徒步', value: 'hiking' },
    { name: '唱K', value: 'karaok' },
    { name: '聊天', value: 'chat' },
    { name: '学习新技能', value: 'new-skills' },
    { name: '参观景点', value: 'scene-visiting' },
    { name: '手工创作', value: 'handmaking' },
    { name: '其他', value: 'others' },
  ];
  return (
    <View className='interest'>
      {isShowmPopup && (
        <Popup
          onClickClose={() => {
            setIsShowPopup(false);
          }}
          onClickConfirm={() => {
            setIsShowPopup(false);
          }}
          title={'新建其他'}
          content={
            <>
              <View className='content-title'>添加您想与房客一起做的事</View>
              <View className='interest-input-wrapper'>
                <Textarea
                  className='interest-input'
                  value={''}
                  onInput={() => {}}
                />
                <View className='text-limit'>0/6</View>
              </View>
            </>
          }
        />
      )}
      <View className='interest-title'>想与房客一起做什么？</View>
      <View className='interest-des'>让房客了解您的兴趣，一起互动吧！</View>
      <View className='interest-wrap'>
        {interestMap.map(item => {
          return (
            <View
              className='interest-item'
              onClick={() => {
                if (item.value == 'others') {
                  setIsShowPopup(true);
                }
              }}
            >
              <Image src='' className='interest-pic'></Image>
              <View className='interest-name'>{item.name}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const SelectDate = () => {
  const currentDateMulti = useRef(formatToday());
  const today = formatToday();
  // 多选 不连续 多选 选择的日期 [{ value: '2024-06-10' }, { value: '2024-06-12' }]
  const [selectDataList, setSelectDataList] = useState([]);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const startDate = useRef(formatToday());
  const selectDateMulti = data => {
    // 先赋值，防止dom不变
    if (isStartDateSelected) {
      currentDateMulti.current = data.value;
      const list = JSON.parse(JSON.stringify(selectDataList));
      console.log(
        data.value,
        calculateDaysBetweenDates(startDate.current, data.value),
      );
      for (
        let i = 0;
        i <= calculateDaysBetweenDates(startDate.current, data.value);
        i++
      ) {
        console.log(
          'add gap',
          formatTimestamp(
            new Date(startDate.current).getTime() + i * 24 * 60 * 60 * 1000,
          ),
        );
        list.push({
          value: formatTimestamp(
            new Date(startDate.current).getTime() + i * 24 * 60 * 60 * 1000,
          ),
        });
      }
      setSelectDataList(JSON.parse(JSON.stringify(list)));
      setIsStartDateSelected(false);
    } else {
      setIsStartDateSelected(true);
      startDate.current = data.value;
    }
  };

  return (
    <View className='select-date'>
      <View className='select-date-title'>房源空闲档期</View>

      <View className='select-date-des'>选择您可以接待房客的时间</View>
      <View className='calendar-wrapper'>
        <AtCalendar
          multiple={true}
          // multiple={true}
          isMultiSelect
          // marks={selectDataList.current}
          currentDate={currentDateMulti.current}
          marks={selectDataList}
          // validRange={{ start: today }} // 有效日期范围
          minDate={today}
          onDayClick={selectDateMulti}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
};

const Tips = () => {
  return (
    <View className='tips'>
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

const Agreement = () => {
  return (
    <View className='agreement'>
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

const Price = () => {
  const systemInfo = Taro.getSystemInfoSync();
  const [pricePercentage, setPricePercentage] = useState<number>(0);
  const [position, setPosition] = useState(systemInfo.windowWidth * 0.1);
  return (
    <View className='price'>
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
      <View className='step-14-confirm-price'>
        当前价格：{pricePercentage * (80 - 20) + 20}
      </View>
      <View
        className='step-14-confirm-price-range'
        onTouchMove={e => {
          const start = systemInfo.windowWidth * 0.1;
          console.log(e);
          const end = e.changedTouches[0].clientX;
          const percentage = (end - start) / (systemInfo.windowWidth * 0.8);
          console.log(start, end, systemInfo.windowWidth * 0.8);
          setPricePercentage(percentage);
          setPosition(end);
        }}
        onClick={e => {
          const start = systemInfo.windowWidth * 0.1;
          const end = e.detail.x;
          const percentage = (end - start) / (systemInfo.windowWidth * 0.8);
          setPricePercentage(percentage);
          setPosition(end);
        }}
      >
        <View
          className='left-part'
          style={{
            width: `${position - systemInfo.windowWidth * 0.1}px`,
            backgroundColor: '#7A73FF',
          }}
        ></View>
        <View
          className='circle'
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '20px',
            backgroundColor: '#7A73FF',
            left: `${position - 10 - systemInfo.windowWidth * 0.1}px`,
            top: '-5px',
            position: 'absolute',
          }}
        ></View>
      </View>
      <View className='price-range-number'>
        <View className='min'>20旅行币/晚</View>
        <View className='max'>80旅行币/晚</View>
      </View>
      <View className='step-14-confirm-tips'>
        当价格接近推荐值时，吸引力较高；当价格高于推荐值，可能影响房客的预订率噢。
      </View>
    </View>
  );
};
const HouseInfo = () => {
  const [capacity, setCapacity] = useState<number>(1);
  const [gender, setGender] = useState<'male' | 'female' | 'nolimited'>(
    'nolimited',
  );
  const [type, setType] = useState<0 | 1 | 2 | 3>(0);
  return (
    <View className='house-info'>
      <View className='house-info-title'>确认房源价值</View>
      <View className='capacity'>
        <View className='left'>可以接待房客的人数</View>
        <View className='right'>
          <Image
            src={GreySubstract}
            className='img-substract'
            onClick={() => {
              if (capacity > 1) {
                setCapacity(capacity - 1);
              }
            }}
          />
          {capacity}
          <Image
            src={GreyAdd}
            className='img-add'
            onClick={() => {
              setCapacity(capacity + 1);
            }}
          />
        </View>
      </View>
      <View className='gender'>
        可以接待房客的性别
        <View className='options'>
          <View className={`option`}>
            男
            <Image
              src={gender == 'male' ? BlueEnable : GreyCircle}
              className='img-select'
              onClick={() => {
                setGender('male');
              }}
            />
          </View>
          <View className={`option ${gender == 'female' ? 'active' : ''}`}>
            女
            <Image
              src={gender == 'female' ? BlueEnable : GreyCircle}
              className='img-select'
              onClick={() => {
                setGender('female');
              }}
            />
          </View>
          <View className={`option ${gender == 'nolimited' ? 'active' : ''}`}>
            不限
            <Image
              src={gender == 'nolimited' ? BlueEnable : GreyCircle}
              className='img-select'
              onClick={() => {
                setGender('nolimited');
              }}
            />
          </View>
        </View>
      </View>
      <View className='type'>
        可以提供的住宿类型
        <View className={`option`}>
          <View className='option-name'>您与房客共享同一住宿空间</View>
          <Image
            src={type == 1 ? BlueEnable : GreyCircle}
            className='img-select'
            onClick={() => {
              setType(1);
            }}
          />
        </View>
        <View className={`option ${gender == 'female' ? 'active' : ''}`}>
          <View className='option-name'>房客有独立的住宿空间</View>
          <Image
            src={type == 2 ? BlueEnable : GreyCircle}
            className='img-select'
            onClick={() => {
              setType(2);
            }}
          />
        </View>
        <View className={`option ${gender == 'nolimited' ? 'active' : ''}`}>
          <View className='option-name'> 房客有整套公寓或者房屋</View>
          <Image
            src={type == 3 ? BlueEnable : GreyCircle}
            className='img-select'
            onClick={() => {
              setType(3);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const Question = () => {
  const [isShowSelectPopup, setIsShowSelectPopup] = useState(false);
  const [isShowPersonalizedPopup, setIsShowPersonalizedPopup] = useState(false);
  const [isQ0, setIsQ0] = useState<Boolean>(false);
  const [isQ1, setIsQ1] = useState<Boolean>(false);
  const [isQ2, setIsQ2] = useState<Boolean>(false);
  const [isQ3, setIsQ3] = useState<Boolean>(false);
  const [isQ4, setIsQ4] = useState<Boolean>(false);
  const [isQ5, setIsQ5] = useState<Boolean>(false);
  const [isQ6, setIsQ6] = useState<Boolean>(false);
  const [isQ7, setIsQ7] = useState<Boolean>(false);
  const [isQ8, setIsQ8] = useState<Boolean>(false);
  const [isQ9, setIsQ9] = useState<Boolean>(false);

  // const [isShow]
  const questionGroups = [
    {
      title: '与旅行相关的问题',
      list: [
        { value: '是什么契机让你踏上这次旅行？', index: 0 },
        { value: '本次旅途中，你最期待体验或感受什么？', index: 1 },
        { value: '请用一两句话描述你在旅途中的“必做清单”', index: 2 },
        { value: '简单描述一下你的旅行计划？', index: 3 },
        { value: '你曾有过类似的旅行借宿体验吗？', index: 4 },
      ],
    },
    {
      title: '与您和您的房间相关的问题',
      list: [
        { value: '如果我们有机会交流，你最感兴趣的话题是？', index: 5 },
        { value: '你喜欢的交流方式？', index: 6 },
        { value: '你为什么选择我的小屋作为你的目的地？', index: 7 },
        { value: '你希望在我的小屋度过怎样的一天？', index: 8 },
        { value: '你对房间内的哪些设施最感兴趣或最需要？', index: 9 },
      ],
    },
  ];
  const getIfSelect = useCallback(() => {
    let count = 0;
    isQ0 && count++;
    isQ1 && count++;
    isQ2 && count++;
    isQ3 && count++;
    isQ4 && count++;
    isQ5 && count++;
    isQ6 && count++;
    isQ7 && count++;
    isQ8 && count++;
    isQ9 && count++;
    return count < 3;
  }, [isQ0, isQ1, isQ2, isQ3, isQ4, isQ5, isQ6, isQ7, isQ8, isQ9]);
  return (
    <View className='question'>
      {isShowSelectPopup && (
        <Popup
          onClickClose={() => {
            setIsShowSelectPopup(false);
          }}
          onClickConfirm={() => {
            setIsShowSelectPopup(false);
          }}
          title={'选择您感兴趣的问题'}
          content={
            <>
              <View className='content-title'>
                您最多可以选择3个问题，至少选择1个
              </View>
              <View className='question-groups'>
                <View className='group-title'>与旅行相关的问题</View>
                <View
                  className={`group-item ${isQ0 ? 'active' : ''}`}
                  onClick={() => {
                    isQ0 && setIsQ0(false);
                    !isQ0 && getIfSelect() && setIsQ0(true);
                  }}
                >
                  是什么契机让你踏上这次旅行？
                </View>
                <View
                  className={`group-item ${isQ1 ? 'active' : ''}`}
                  onClick={() => {
                    isQ1 && setIsQ1(false);
                    !isQ1 && getIfSelect() && setIsQ1(true);
                  }}
                >
                  本次旅途中，你最期待体验或感受什么？
                </View>
                <View
                  className={`group-item ${isQ2 ? 'active' : ''}`}
                  onClick={() => {
                    isQ2 && setIsQ2(false);
                    !isQ2 && getIfSelect() && setIsQ2(true);
                  }}
                >
                  请用一两句话描述你在旅途中的“必做清单”
                </View>
                <View
                  className={`group-item ${isQ3 ? 'active' : ''}`}
                  onClick={() => {
                    isQ3 && setIsQ3(false);
                    !isQ3 && getIfSelect() && setIsQ3(true);
                  }}
                >
                  简单描述一下你的旅行计划？
                </View>
                <View
                  className={`group-item ${isQ4 ? 'active' : ''}`}
                  onClick={() => {
                    isQ4 && setIsQ4(false);
                    !isQ4 && getIfSelect() && setIsQ4(true);
                  }}
                >
                  你曾有过类似的旅行借宿体验吗？
                </View>
                <View className='group-title'>与您和您的房间相关的问题</View>
                <View
                  className={`group-item ${isQ5 ? 'active' : ''}`}
                  onClick={() => {
                    isQ5 && setIsQ5(false);
                    !isQ5 && getIfSelect() && setIsQ5(true);
                  }}
                >
                  如果我们有机会交流，你最感兴趣的话题是？
                </View>
                <View
                  className={`group-item ${isQ6 ? 'active' : ''}`}
                  onClick={() => {
                    isQ6 && setIsQ6(false);
                    !isQ6 && getIfSelect() && setIsQ6(true);
                  }}
                >
                  你喜欢的交流方式？
                </View>
                <View
                  className={`group-item ${isQ7 ? 'active' : ''}`}
                  onClick={() => {
                    isQ7 && setIsQ7(false);
                    !isQ7 && getIfSelect() && setIsQ7(true);
                  }}
                >
                  你为什么选择我的小屋作为你的目的地？
                </View>
                <View
                  className={`group-item ${isQ8 ? 'active' : ''}`}
                  onClick={() => {
                    isQ8 && setIsQ8(false);
                    !isQ8 && getIfSelect() && setIsQ8(true);
                  }}
                >
                  你希望在我的小屋度过怎样的一天？
                </View>
                <View
                  className={`group-item ${isQ9 ? 'active' : ''}`}
                  onClick={() => {
                    isQ9 && setIsQ9(false);
                    !isQ9 && getIfSelect() && setIsQ9(true);
                  }}
                >
                  你对房间内的哪些设施最感兴趣或最需要？
                </View>
              </View>
            </>
          }
        />
      )}
      {isShowPersonalizedPopup && (
        <Popup
          onClickClose={() => {
            setIsShowPersonalizedPopup(false);
          }}
          onClickConfirm={() => {
            setIsShowPersonalizedPopup(false);
          }}
          title={'添加定制化问题'}
          content={
            <>
              <View className='content-title'>您最多可以添加3个问题</View>
              <View className='personalized-question-groups'>
                <View className='group-item'>
                  <Textarea
                    className='question1'
                    value={''}
                    onInput={() => {}}
                  />
                  <View className='question-limit'>0/50</View>
                </View>
                <View className='group-item'>
                  <Textarea
                    className='question2'
                    value={''}
                    onInput={() => {}}
                  />
                  <View className='question-limit'>0/50</View>
                </View>
                <View className='group-item'>
                  <Textarea
                    className='question3'
                    value={''}
                    onInput={() => {}}
                  />
                  <View className='question-limit'>0/50</View>
                </View>
                {/* <Textarea
                className='question-1'
                value={''}
                onInput={() => {}}
                placeholder=''
              />
              <Textarea
                className='question-2'
                value={''}
                onInput={() => {}}
                placeholder=''
              />
              <Textarea
                className='question-3'
                value={''}
                onInput={() => {}}
                placeholder=''
              /> */}
              </View>
            </>
          }
        />
      )}

      <View className='question-title'>您对房客的期待</View>
      <View className='question-des'>您想对预定房间的房客问什么问题？</View>
      <View
        className='question-select'
        onClick={() => {
          setIsShowSelectPopup(true);
        }}
      >
        选择你感兴趣的问题吧
        <Image src={KeyArrowLeft} className='arrow-left' />
      </View>
      <View
        className='question-personalized'
        onClick={() => {
          setIsShowPersonalizedPopup(true);
        }}
      >
        添加你的定制化问题吧
        <Image src={KeyArrowLeft} className='arrow-left' />
      </View>
    </View>
  );
};
