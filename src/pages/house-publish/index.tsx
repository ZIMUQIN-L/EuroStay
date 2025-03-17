import { View, Text, Input, Image, Picker } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import { AtCalendar } from 'taro-ui';
import {
  calculateDaysBetweenDates,
  formatTimestamp,
  formatToday,
  mergeDateRanges,
  formatDate,
} from '@utils/dateUtil';
import Popup from '../../components/Popup';
import GlobalStore from '@store/GlobalStore';

enum Gender {
  Female = 0,
  Male = 1,
  Other = 3,
  NoLimit = 2,
  Default = 999,
}

const HousePublish = () => {
  const [formData, setFormData] = useState({
    houseName: '',
    houseTag: [],
    houseDesc: '',
    country: { id: 0, cname: '选择国家', name: '' },
    city: { id: 0, cname: '选择城市', name: '' },
    detailAddress: '',
    price: '',
    tenantGender: Gender.Default,
    tenantCount: 999,
    otherRequirements: [],
    houseImages: [],
    paymentImages: [],
    story: '',
    wechat: '',
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
  const [marks, setMarks] = useState<{ value: string }[]>([]);
  const [countries, setCountries] = useState<
    { id: number; cname: string; name: string }[]
  >([]);
  const [cities, setCities] = useState<
    { id: number; cname: string; name: string }[]
  >([]);
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '发布房源',
    });
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
        console.log(response);
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

  const handleUpload = async (type: string) => {
    try {
      const res = await Taro.chooseImage({
        count: 1,
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
            const imageUrl: string = responseData['result'];
            // 根据类型更新不同的字段
            console.log(imageUrl);
            if (type === 'house') {
              setFormData({
                ...formData,
                houseImages: [...formData.houseImages, imageUrl],
              });
            } else {
              setFormData({
                ...formData,
                paymentImages: [...formData.paymentImages, imageUrl],
              });
            }
            return imageUrl;
          },
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

  const handleSubmit = async () => {
    console.log({
      title: formData.houseName,
      description: formData.houseDesc,
      location: formData.detailAddress,
      searchableLocation: formData.city.id,
      price: Number(formData.price),
      images: formData.houseImages,
      tags: formData.houseTag,
      gender: formData.tenantGender,
      capacity: formData.tenantCount,
      whyHost: formData.story,
      wxId: formData.wechat,
      qrCode: formData.paymentImages?.[0],
      availableDates: marks.map(mark => formatDate(new Date(mark.value))),
    });
    await Taro.request({
      url: `https://api.eurostay.co/app/property/upload`,
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        title: formData.houseName,
        description: formData.houseDesc,
        location: formData.detailAddress,
        searchableLocation: formData.city.id,
        price: Number(formData.price),
        images: formData.houseImages,
        tags: formData.houseTag,
        gender: formData.tenantGender,
        capacity: formData.tenantCount,
        whyHost: formData.story,
        wxId: formData.wechat,
        qrCode: formData.paymentImages?.[0],
        availableDates: marks.map(mark => formatDate(new Date(mark.value))),
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
                className={`option ${formData.tenantGender === Gender.Male ? 'active' : ''}`}
                onClick={() => handleGenderSelect(Gender.Male)}
              >
                男
              </Text>
              <Text
                className={`option ${formData.tenantGender === Gender.Female ? 'active' : ''}`}
                onClick={() => handleGenderSelect(Gender.Female)}
              >
                女
              </Text>
              <Text
                className={`option ${formData.tenantGender === Gender.Other ? 'active' : ''}`}
                onClick={() => handleGenderSelect(Gender.Other)}
              >
                其他
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
            {tenantCounts.map(count => (
              <Text
                key={count.id}
                className={`option ${formData.tenantCount === count.id ? 'active' : ''}`}
                onClick={() => handleTenantCountSelect(count.id)}
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
            <Text>可出租时间*</Text>
            <View className='multi-days'>
              {multiDays.map((day, index) => (
                <View
                  key={index}
                  className='multi-day active'
                  onClick={() => {
                    setMultiDays(multiDays.filter(d => d !== day));
                  }}
                >
                  {day[0]} - {day[1]}
                </View>
              ))}
            </View>
          </View>
          <View className='date-select '>
            <AtCalendar
              isMultiSelect
              multiple={true}
              marks={marks}
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
            value={formData.story}
            onInput={e => setFormData({ ...formData, story: e.detail.value })}
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
            value={formData.wechat}
            onInput={e => setFormData({ ...formData, wechat: e.detail.value })}
          />
        </View>
        <View className='input-item'>
          <View className='label label-flex with-margin'>
            <Text>微信收款二维码*</Text>
            <Text className='image-count'>
              {formData.paymentImages.length}/1张
            </Text>
          </View>
          <View className='image-upload'>
            {formData.paymentImages.map((image, index) => (
              <View key={index} className='image-item'>
                <Image src={image} mode='aspectFill' />
              </View>
            ))}
            {formData.paymentImages.length == 0 && (
              <View
                className='upload-button'
                onClick={() => {
                  handleUpload('payment');
                }}
              >
                <Text className='plus'>+</Text>
              </View>
            )}
          </View>
          <View className='qrcode-tips'>
            注意：此二维码将会用于后期收款，请上传正确二维码
          </View>
        </View>
      </View>
      <View className='submit-post-house' onClick={handleSubmit}>
        上传房源
      </View>
    </View>
  );
};

export default HousePublish;
