import { View, Text, Input, Image, Picker } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import { AtCalendar } from 'taro-ui';
import { formatToday } from '@utils/dateUtil';
import Popup from '../../components/Popup';

const HousePublish = () => {
  const [formData, setFormData] = useState({
    houseName: '',
    houseTag: [],
    houseDesc: '',
    country: '国家',
    city: '城市',
    detailAddress: '',
    price: '',
    tenantGender: '',
    tenantCount: '',
    otherRequirements: [],
    houseImages: [],
  });
  const today = formatToday();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [isShowTagPop, setIsShowTagPop] = useState(false);
  const [curTag, setCurTag] = useState('');
  const [customReqs, setCustomReqs] = useState<string[]>([]);
  const [isShowReqPop, setIsShowReqPop] = useState(false);
  const [curReq, setCurReq] = useState('');
  const [multiDays, setMultiDays] = useState<[string, string][]>([]);

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '发布房源',
    });
  }, []);

  const handleDateChange = (startValue, endValue) => {
    setStartDate(startValue);
    setEndDate(endValue);
  };

  const tags = [
    { id: 1, name: '离市中心近' },
    { id: 2, name: '公共交通方便' },
    { id: 3, name: '北欧风' },
    { id: 4, name: '干净整洁' },
    { id: 5, name: '女性友好' },
  ];

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
    const newTags = formData.houseTag.includes(tag)
      ? formData.houseTag.filter(t => t !== tag)
      : [...formData.houseTag, tag];
    setFormData({ ...formData, houseTag: newTags });
  };

  const handleGenderSelect = gender => {
    setFormData({ ...formData, tenantGender: gender });
  };

  const handleTenantCountSelect = count => {
    setFormData({ ...formData, tenantCount: count });
  };

  const handleOtherReqSelect = req => {
    const newReqs = formData.otherRequirements.includes(req)
      ? formData.otherRequirements.filter(r => r !== req)
      : [...formData.otherRequirements, req];
    setFormData({ ...formData, otherRequirements: newReqs });
  };

  const handleImageUpload = () => {
    Taro.chooseImage({
      count: 6 - formData.houseImages.length,
      success: res => {
        setFormData({
          ...formData,
          houseImages: [...formData.houseImages, ...res.tempFilePaths],
        });
      },
    });
  };

  const handleCountryChange = e => {
    const selectedCountry = countries[e.detail.value];
    setFormData({
      ...formData,
      country: selectedCountry,
      city: '选择城市', // 重置城市
    });
  };

  const handleCityChange = e => {
    const selectedCity = cities[formData.country][e.detail.value];
    setFormData({
      ...formData,
      city: selectedCity,
    });
  };

  return (
    <View className='house-publish'>
      {isShowTagPop && (
        <Popup
          className={'tag-pop'}
          content={
            <Input
              className='input'
              placeholder='请输入房源标签'
              placeholderClass='placeholder'
              value={curTag}
              onInput={e => {
                setCurTag(e.detail.value);
              }}
            />
          }
          title='请输入个性化房源标签'
          onClickClose={() => {
            setIsShowTagPop(false);
          }}
          onClickConfirm={e => {
            setIsShowTagPop(false);
            handleTagSelect(curTag);
            const newTags = [...customTags, curTag];
            setCustomTags(newTags);
          }}
        />
      )}
      {isShowReqPop && (
        <Popup
          className={'req-pop'}
          content={
            <Input
              className='input'
              placeholder='请输入其他要求'
              placeholderClass='placeholder'
              value={curReq}
              onInput={e => {
                setCurReq(e.detail.value);
              }}
            />
          }
          title='请输入其他要求'
          onClickClose={() => {
            setIsShowReqPop(false);
          }}
          onClickConfirm={e => {
            setIsShowReqPop(false);
            handleOtherReqSelect(curReq);
            const newReqs = [...customReqs, curReq];
            setCustomReqs(newReqs);
          }}
        />
      )}
      <View className='section'>
        <View className='section-title'>
          <View className='section-title-icon' />
          <Text>房源基本信息</Text>
        </View>

        <View className='input-item'>
          <Text className='label'>房源名称</Text>
          <Input
            className='input'
            placeholder='请输入房源名称'
            placeholderClass='placeholder'
            value={formData.houseName}
            onInput={e =>
              setFormData({ ...formData, houseName: e.detail.value })
            }
          />
        </View>

        <View className='input-item'>
          <Text className='label with-margin'>房源标签*</Text>
          <View className='tags'>
            {tags.map(tag => (
              <Text
                key={tag.id}
                className={`tag ${formData.houseTag.includes(tag.name) ? 'active' : ''}`}
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
                setIsShowTagPop(true);
              }}
            >
              +
            </Text>
          </View>
        </View>

        <View className='input-item'>
          <Text className='label'>房源描述*</Text>
          <Input
            className='input'
            placeholder='请简短对此房源进行描述'
            placeholderClass='placeholder'
            value={formData.houseDesc}
            onInput={e =>
              setFormData({ ...formData, houseDesc: e.detail.value })
            }
          />
        </View>

        <View className='input-item'>
          <Text className='label'>所在地区*</Text>
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
            placeholder='请填写房源所在的地址：如门号、道路、区域、邮编'
            placeholderClass='placeholder'
            value={formData.detailAddress}
            onInput={e =>
              setFormData({ ...formData, detailAddress: e.detail.value })
            }
          />
        </View>

        <View className='input-item'>
          <Text className='label'>房源价格</Text>
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
            <Text className='unit'>/晚</Text>
          </View>
        </View>

        <View className='input-item'>
          <>
            <Text className='label with-margin'>租客要求*</Text>
            <View className='gender-options'>
              <Text className='label'>性别</Text>
              <Text
                className={`option ${formData.tenantGender === '男' ? 'active' : ''}`}
                onClick={() => handleGenderSelect('男')}
              >
                男
              </Text>
              <Text
                className={`option ${formData.tenantGender === '女' ? 'active' : ''}`}
                onClick={() => handleGenderSelect('女')}
              >
                女
              </Text>
              <Text
                className={`option ${formData.tenantGender === '其他' ? 'active' : ''}`}
                onClick={() => handleGenderSelect('其他')}
              >
                其他
              </Text>
              <Text
                className={`option ${formData.tenantGender === '不限制性别' ? 'active' : ''}`}
                onClick={() => handleGenderSelect('不限制性别')}
              >
                不限制性别
              </Text>
            </View>
          </>

          <View className='count-options'>
            <Text className='label '>人数</Text>
            {tenantCounts.map(count => (
              <Text
                key={count.id}
                className={`option ${formData.tenantCount === count.name ? 'active' : ''}`}
                onClick={() => handleTenantCountSelect(count.name)}
              >
                {count.name}
              </Text>
            ))}
          </View>

          <View className='other-options'>
            <Text className='label'>其他</Text>
            {otherReqs.map(req => (
              <Text
                key={req.id}
                className={`option ${formData.otherRequirements.includes(req.name) ? 'active' : ''}`}
                onClick={() => handleOtherReqSelect(req.name)}
              >
                {req.name}
              </Text>
            ))}
            {customReqs.map((req, index) => (
              <Text
                key={otherReqs.length + index}
                className={`option ${formData.otherRequirements.includes(req) ? 'active' : ''}`}
                onClick={() => handleOtherReqSelect(req)}
              >
                {req}
              </Text>
            ))}
            <Text
              className='option'
              onClick={() => {
                setIsShowReqPop(true);
              }}
            >
              +
            </Text>
          </View>
        </View>
        <View className='input-item'>
          <View className='label label-flex with-margin'>
            <Text>房源照片*</Text>
            <Text className='image-count'>
              {formData.houseImages.length}/6张
            </Text>
          </View>
          <View className='image-upload'>
            {formData.houseImages.map((image, index) => (
              <View key={index} className='image-item'>
                <Image src={image} mode='aspectFill' />
              </View>
            ))}
            {formData.houseImages.length < 6 && (
              <View className='upload-button' onClick={handleImageUpload}>
                <Text className='plus'>+</Text>
              </View>
            )}
          </View>
        </View>
        <View className='input-item'>
          <View className='label'>
            <Text>可出租时间*</Text>
            <View className='multi-days'>
              {multiDays.map((day, index) => (
                <View key={index} className='multi-day active'>
                  {day[0]} - {day[1]}
                </View>
              ))}
            </View>
          </View>
          <View className='date-select '>
            <AtCalendar
              isMultiSelect
              multiSelect={multiDays}
              selectedDates={multiDays}
              selectedDate={multiDays}
              currentDate={{ start: startDate, end: endDate }}
              // validRange={{ start: today }} // 有效日期范围
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
                  setMultiDays([...multiDays, [startDate, selectedDate]]);
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
          <Text>你的故事</Text>
        </View>
        <View className='input-item'>
          <Text className='label'>
            为什么成为了Eurostray的房东？最想和房客一起做的事？*
          </Text>
          <Input
            className='input'
            placeholder='请简单分享你的故事'
            placeholderClass='placeholder'
            value={formData.houseName}
            onInput={e =>
              setFormData({ ...formData, houseName: e.detail.value })
            }
          />
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
            placeholder='请输入你的微信号（房客不可见）'
            placeholderClass='placeholder'
            value={formData.houseName}
            onInput={e =>
              setFormData({ ...formData, houseName: e.detail.value })
            }
          />
        </View>
        <View className='input-item'>
          <View className='label label-flex with-margin'>
            <Text>微信收款二维码*</Text>
            <Text className='image-count'>0/1张</Text>
          </View>
          <View className='image-upload'>
            {formData.houseImages.map((image, index) => (
              <View key={index} className='image-item'>
                <Image src={image} mode='aspectFill' />
              </View>
            ))}
            {formData.houseImages.length < 6 && (
              <View className='upload-button' onClick={handleImageUpload}>
                <Text className='plus'>+</Text>
              </View>
            )}
          </View>
          <View className='qrcode-tips'>
            注意：此二维码将会用于后期收款，请上传正确二维码
          </View>
        </View>
      </View>
      <View className='submit-post-house'>上传房源</View>
    </View>
  );
};

export default HousePublish;
