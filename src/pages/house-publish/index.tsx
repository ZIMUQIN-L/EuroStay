import React, { useState, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Input, Textarea, Image, Picker } from '@tarojs/components';
import { AtCalendar } from 'taro-ui';
import {
  calculateDaysBetweenDates,
  formatTimestamp,
  formatToday,
  mergeDateRanges,
  formatDate,
} from '@utils/dateUtil';
import '../../components/Popup/index.scss';
import Popup from '../../components/Popup';
import './index.scss';
import GlobalStore from '@store/GlobalStore';
import { API } from '@utils/apiService';

enum Gender {
  Female = 0,
  Male = 1,
  NoLimit = 2,
  Default = 999,
}

enum PropertyStatus {
  Unavailable = 0,
  Available = 1,
}

interface HouseFormData {
  houseName: string;
  houseTag: string[];
  houseDesc: string;
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
  flexiblePrice: boolean;
  tenantGender: number;
  tenantCount: number;
  houseImages: string[];
  paymentImages: string[];
  story: string;
  wechat: string;
  status: number;
  receptionTime: string[];
}

interface PropertyBase {
  id: number;
  title: string;
  description: string;
  location: string;
  searchableLocation: number;
  price: number;
  images: string[];
  tags: string[];
  gender: number;
  capacity: number;
  requirements: string[];
  whyHost: string;
  wxId: string;
  qrCode: string;
  availableDate: string[];
}

const HousePublish = () => {
  const [formData, setFormData] = useState<HouseFormData>({
    houseName: '',
    houseTag: [],
    houseDesc: '',
    country: { id: 0, cname: '选择国家', name: '' },
    city: { id: 0, cname: '选择城市', name: '' },
    detailAddress: '',
    flexiblePrice: false,
    tenantGender: Gender.Default,
    tenantCount: 0,
    houseImages: [],
    paymentImages: [],
    story: '',
    wechat: '',
    status: PropertyStatus.Available,
    receptionTime: [],
  });
  const today = formatToday();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [isShowTagPop, setIsShowTagPop] = useState(false);
  const [curTag, setCurTag] = useState('');
  const [curTagCategory, setCurTagCategory] = useState('');
  const [multiDays, setMultiDays] = useState<[string, string][]>([]);
  const [marks, setMarks] = useState<{ value: string }[]>([]);
  const [countries, setCountries] = useState<
    { id: number; cname: string; name: string }[]
  >([]);
  const [cities, setCities] = useState<
    { id: number; cname: string; name: string }[]
  >([]);
  const [pid, setPid] = useState<number | null>(null);
  const uploadRes = useRef<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowReceptionTimePop, setIsShowReceptionTimePop] = useState(false);
  const [curReceptionTime, setCurReceptionTime] = useState('');
  const [customReceptionTimes, setCustomReceptionTimes] = useState<string[]>([]);
  const [isShowStoryPop, setIsShowStoryPop] = useState(false);
  const [curStory, setCurStory] = useState('');
  const [customStories, setCustomStories] = useState<string[]>([]);

  // 定义标签分类
  const [tagCategories, setTagCategories] = useState([
    {
      name: '房源类型',
      tags: ['学生公寓', '社会公寓', '自购房源', '合租'],
      id: 'propertyType'
    },
    {
      name: '居住条件',
      tags: ['独立房源', '独立房间', '沙发', '气垫床'],
      id: 'livingCondition'
    },
    // {
    //   name: '接待类型',
    //   tags: ['一口价', '可商议'],
    //   id: 'receptionType'
    // },
    {
      name: '房源特色',
      tags: ['可做饭', '可洗衣', '有咖啡机', '有电视', '有花园', '有阳台', '有宠物'],
      id: 'propertyFeatures'
    },
    // {
    //   name: '可接待时间',
    //   tags: ['周末有空', '节假日有空', '时间都可商议'],
    //   id: 'availableTime'
    // }
  ]);

  const tenantCounts = [
    { id: 1, name: '1人' },
    { id: 2, name: '2人' },
    { id: 3, name: '3人及以上' },
  ];

  const otherReqs = [
    { id: 1, name: '要干净' },
    { id: 2, name: '外向' },
    { id: 3, name: '喜欢小狗' },
  ];

  useEffect(() => {
    const params = Taro.getCurrentInstance().router?.params;
    const routerPid = params?.pid;

    Taro.setNavigationBarTitle({
      title: routerPid ? '修改房源' : '发布房源',
    });
    if (routerPid) {
      setPid(Number(routerPid));
      fetchPropertyBase(Number(routerPid));
    }
    getCountries();
  }, []);

  useEffect(() => {
    getCities();
  }, [formData.country.id]);

  const getCities = async () => {
    try {
      const citiesData = await API.location.cityList(formData.country.id);
      setCities(citiesData);
    } catch (error) {
      Taro.showToast({
        title: '获取城市列表失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    }
  };

  const getCountries = async () => {
    try {
      const countriesData = await API.location.countryList();
      setCountries(countriesData);
    } catch (error) {
      Taro.showToast({
        title: '获取国家列表失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    }
  };

  const fetchPropertyBase = async (propertyId: number) => {
    try {
      const detail = await API.property.getPropertyDetail(propertyId);

      const availableDates: [string, string][] = [];
      let currentStart = '';

      detail.availableDate.forEach((date, index) => {
        const cleanDate = date.split(' ')[0];
        if (index % 2 === 0) {
          currentStart = cleanDate;
        } else {
          availableDates.push([currentStart, cleanDate]);
        }
      });

      setFormData({
        ...formData,
        houseName: detail.title,
        houseDesc: detail.description,
        country: {
          id: detail.countryId || 0,
          cname: detail.country || '',
          name: '',
        },
        city: {
          id: detail.cityId || 0,
          cname: detail.city || '',
          name: '',
        },
        detailAddress: detail.address || '',
        flexiblePrice: detail.flexiblePrice || false,
        tenantGender: detail.gender,
        tenantCount: detail.capacity,
        houseImages: detail.images || [],
        wechat: detail.wxId || '',
        houseTag: detail.tags || [],
        status: detail.status || PropertyStatus.Available,
        receptionTime: detail.receptionTime || [],
        story: detail.requirement || '',
      });

      setMultiDays(availableDates);
    } catch (error) {
      console.error('获取房源信息失败，请重试', error);
      Taro.showToast({
        title: '获取房源信息失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    }
  };

  const handleDateChange = (startValue, endValue) => {
    setStartDate(startValue);
    setEndDate(endValue);
  };

  const handleTagSelect = (tag: string) => {
    const newTags = formData.houseTag.includes(tag)
      ? formData.houseTag.filter(t => t !== tag)
      : [...formData.houseTag, tag];
    setFormData({ ...formData, houseTag: newTags });
  };

  const handleAddCustomTag = (categoryId: string) => {
    setCurTagCategory(categoryId);
    setIsShowTagPop(true);
  };

  const handleTagConfirm = () => {
    if (curTag.trim()) {
      // 添加新标签到对应类别
      setTagCategories(prev => prev.map(category => 
        category.id === curTagCategory 
          ? { ...category, tags: [...category.tags, curTag] }
          : category
      ));
      
      // 添加到表单数据
      handleTagSelect(curTag);
      
      // 重置当前标签
      setCurTag('');
      setIsShowTagPop(false);
    }
  };

  const handleGenderSelect = gender => {
    setFormData({ ...formData, tenantGender: gender });
  };

  const handleFlexiblePriceToggle = (isFlexible: boolean) => {
    setFormData({ ...formData, flexiblePrice: isFlexible });
  };

  const handleTenantCountSelect = count => {
    setFormData({ ...formData, tenantCount: count });
  };

  const handleTenantCountInput = e => {
    const value = e.detail.value;
    // 确保输入是有效的数字
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setFormData({ ...formData, tenantCount: value === '' ? 0 : Number(value) });
    }
  };

  const handleUpload = async (type: string) => {
    try {
      const res = await Taro.chooseImage({
        count: type === 'house' ? 6 - formData.houseImages.length : 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
      });
      
      const uploadPromises = res.tempFilePaths.map(file => 
        API.common.upload(file, { prefix: 'test' })
      );
      
      const uploadedImages = await Promise.all(uploadPromises);
      
      if (type === 'house') {
        setFormData({
          ...formData,
          houseImages: [...formData.houseImages, ...uploadedImages],
        });
      } else {
        setFormData({
          ...formData,
          paymentImages: [...formData.paymentImages, ...uploadedImages],
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
      city: { id: 0, cname: '选择城市', name: '' },
    });
  };

  const handleCityChange = e => {
    const selectedCity = cities[e.detail.value];
    setFormData({
      ...formData,
      city: selectedCity,
    });
  };

  useEffect(() => {
    let marksList: { value: string }[] = [];
    multiDays.forEach(day => {
      for (let i = 0; i <= calculateDaysBetweenDates(day[0], day[1]); i++) {
        marksList.push({
          value: formatTimestamp(
            new Date(day[0]).getTime() + i * 24 * 60 * 60 * 1000,
          ),
        });
      }
    });
    setMarks(marksList);
  }, [multiDays.length]);

  const handleStoryInput = (e) => {
    setFormData({
      ...formData,
      story: e.detail.value
    });
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.houseName.trim()) {
      errors.push('别忘了房源名称哦~');
    }

    if (formData.houseTag.length === 0) {
      errors.push('请至少选择一个房源标签');
    }

    if (!formData.houseDesc.trim()) {
      errors.push('请填写房源描述');
    }

    if (formData.city.id === 0) {
      errors.push('请选择房源所在地区');
    }

    if (!formData.detailAddress.trim()) {
      errors.push('请填写详细地址');
    }

    if (formData.tenantGender === Gender.Default) {
      errors.push('请选择租客性别要求');
    }

    if (formData.tenantCount === 0) {
      errors.push('请填写租客人数要求');
    }

    if (formData.houseImages.length === 0) {
      errors.push('请至少上传一张房源照片');
    }

    if (formData.status !== PropertyStatus.Available && formData.status !== PropertyStatus.Unavailable) {
      errors.push('请选择房源状态');
    }

    if (!formData.wechat.trim()) {
      errors.push('请填写微信号');
    }

    if (!formData.story.trim()) {
      errors.push('请填写对guest的期待');
    }

    return errors;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const errors = validateForm();
    if (errors.length > 0) {
      Taro.showToast({
        title: errors[0],
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Create tagsJson from tag categories
      const tagsJson = {};
      tagCategories.forEach(category => {
        const selectedTags = category.tags.filter(tag => formData.houseTag.includes(tag));
        if (selectedTags.length > 0) {
          tagsJson[category.id] = selectedTags;
        }
      });

      // Convert available dates to required format
      const availableDates = multiDays
        .flatMap(pair => pair)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

      const requestData = {
        ...(pid && { pid }),
        title: formData.houseName,
        tags: formData.houseTag,
        tagsJson: JSON.stringify(tagsJson),
        country: formData.country.cname,
        countryId: formData.country.id,
        city: formData.city.cname,
        cityId: formData.city.id,
        address: formData.detailAddress,
        description: formData.houseDesc,
        capacity: formData.tenantCount,
        gender: formData.tenantGender,
        images: formData.houseImages,
        wxId: formData.wechat,
        price: 0,
        flexiblePrice: formData.flexiblePrice,
        status: formData.status,
        receptionTime: formData.receptionTime,
        requirement: formData.story,
        availableDate: availableDates,
      };

      if (pid) {
        const modifyData = {
          pid,
          title: requestData.title,
          tags: requestData.tags,
          tagsJson: requestData.tagsJson,
          country: requestData.country,
          countryId: requestData.countryId,
          city: requestData.city,
          cityId: requestData.cityId,
          address: requestData.address,
          description: requestData.description,
          capacity: requestData.capacity,
          gender: requestData.gender,
          images: requestData.images,
          wxId: requestData.wxId,
          price: requestData.price,
          flexiblePrice: requestData.flexiblePrice,
          status: requestData.status,
          receptionTime: requestData.receptionTime,
          requirement: requestData.requirement,
          availableDate: requestData.availableDate,
        };
        await API.property.modifyProperty(modifyData);
        Taro.showToast({
          title: '修改成功！',
          icon: 'none',
          duration: 2000,
        });
      } else {
        await API.property.uploadProperty(requestData);
        Taro.showToast({
          title: '你已成功上传房源！房源正在等待审核，审核通过后将公众可见。',
          icon: 'none',
          duration: 2000,
        });
      }
      
      setTimeout(() => {
        Taro.navigateBack();
      }, 2000);
    } catch (error) {
      console.error('Submission failed:', error);
      Taro.showToast({
        title: '网络请求失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusSelect = (status: number) => {
    setFormData({ ...formData, status: status });
  };

  const handleReceptionTimeSelect = (time: string) => {
    const newTimes = formData.receptionTime.includes(time)
      ? formData.receptionTime.filter(t => t !== time)
      : [...formData.receptionTime, time];
    setFormData({ ...formData, receptionTime: newTimes });
  };

  const handleAddReceptionTime = () => {
    setIsShowReceptionTimePop(true);
  };

  const handleReceptionTimeConfirm = () => {
    if (curReceptionTime.trim()) {
      handleReceptionTimeSelect(curReceptionTime);
      setCustomReceptionTimes([...customReceptionTimes, curReceptionTime]);
      setCurReceptionTime('');
      setIsShowReceptionTimePop(false);
    }
  };

  return (
    <View className='house-publish'>
      {isShowTagPop && (
        <Popup
          className={'tag-pop'}
          content={
            <Input
              className='input'
              placeholder='请输入标签名称'
              placeholderClass='placeholder'
              value={curTag}
              onInput={e => {
                setCurTag(e.detail.value);
              }}
            />
          }
          title='添加新标签'
          onClickClose={() => {
            setIsShowTagPop(false);
          }}
          onClickConfirm={handleTagConfirm}
        />
      )}
      {isShowReceptionTimePop && (
        <Popup
          className={'reception-time-pop'}
          content={
            <Input
              className='input'
              placeholder='请输入接待时间'
              placeholderClass='placeholder'
              value={curReceptionTime}
              onInput={e => {
                setCurReceptionTime(e.detail.value);
              }}
            />
          }
          title='添加自定义接待时间'
          onClickClose={() => {
            setIsShowReceptionTimePop(false);
          }}
          onClickConfirm={handleReceptionTimeConfirm}
        />
      )}
      <View className='section'>
        <View className='section-title'>
          <View className='section-title-icon' />
          <Text>基本信息</Text>
        </View>

        <View className='input-item'>
          <Text className='label'>怎么称呼我的家（14字以内）*</Text>
          <Input
            className='input'
            placeholder='取一个有温度的名字吧~（比如尼斯阳光沙滩大别墅）'
            placeholderClass='placeholder'
            value={formData.houseName}
            maxlength={14}
            onInput={e =>
              setFormData({ ...formData, houseName: e.detail.value })
            }
          />
        </View>

        <View className='input-item'>
          <Text className='label with-margin'>房源个性标签*</Text>
          <Text className='description'>
            这些将展示在房源卡片，成为住客选择的重要参考哦！
          </Text>
          
          {tagCategories.map(category => (
            <View key={category.id} className='tag-category'>
              <Text className='category-title'>{category.name}</Text>
          <View className='tags'>
                {category.tags.map(tag => (
              <Text
                    key={tag}
                    className={`tag ${formData.houseTag.includes(tag) ? 'active' : ''}`}
                    onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </Text>
            ))}
                <Text className='option' onClick={() => handleAddCustomTag(category.id)}>+</Text>
          </View>
            </View>
          ))}
        </View>

        <View className='input-item'>
          <Text className='label'>关于我家*</Text>
          <Text className='description'>
          可以填写你家的基本信息（如周边环境特色，房源特色等等）或者你希望的相处公约哦（如门禁时间，有宠物，有些物品不能使用等可能有争议的部分）
          </Text>
          <Textarea
            className='textarea'
            placeholder='请描述一些您房源的基本信息和入住须知，减少前期的沟通成本哦,将会展现在您的房源详情界面'
            placeholderClass='placeholder'
            value={formData.houseDesc}
            onInput={e =>
              setFormData({ ...formData, houseDesc: e.detail.value })
            }
            autoHeight
          />
        </View>

        <View className='input-item'>
          <Text className='label'>所在地区*</Text>
          <View className='address-select'>
            <Picker
              mode='selector'
              range={countries?.map(country => country.cname)}
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
          <Text className='label'>详细地址*</Text>
          <Textarea
            className='textarea'
            placeholder='请填写更详细的位置信息，将会展现在房源详情界面，大概在哪个区域什么街道离景点车站距离呢'
            placeholderClass='placeholder'
            value={formData.detailAddress}
            onInput={e =>
              setFormData({ ...formData, detailAddress: e.detail.value })
            }
            autoHeight
          />
        </View>

        
        
        <View className='input-item'>
          <View className='price-options'>
            <Text className='label'>接待类型</Text>
            <Text
              className={`option ${formData.flexiblePrice ? 'active' : ''}`}
              onClick={() => handleFlexiblePriceToggle(true)}
            >
              可商议
            </Text>
            <Text
              className={`option ${!formData.flexiblePrice ? 'active' : ''}`}
              onClick={() => handleFlexiblePriceToggle(false)}
            >
              一口价
            </Text>
          </View>
        </View>

        <View className='input-item'>
          <>
            <Text className='label with-margin'>我期望的Guest*</Text>
            <View className='gender-options'>
              <Text className='label'>性别</Text>
              <Text
                className={`option ${formData.tenantGender === Gender.Female ? 'active' : ''}`}
                onClick={() => handleGenderSelect(Gender.Female)}
              >
                女
              </Text>
              <Text
                className={`option ${formData.tenantGender === Gender.Male ? 'active' : ''}`}
                onClick={() => handleGenderSelect(Gender.Male)}
              >
                男
              </Text>
              <Text
                className={`option ${formData.tenantGender === Gender.NoLimit ? 'active' : ''}`}
                onClick={() => handleGenderSelect(Gender.NoLimit)}
              >
                不限制性别
              </Text>
            </View>
          </>

          <View className='count-options'>
            <Text className='label '>人数</Text>
            <View className='number-input-container'>
              <Input
                className='number-input'
                type='number'
                placeholder='可接待人数'
                placeholderClass='placeholder'
                value={formData.tenantCount === 0 ? '' : String(formData.tenantCount)}
                onInput={handleTenantCountInput}
              />
              <Text className='unit'>人</Text>
            </View>
          </View>
        </View>
        <View className='input-item'>
          <View className='label label-flex with-margin'>
            <Text>我家的照片*</Text>
            <Text className='image-count'>
              {formData.houseImages.length}/6张
            </Text>
          </View>
          <Text className='description'>
        请拍摄一下你家里的【客厅】【厨房】【卫生间】【旅客住宿区域】的照片，客观真实的展示你家的美照吧！这些将展示在房源卡片，成为住客选择的重要参考哦~
          </Text>
          <View className='image-upload'>
            {formData.houseImages.map((image, index) => (
              <View key={index} className='image-item'>
                <Image src={image} mode='aspectFill' />
                <View
                  className='delete-icon'
                  onClick={e => {
                    e.stopPropagation();
                    const newImages = formData.houseImages.filter(
                      (_, i) => i !== index,
                    );
                    setFormData({ ...formData, houseImages: newImages });
                  }}
                >
                  ×
                </View>
              </View>
            ))}
            {formData.houseImages.length < 6 && (
              <View
                className='upload-button'
                onClick={() => handleUpload('house')}
              >
                <Text className='plus'>+</Text>
              </View>
            )}
          </View>
        </View>
        <View className='input-item'>
          <View className='label'>
            <Text>我家什么时候有空~</Text>
            <View className='multi-days'>
              {multiDays.map((day, index) => (
                <View key={index} className='multi-day active'>
                  <Text>
                    {day[0]} - {day[1]}
                  </Text>
                  <View
                    className='delete-icon'
                    onClick={() => {
                      setMultiDays(multiDays.filter((_, i) => i !== index));
                    }}
                  >
                    ×
                  </View>
                </View>
              ))}
            </View>
          </View>
          <Text className='description'>
            请选择你更希望接待的时间吧，可选择多个时间段哦！
          </Text>
          
          <View className='tag-category'>
            <Text className='category-title'>房源状态*</Text>
            <View className='tags'>
              <Text
                className={`tag ${formData.status === PropertyStatus.Available ? 'active' : ''}`}
                onClick={() => handleStatusSelect(PropertyStatus.Available)}
              >
                正在接待
              </Text>
              <Text
                className={`tag ${formData.status === PropertyStatus.Unavailable ? 'active' : ''}`}
                onClick={() => handleStatusSelect(PropertyStatus.Unavailable)}
              >
                未开放接待
              </Text>
            </View>
          </View>
          
          <View className='tag-category'>
            <Text className='category-title'>接待时间</Text>
            <View className='tags'>
              <Text
                className={`tag ${formData.receptionTime.includes('周末') ? 'active' : ''}`}
                onClick={() => handleReceptionTimeSelect('周末')}
              >
                周末
              </Text>
              <Text
                className={`tag ${formData.receptionTime.includes('节假日') ? 'active' : ''}`}
                onClick={() => handleReceptionTimeSelect('节假日')}
              >
                节假日
              </Text>
              {customReceptionTimes.map((time, index) => (
                <Text
                  key={`custom-time-${index}`}
                  className={`tag ${formData.receptionTime.includes(time) ? 'active' : ''}`}
                  onClick={() => handleReceptionTimeSelect(time)}
                >
                  {time}
                </Text>
              ))}
              <Text className='option' onClick={handleAddReceptionTime}>+</Text>
            </View>
          </View>
          
          <View className='date-select '>
            <AtCalendar
              isMultiSelect
              multiple={true}
              marks={marks}
              currentDate={{ start: startDate, end: endDate }}
              minDate={today}
              onDayClick={date => {
                const selectedDate = date.value;
                const flag = multiDays.some(
                  day =>
                    new Date(day[0]) < new Date(selectedDate) &&
                    new Date(day[1]) > new Date(selectedDate),
                );
                if (flag) {
                  return;
                }
                if (selectedDate < startDate) {
                  setStartDate(selectedDate);
                  setEndDate(null);
                  setIsSelected(true);
                  return;
                }
                if (isSelected) {
                  setEndDate(selectedDate);
                  setIsSelected(false);
                  const mergedMultiDays = mergeDateRanges([
                    ...multiDays,
                    [startDate, selectedDate],
                  ]);
                  setMultiDays(mergedMultiDays);
                  let list: { value: string }[] = [];
                  for (
                    let i = 0;
                    i <= calculateDaysBetweenDates(startDate, selectedDate);
                    i++
                  ) {
                    list.push({
                      value: formatTimestamp(
                        new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000,
                      ),
                    });
                  }
                  setMarks([...marks, ...list]);
                  return;
                }
                setStartDate(selectedDate);
                setEndDate(null);
                setIsSelected(true);
              }}
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </View>

      <View className='section'>
        <View className='section-title'>
          <View className='section-title-icon' />
          <Text>了解更多</Text>
        </View>
        <View className='input-item'>
          <View className='form-item'>
            <View className='form-label'>期待什么样的guest？</View>
            <Text className='description'>
            如果愿意让旅客用房源/技能/较少的金钱换宿,你希望解锁什么样的旅客呢？
            </Text>
            <Textarea
              className='form-textarea'
              placeholder='请输入您对guest的期待'
              value={formData.story}
              onInput={handleStoryInput}
            />
          </View>
        </View>
      </View>
      <View className='section'>
        <View className='section-title'>
          <View className='section-title-icon' />
          <Text>联系方式</Text>
        </View>
        <View className='input-item'>
          <Text className='label'>微信号*</Text>
          <Input
            className='input'
            placeholder='请输入微信号方便以后联系，首页不会展示哦~'
            placeholderClass='placeholder'
            value={formData.wechat}
            onInput={e => setFormData({ ...formData, wechat: e.detail.value })}
          />
        </View>
      </View>
      <View 
        className={`submit-post-house ${isSubmitting ? 'disabled' : ''}`} 
        onClick={handleSubmit}
      >
        {pid ? '保存修改' : '上传房源'}
      </View>
    </View>
  );
};

export default HousePublish;