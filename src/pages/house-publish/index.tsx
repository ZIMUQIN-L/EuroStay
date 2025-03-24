import { View, Text, Input, Image, Picker, Textarea } from '@tarojs/components';
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
import '../../components/Popup/index.scss';
import Popup from '../../components/Popup';
import GlobalStore from '@store/GlobalStore';
import { combineAddress, parseAddress } from '@utils/addressUtil';

enum Gender {
  Female = 0,
  Male = 1,
  NoLimit = 2,
  Default = 999,
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
  price: string;
  tenantGender: number;
  tenantCount: number;
  otherRequirements: string[];
  houseImages: string[];
  paymentImages: string[];
  story: string;
  wechat: string;
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
    price: '',
    tenantGender: Gender.Default,
    tenantCount: 0,
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
  const [pid, setPid] = useState<number | null>(null);

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

  const fetchPropertyBase = async (propertyId: number) => {
    try {
      const response = await Taro.request({
        url: `https://api.eurostay.co/app/property/getPropertyBase`,
        method: 'POST',
        header: {
          token: GlobalStore.userInfo.token,
        },
        data: { id: propertyId }
      });

      if (response.statusCode === 200 && response.data.code === 0) {
        const detail = response.data.result;
        
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

        // 解析地址
        const addressComponents = parseAddress(detail.location);
        console.log(addressComponents);
        
        setFormData({
          ...formData,
          houseName: detail.title,
          houseDesc: detail.description,
          houseTag: detail.tags,
          country: { id: 0, cname: addressComponents.country, name: '' },
          city: { id: 0, cname: addressComponents.city, name: '' },
          price: String(detail.price),
          tenantGender: detail.gender,
          tenantCount: detail.capacity,
          otherRequirements: detail.requirements,
          houseImages: detail.images,
          story: detail.whyHost,
          wechat: detail.wxId,
          paymentImages: detail.qrCode ? [detail.qrCode] : [],
          detailAddress: addressComponents.detail, // 设置详细地址
        });

        

        setMultiDays(availableDates);
      }
    } catch (error) {
      Taro.showToast({
        title: '获取房源信息失败',
        icon: 'none',
        duration: 2000,
      });
    }
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

  const handleTagSelect = (tag: string) => {
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

  const handleOtherReqSelect = (req: string) => {
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

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.houseName.trim()) {
      errors.push('请填写房源名称');
    }

    if (formData.houseTag.length === 0) {
      errors.push('请至少选择一个房源标签');
    }

    if (!formData.houseDesc.trim()) {
      errors.push('请填写房源描述');
    }

    if (formData.country.id === 0 || formData.city.id === 0) {
      errors.push('请选择房源所在地区');
    }

    if (!formData.detailAddress.trim()) {
      errors.push('请填写详细地址');
    }

    if (!formData.price || Number(formData.price) <= 0) {
      errors.push('请填写有效的房源价格');
    }

    if (formData.tenantGender === Gender.Default) {
      errors.push('请选择租客性别要求');
    }

    if (formData.tenantCount === 0) {
      errors.push('请选择租客人数要求');
    }

    if (formData.houseImages.length === 0) {
      errors.push('请至少上传一张房源照片');
    }

    if (multiDays.length === 0) {
      errors.push('请选择可出租时间');
    }

    if (!formData.story.trim()) {
      errors.push('请填写你的故事');
    }

    if (!formData.wechat.trim()) {
      errors.push('请填写微信号');
    }

    if (formData.paymentImages.length === 0) {
      errors.push('请上传微信收款二维码');
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
      const url = pid 
        ? 'https://api.eurostay.co/app/property/modify'
        : 'https://api.eurostay.co/app/property/upload';

      const requestData = {
        ...(pid && { pid }),
        title: formData.houseName,
        description: formData.houseDesc,
        location: fullAddress,
        searchableLocation: formData.city.id,
        price: Number(formData.price),
        images: formData.houseImages,
        tags: formData.houseTag,
        gender: formData.tenantGender,
        capacity: formData.tenantCount,
        whyHost: formData.story,
        wxId: formData.wechat,
        qrCode: formData.paymentImages?.[0],
        requirements: formData.otherRequirements,
        availableDate: multiDays.flatMap(pair => pair).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()),
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
          title: pid ? '修改成功！' : '你已成功上传房源！房源正在等待审核，审核通过后将公众可见。',
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
          <Text className='label'>房源名称*</Text>
          <Input
            className='input'
            placeholder='请输入房源名称（14个字以内哦）'
            placeholderClass='placeholder'
            value={formData.houseName}
            maxlength={14}
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
          <Textarea
            className='textarea'
            placeholder='请简短对此房源进行描述'
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
            placeholder='请填写房源所在的地址：如门号、道路、区域、邮编，该信息会被展现给所有ES社群的uu哦~'
            placeholderClass='placeholder'
            value={formData.detailAddress}
            onInput={e =>
              setFormData({ ...formData, detailAddress: e.detail.value })
            }
            autoHeight
          />
        </View>

        <View className='input-item'>
          <Text className='label'>房源价格*</Text>
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
                <View 
                  className='delete-icon' 
                  onClick={(e) => {
                    e.stopPropagation();
                    const newImages = formData.houseImages.filter((_, i) => i !== index);
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
            <Text>可出租时间*</Text>
            <View className='multi-days'>
              {multiDays.map((day, index) => (
                <View
                  key={index}
                  className='multi-day active'
                >
                  <Text>{day[0]} - {day[1]}</Text>
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
          <Text>你的故事</Text>
        </View>
        <View className='input-item'>
          <Text className='label'>
            为什么成为了Eurostray的房东？最想和房客一起做的事？*
          </Text>
          <Textarea
            className='textarea'
            placeholder='请简单分享你的故事'
            placeholderClass='placeholder'
            value={formData.story}
            onInput={e => setFormData({ ...formData, story: e.detail.value })}
            autoHeight
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
        {pid ? '保存修改' : '上传房源'}
      </View>
    </View>
  );
};

export default HousePublish;
