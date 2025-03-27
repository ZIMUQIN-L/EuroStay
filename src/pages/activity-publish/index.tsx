import { View, Text, Input, Image, Picker, Textarea } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import { AtCalendar } from 'taro-ui';
import { formatToday } from '@utils/dateUtil';
import GlobalStore from '@store/GlobalStore';
import Popup from '../../components/Popup';
import '../../components/Popup/index.scss';
import { combineAddress, parseAddress } from '@utils/addressUtil';

interface ActivityFormData {
  activityName: string;
  activityTag: string[];
  activityDesc: string;
  country: {
    id: number;
    cname: string;
    name: string;
  };
  city: {
    id: number;
    cname: string;
    name: string;
  };
  detailAddress: string;
  price: string;
  participantGender: string;
  participantCount: string;
  otherRequirements: string[];
  activityImages: string[];
  startTime: string;
}

interface ActivityBase {
  id: number;
  title: string;
  description: string;
  tags: string;  // 注意这里是字符串，需要解析
  location: string;
  searchableLocation: number;
  price: number;
  startTime: string;
  images: string;  // 注意这里是字符串，需要解析
  capacity: number;
}

const ActivityPublish = () => {
  const [formData, setFormData] = useState<ActivityFormData>({
    activityName: '',
    activityTag: [],
    activityDesc: '',
    country: { id: 0, cname: '选择国家', name: '' },
    city: { id: 0, cname: '选择城市', name: '' },
    detailAddress: '',
    price: '',
    participantGender: '',
    participantCount: '',
    otherRequirements: [],
    activityImages: [],
    startTime: '10:15',
  });
  const today = formatToday();
  const [startDate, setStartDate] = useState(today);
  const [isShowActivityTagPop, setIsShowActivityTagPop] = useState(false);
  const [curTag, setCurTag] = useState('');
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [countries, setCountries] = useState<
    { id: number; cname: string; name: string }[]
  >([]);
  const [cities, setCities] = useState<
    { id: number; cname: string; name: string }[]
  >([]);
  const [aid, setAid] = useState<number | null>(null);

  useEffect(() => {
    const params = Taro.getCurrentInstance().router?.params;
    const routerAid = params?.aid;
    
    Taro.setNavigationBarTitle({
      title: routerAid ? '修改活动' : '发布活动',
    });

    if (routerAid) {
      setAid(Number(routerAid));
      fetchActivityBase(Number(routerAid));
    }
    getCountries();
  }, []);

  useEffect(() => {
    getCities();
  }, [formData.country.id]);

  const getCities = async () => {
    console.log(GlobalStore.userInfo.token);
    await Taro.request({
      url: `https://api.eurostay.co/app/eslocation/cityList`,
      method: 'GET',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        countryId: formData.country.id,
      },
      success: function (response) {
        console.log(response);
        if (response.statusCode === 200 && response.data.code === 0) {
          setCities(response.data.result);
          console.log(response.data.result);
        }
      },
      fail: function (err) {
        Taro.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  };

  const getCountries = async () => {
    console.log(GlobalStore.userInfo.token);
    await Taro.request({
      url: `https://api.eurostay.co/app/eslocation/countryList`,
      method: 'GET',
      header: {
        token: GlobalStore.userInfo.token,
      },
      success: function (response) {
        if (response.statusCode === 200 && response.data.code === 0) {
          setCountries(response.data.result);
          console.log(response.data.result);
        }
      },
      fail: function (err) {
        Taro.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  };

  const fetchActivityBase = async (activityId: number) => {
    try {
      const response = await Taro.request({
        url: `https://api.eurostay.co/app/activity/getActivityBase`,
        method: 'POST',
        header: {
          token: GlobalStore.userInfo.token,
        },
        data: { id: activityId }
      });
      console.log(response);

      if (response.statusCode === 200 && response.data.code === 0) {
        const detail = response.data.result;
        
        const tags = JSON.parse(detail.tags || '[]');
        const images = JSON.parse(detail.images || '[]');
        
        const dateTime = detail.startTime.split(' ');
        const date = dateTime[0];
        const time = dateTime[1].substring(0, 5);
        
        const { country, city, detail: detailAddress } = parseAddress(detail.location);

        setFormData({
          ...formData,
          activityName: detail.title,
          activityDesc: detail.description,
          activityTag: tags,
          country: { id: 0, cname: country, name: '' },
          city: { id: detail.searchableLocation, cname: city, name: '' },
          price: String(detail.price),
          participantCount: String(detail.capacity),
          activityImages: images,
          detailAddress: detailAddress,
          startTime: time
        });

        setStartDate(date);
      }
    } catch (error) {
      Taro.showToast({
        title: '获取活动信息失败',
        icon: 'none',
        duration: 2000,
      });
    }
  };

  const tags = [
    { id: 1, name: '社交活动' },
    { id: 2, name: '美食分享' },
    { id: 3, name: '免费' },
    { id: 4, name: '聊天局' },
    { id: 5, name: '行业交流' },
  ];

  const participantCounts = [
    { id: 1, name: '1-5人' },
    { id: 2, name: '5-10人' },
    { id: 3, name: '10人以上' },
  ];

  const otherReqs = [
    { id: 1, name: '准时' },
    { id: 2, name: '友好' },
    { id: 3, name: '有经验' },
  ];

  const handleTagSelect = (tag: string) => {
    const newTags = formData.activityTag.includes(tag)
      ? formData.activityTag.filter(t => t !== tag)
      : [...formData.activityTag, tag];
    setFormData({ ...formData, activityTag: newTags });
  };

  const handleGenderSelect = (gender: string) => {
    setFormData({ ...formData, participantGender: gender });
  };

  const handleParticipantCountSelect = (count: string) => {
    setFormData({ ...formData, participantCount: count });
  };

  const handleOtherReqSelect = (req: string) => {
    const newReqs = formData.otherRequirements.includes(req)
      ? formData.otherRequirements.filter(r => r !== req)
      : [...formData.otherRequirements, req];
    setFormData({ ...formData, otherRequirements: newReqs });
  };

  const handleImageUpload = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 6 - formData.activityImages.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
      });

      if (res.tempFilePaths && res.tempFilePaths[0]) {
        const uploadRes = await Taro.uploadFile({
          url: 'https://api.eurostay.co/app/common/upload',
          filePath: res.tempFilePaths[0],
          name: 'Image',
          formData: {
            prefix: 'test',
          },
          header: {
            token: GlobalStore.userInfo.token,
          },
          success: function (result) {
            const responseData = JSON.parse(result.data);
            const imageUrl = responseData['result'];
            setFormData({
              ...formData,
              activityImages: [...formData.activityImages, imageUrl],
            });
          }
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      Taro.showToast({
        title: '上传失败',
        icon: 'none',
      });
    }
  };

  const handleCountryChange = e => {
    console.log(e, 'country');
    const selectedCountry = countries[e.detail.value];
    setFormData({
      ...formData,
      country: selectedCountry,
      city: { id: 0, cname: '选择城市', name: '' }, // 重置城市
    });
  };

  const handleCityChange = e => {
    const selectedCity = cities[e.detail.value];
    setFormData({
      ...formData,
      city: selectedCity,
    });
  };

  const handleTimeChange = e => {
    setFormData({
      ...formData,
      startTime: e.detail.value,
    });
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.activityName.trim()) {
      errors.push('请填写活动名称');
    }

    if (formData.activityTag.length === 0) {
      errors.push('请至少选择一个活动标签');
    }

    if (!formData.activityDesc.trim()) {
      errors.push('请填写活动描述');
    }

    if (formData.city.id === 0) {
      errors.push('请选择活动所在地区');
    }

    if (!formData.detailAddress.trim()) {
      errors.push('请填写详细地址');
    }

    if (!formData.participantCount || Number(formData.participantCount) <= 0) {
      errors.push('请填写有效的参与人数');
    }

    if (formData.activityImages.length === 0) {
      errors.push('请至少上传一张活动照片');
    }

    if (!startDate) {
      errors.push('请选择活动日期');
    }

    if (!formData.startTime) {
      errors.push('请选择开始时间');
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      Taro.showToast({
        title: errors[0],
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const fullAddress = combineAddress(
      formData.country.cname,
      formData.city.cname,
      formData.detailAddress
    );

    try {
      const url = aid 
        ? 'https://api.eurostay.co/app/activity/modify'
        : 'https://api.eurostay.co/app/activity/addActivity';

      const requestData = {
        ...(aid && { aid }),
        title: formData.activityName,
        description: formData.activityDesc,
        location: fullAddress,
        searchableLocation: formData.city.id,
        price: Number(formData.price),
        images: formData.activityImages,
        tags: formData.activityTag,
        capacity: formData.participantCount,
        startTime: startDate + 'T' + formData.startTime + ':00',
      };

      const response = await Taro.request({
        url,
        method: 'POST',
        header: {
          token: GlobalStore.userInfo.token,
        },
        data: requestData
      });

      if (response.statusCode === 200 && response.data.code === 0) {
        Taro.showToast({
          title: aid ? '修改成功！' : '你已成功上传活动！活动正在等待审核，审核通过后将公众可见。',
          icon: 'none',
          duration: 2000,
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 2000);
      }
    } catch (error) {
      Taro.showToast({
        title: '网络请求失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    }
  };

  return (
    <View className='activity-publish'>
      {isShowActivityTagPop && (
        <Popup
          className={'activity-tag-pop'}
          content={
            <Input
              className='input'
              placeholder='请输入活动标签'
              placeholderClass='placeholder'
              value={curTag}
              onInput={e => {
                setCurTag(e.detail.value);
              }}
            />
          }
          title='请输入个性化活动标签'
          onClickClose={() => {
            setIsShowActivityTagPop(false);
          }}
          onClickConfirm={e => {
            setIsShowActivityTagPop(false);
            handleTagSelect(curTag);
            const newTags = [...customTags, curTag];
            setCustomTags(newTags);
          }}
        />
      )}
      <View className='section'>
        <View className='section-title'>
          <View className='section-title-icon' />
          <Text>基本信息</Text>
        </View>

        <View className='input-item'>
          <Text className='label'>活动名称*</Text>
          <Input
            className='input'
            placeholder='请输入活动名称（14个字以内哦）'
            placeholderClass='placeholder'
            value={formData.activityName}
            maxlength={14}
            onInput={e =>
              setFormData({ ...formData, activityName: e.detail.value })
            }
          />
        </View>

        <View className='input-item'>
          <Text className='label with-margin'>活动标签*</Text>
          <View className='tags'>
            {tags.map(tag => (
              <Text
                key={tag.id}
                className={`tag ${formData.activityTag.includes(tag.name) ? 'active' : ''}`}
                onClick={() => handleTagSelect(tag.name)}
              >
                {tag.name}
              </Text>
            ))}
            {customTags.map((tag, index) => (
              <Text
                key={tags.length + index}
                className={`tag ${customTags.includes(tag) ? 'active' : ''}`}
                onClick={() => {
                  const newTags = customTags.includes(tag)
                    ? customTags.filter(t => t !== tag)
                    : [...customTags, tag];
                  setCustomTags(newTags);
                }}
              >
                {tag}
              </Text>
            ))}
            <Text
              className='option'
              onClick={() => {
                setIsShowActivityTagPop(true);
              }}
            >
              +
            </Text>
          </View>
        </View>

        <View className='input-item'>
          <Text className='label'>活动描述*</Text>
          <Textarea
            className='textarea'
            placeholder='请简短对此活动进行描述'
            placeholderClass='placeholder'
            value={formData.activityDesc}
            onInput={e =>
              setFormData({ ...formData, activityDesc: e.detail.value })
            }
            autoHeight
          />
        </View>

        <View className='input-item'>
          <Text className='label'>活动地点*</Text>
          <View className='address-select'>
            <Picker
              mode='selector'
              range={countries.map(country => country.cname)}
              onChange={handleCountryChange}
              className='picker'
            >
              <View className='picker-item'>
                <Text
                  className={formData.country.id === 0 ? 'placeholder' : ''}
                >
                  {formData.country.cname}
                </Text>
              </View>
            </Picker>
            <Picker
              mode='selector'
              range={cities.map(city => city.cname)}
              onChange={handleCityChange}
              className='picker'
            >
              <View className='picker-item'>
                <Text className={formData.city.id === 0 ? 'placeholder' : ''}>
                  {formData.city.cname}
                </Text>
              </View>
            </Picker>
          </View>
        </View>

        <View className='input-item'>
          <Text className='label'>详细地址</Text>
          <Textarea
            className='textarea'
            placeholder='请填写活动地点的详细地址'
            placeholderClass='placeholder'
            value={formData.detailAddress}
            onInput={e =>
              setFormData({ ...formData, detailAddress: e.detail.value })
            }
            autoHeight
          />
        </View>

        <View className='input-item'>
          <Text className='label'>活动价格</Text>
          <View className='price-input'>
            <Text className='currency'>€</Text>
            <Input
              className='input'
              type='number'
              placeholder='0'
              placeholderClass='placeholder'
              value={formData.price}
              onInput={e => setFormData({ ...formData, price: e.detail.value })}
            />
            <Text className='unit'>/人</Text>
          </View>
        </View>
        <View className='input-item'>
          <Text className='label'>参与人数</Text>
          <View className='price-input'>
            <Input
              className='input'
              type='number'
              placeholder='0'
              placeholderClass='placeholder'
              value={formData.participantCount}
              onInput={e =>
                setFormData({ ...formData, participantCount: e.detail.value })
              }
            />
            <Text className='unit'>人</Text>
          </View>
        </View>

        <View className='input-item'>
          <View className='label label-flex with-margin'>
            <Text>活动照片*</Text>
            <Text className='image-count'>
              {formData.activityImages.length}/6张
            </Text>
          </View>
          <View className='image-upload'>
            {formData.activityImages.map((image, index) => (
              <View key={index} className='image-item'>
                <Image src={image} mode='aspectFill' />
                <View 
                  className='delete-icon' 
                  onClick={(e) => {
                    e.stopPropagation();
                    const newImages = formData.activityImages.filter((_, i) => i !== index);
                    setFormData({ ...formData, activityImages: newImages });
                  }}
                >
                  ×
                </View>
              </View>
            ))}
            {formData.activityImages.length < 6 && (
              <View className='upload-button' onClick={handleImageUpload}>
                <Text className='plus'>+</Text>
              </View>
            )}
          </View>
        </View>
        <View className='input-item'>
          <View className='label'>
            <Text>活动时间*</Text>
          </View>
          <View className='date-select'>
            <AtCalendar
              isMultiSelect
              multiple={true}
              currentDate={{ start: startDate, end: startDate }}
              minDate={today}
              onDayClick={date => {
                const selectedDate = date.value;
                setStartDate(selectedDate);
              }}
              style={{ width: '100%' }}
            />
          </View>
          <View className='time-select'>
            <View className='time-label'>开始时间</View>
            <Picker
              mode='time'
              value={formData.startTime}
              onChange={handleTimeChange}
            >
              <View className='picker-item'>
                <Text>{formData.startTime}</Text>
              </View>
            </Picker>
          </View>
        </View>
      </View>

      <View className='submit-post-activity' onClick={handleSubmit}>
        {aid ? '保存修改' : '发布活动'}
      </View>
    </View>
  );
};

export default ActivityPublish;
