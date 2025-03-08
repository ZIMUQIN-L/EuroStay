import { View, Text, Input, Image, Picker } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import { AtCalendar } from 'taro-ui';
import { formatToday } from '@utils/dateUtil';

const ActivityPublish = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    activityTag: [],
    activityDesc: '',
    country: '国家',
    city: '城市',
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
  const [endDate, setEndDate] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleDateChange = (startValue, endValue) => {
    setStartDate(startValue);
    setEndDate(endValue);
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

  const countries = ['中国', '法国', '德国', '意大利', '西班牙', '英国'];
  const cities = {
    中国: ['北京', '上海', '广州', '深圳'],
    法国: ['巴黎', '里昂', '马赛', '波尔多'],
    德国: ['柏林', '慕尼黑', '汉堡', '科隆'],
    意大利: ['罗马', '米兰', '佛罗伦萨', '威尼斯'],
    西班牙: ['马德里', '巴塞罗那', '瓦伦西亚', '塞维利亚'],
    英国: ['伦敦', '曼彻斯特', '利物浦', '爱丁堡'],
  };

  const handleTagSelect = tag => {
    const newTags = formData.activityTag.includes(tag)
      ? formData.activityTag.filter(t => t !== tag)
      : [...formData.activityTag, tag];
    setFormData({ ...formData, activityTag: newTags });
  };

  const handleGenderSelect = gender => {
    setFormData({ ...formData, participantGender: gender });
  };

  const handleParticipantCountSelect = count => {
    setFormData({ ...formData, participantCount: count });
  };

  const handleOtherReqSelect = req => {
    const newReqs = formData.otherRequirements.includes(req)
      ? formData.otherRequirements.filter(r => r !== req)
      : [...formData.otherRequirements, req];
    setFormData({ ...formData, otherRequirements: newReqs });
  };

  const handleImageUpload = () => {
    Taro.chooseImage({
      count: 6 - formData.activityImages.length,
      success: res => {
        setFormData({
          ...formData,
          activityImages: [...formData.activityImages, ...res.tempFilePaths],
        });
      },
    });
  };

  const handleCountryChange = e => {
    const selectedCountry = countries[e.detail.value];
    setFormData({
      ...formData,
      country: selectedCountry,
      city: '选择城市',
    });
  };

  const handleCityChange = e => {
    const selectedCity = cities[formData.country][e.detail.value];
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

  return (
    <View className='activity-publish'>
      <View className='section'>
        <View className='section-title'>
          <View className='section-title-icon' />
          <Text>活动基本信息</Text>
        </View>

        <View className='input-item'>
          <Text className='label'>活动名称*</Text>
          <Input
            className='input'
            placeholder='请输入活动名称'
            placeholderClass='placeholder'
            value={formData.activityName}
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
          </View>
        </View>

        <View className='input-item'>
          <Text className='label'>活动描述*</Text>
          <Input
            className='input'
            placeholder='请简短对此活动进行描述'
            placeholderClass='placeholder'
            value={formData.activityDesc}
            onInput={e =>
              setFormData({ ...formData, activityDesc: e.detail.value })
            }
          />
        </View>

        <View className='input-item'>
          <Text className='label'>活动地点*</Text>
          <View className='address-select'>
            <Picker
              mode='selector'
              range={countries}
              onChange={handleCountryChange}
              className='picker'
            >
              <View className='picker-item'>
                <Text
                  className={formData.country === '国家' ? 'placeholder' : ''}
                >
                  {formData.country}
                </Text>
              </View>
            </Picker>
            <Picker
              mode='selector'
              range={cities[formData.country] || []}
              onChange={handleCityChange}
              className='picker'
            >
              <View className='picker-item'>
                <Text className={formData.city === '城市' ? 'placeholder' : ''}>
                  {formData.city}
                </Text>
              </View>
            </Picker>
          </View>
        </View>

        <View className='input-item'>
          <Text className='label'>详细地址</Text>
          <Input
            className='input'
            placeholder='请填写活动地点的详细地址'
            placeholderClass='placeholder'
            value={formData.detailAddress}
            onInput={e =>
              setFormData({ ...formData, detailAddress: e.detail.value })
            }
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
          <Text className='label'>参赛者要求</Text>
          <View className='capacity-input'>
            <Text className='capacity-label'>人数</Text>
            <Input
              className='input'
              type='number'
              placeholder='0'
              placeholderClass='placeholder'
              value={formData.price}
              onInput={e => setFormData({ ...formData, price: e.detail.value })}
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
              currentDate={{ start: startDate, end: endDate }}
              minDate={today}
              onDayClick={date => {
                const selectedDate = date.value;
                if (selectedDate < startDate) {
                  setStartDate(selectedDate);
                  setEndDate(null);
                  setIsSelected(true);
                  return;
                }
                if (isSelected) {
                  setEndDate(selectedDate);
                  setIsSelected(false);
                  return;
                }
                setStartDate(selectedDate);
                setEndDate(null);
                setIsSelected(true);
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
              className='time-picker'
            >
              <View className='picker-value'>{formData.startTime}</View>
            </Picker>
          </View>
        </View>
      </View>

      <View className='submit-post-activity'>发布活动</View>
    </View>
  );
};

export default ActivityPublish;
