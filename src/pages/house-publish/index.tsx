import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Input, Textarea, Image, Picker } from '@tarojs/components';
import '../../components/Popup/index.scss';
import Popup from '../../components/Popup';
import './index.scss';
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
  country: { id: number; cname: string; name: string };
  city: { id: number; cname: string; name: string };
  detailAddress: string;
  tenantGender: number;
  tenantCount: number;
  propertyImages: {
    commonArea: string[];
    livingRoom: string[];
    toilet: string[];
    bedroom: string[];
  };
  status: number;
  receptionTime: string[];
  detailedReceptionTime: string;
}

const IMAGE_CATEGORIES = [
  { key: 'commonArea' as const, label: '公共区' },
  { key: 'livingRoom' as const, label: '睡觉区' },
  { key: 'toilet'     as const, label: '卫生间' },
  { key: 'bedroom'    as const, label: '更多'   },
];

const PRESET_RECEPTION_TIMES = ['时间灵活', '工作日', '周末', '节假日'];

const HousePublish = () => {
  const [formData, setFormData] = useState<HouseFormData>({
    houseName: '',
    houseTag: [],
    houseDesc: '',
    country: { id: 0, cname: '选择国家', name: '' },
    city: { id: 0, cname: '选择城市', name: '' },
    detailAddress: '',
    tenantGender: Gender.Default,
    tenantCount: 0,
    propertyImages: { commonArea: [], livingRoom: [], toilet: [], bedroom: [] },
    status: PropertyStatus.Available,
    receptionTime: [],
    detailedReceptionTime: '',
  });

  const [isShowTagPop, setIsShowTagPop] = useState(false);
  const [curTag, setCurTag] = useState('');
  const [curTagCategory, setCurTagCategory] = useState('');
  const [countries, setCountries] = useState<{ id: number; cname: string; name: string }[]>([]);
  const [cities, setCities] = useState<{ id: number; cname: string; name: string }[]>([]);
  const [pid, setPid] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowReceptionTimePop, setIsShowReceptionTimePop] = useState(false);
  const [curReceptionTime, setCurReceptionTime] = useState('');
  const [customReceptionTimes, setCustomReceptionTimes] = useState<string[]>([]);

  const [tagCategories, setTagCategories] = useState([
    { name: '房源类型', tags: ['单人公寓', '自购房源', '合租房源'], id: 'propertyType' },
  ]);

  useEffect(() => {
    const params = Taro.getCurrentInstance().router?.params;
    const routerPid = params?.pid;
    Taro.setNavigationBarTitle({ title: routerPid ? '修改房源' : '发布房源' });
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
    } catch {
      Taro.showToast({ title: '获取城市列表失败，请重试', icon: 'none', duration: 2000 });
    }
  };

  const getCountries = async () => {
    try {
      const countriesData = await API.location.countryList();
      setCountries(countriesData);
    } catch {
      Taro.showToast({ title: '获取国家列表失败，请重试', icon: 'none', duration: 2000 });
    }
  };

  const fetchPropertyBase = async (propertyId: number) => {
    try {
      const detail = await API.property.getPropertyBase(propertyId);

      let houseTag: string[] = detail.tags || [];
      if ((!houseTag || houseTag.length === 0) && detail.tagsJson) {
        try {
          const parsed = JSON.parse(detail.tagsJson);
          houseTag = (Object.values(parsed) as string[][]).flat();
        } catch { houseTag = []; }
      }

      const propertyImages = detail.propertyImage
        ? {
            commonArea: detail.propertyImage.commonArea || [],
            livingRoom: detail.propertyImage.livingRoom || [],
            toilet:     detail.propertyImage.toilet     || [],
            bedroom:    detail.propertyImage.bedroom    || [],
          }
        : { commonArea: detail.images || [], livingRoom: [], toilet: [], bedroom: [] };

      setFormData({
        ...formData,
        houseName:            detail.title,
        houseDesc:            detail.description,
        country:              { id: detail.countryId || 0, cname: detail.country || '', name: '' },
        city:                 { id: detail.cityId    || 0, cname: detail.city    || '', name: '' },
        detailAddress:        detail.address || '',
        tenantGender:         detail.gender ?? Gender.Default,
        tenantCount:          detail.capacity,
        propertyImages,
        houseTag,
        status:               detail.status ?? PropertyStatus.Available,
        receptionTime:        detail.receptionTime || [],
        detailedReceptionTime: detail.detailedReceptionTime || '',
      });
    } catch {
      Taro.showToast({ title: '获取房源信息失败，请重试', icon: 'none', duration: 2000 });
    }
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
      setTagCategories(prev => prev.map(category =>
        category.id === curTagCategory
          ? { ...category, tags: [...category.tags, curTag] }
          : category
      ));
      handleTagSelect(curTag);
      setCurTag('');
      setIsShowTagPop(false);
    }
  };

  const handleUpload = async (category: 'commonArea' | 'livingRoom' | 'toilet' | 'bedroom') => {
    const current = formData.propertyImages[category];
    const remaining = 4 - current.length;
    if (remaining <= 0) return;

    try {
      const res = await Taro.chooseImage({
        count: remaining,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
      });

      const uploadedImages = await Promise.all(
        res.tempFilePaths.map(file => API.common.upload(file, { prefix: 'house' }))
      );

      setFormData({
        ...formData,
        propertyImages: { ...formData.propertyImages, [category]: [...current, ...uploadedImages] },
      });
    } catch {
      Taro.showToast({ title: '上传失败', icon: 'none' });
    }
  };

  const handleDeleteImage = (category: 'commonArea' | 'livingRoom' | 'toilet' | 'bedroom', index: number) => {
    const newImages = formData.propertyImages[category].filter((_, i) => i !== index);
    setFormData({ ...formData, propertyImages: { ...formData.propertyImages, [category]: newImages } });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countries[e.detail.value];
    setFormData({ ...formData, country: selectedCountry, city: { id: 0, cname: '选择城市', name: '' } });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: cities[e.detail.value] });
  };

  const handleReceptionTimeSelect = (time: string) => {
    const newTimes = formData.receptionTime.includes(time)
      ? formData.receptionTime.filter(t => t !== time)
      : [...formData.receptionTime, time];
    setFormData({ ...formData, receptionTime: newTimes });
  };

  const handleReceptionTimeConfirm = () => {
    if (curReceptionTime.trim()) {
      handleReceptionTimeSelect(curReceptionTime);
      setCustomReceptionTimes([...customReceptionTimes, curReceptionTime]);
      setCurReceptionTime('');
      setIsShowReceptionTimePop(false);
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!formData.houseName.trim())          errors.push('别忘了房源名称哦~');
    if (!formData.houseDesc.trim())          errors.push('请填写房源描述');
    if (formData.city.id === 0)              errors.push('请选择房源所在地区');
    if (!formData.detailAddress.trim())      errors.push('请填写详细地址');
    if (formData.tenantGender === Gender.Default) errors.push('请选择性别限制');
    if (formData.tenantCount === 0)          errors.push('请选择最多入住人数');
    const totalImages = Object.values(formData.propertyImages).flat().length;
    if (totalImages === 0)                   errors.push('请至少上传一张房源照片');
    return errors;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const errors = validateForm();
    if (errors.length > 0) {
      Taro.showToast({ title: errors[0], icon: 'none', duration: 2000 });
      return;
    }

    try {
      setIsSubmitting(true);

      const tagsJson = {};
      tagCategories.forEach(category => {
        const selectedTags = category.tags.filter(tag => formData.houseTag.includes(tag));
        if (selectedTags.length > 0) tagsJson[category.id] = selectedTags;
      });

      const allImages = [
        ...formData.propertyImages.commonArea,
        ...formData.propertyImages.livingRoom,
        ...formData.propertyImages.toilet,
        ...formData.propertyImages.bedroom,
      ];

      const requestData = {
        title:                formData.houseName,
        tagsJson:             JSON.stringify(tagsJson),
        country:              formData.country.cname,
        countryId:            formData.country.id,
        city:                 formData.city.cname,
        cityId:               formData.city.id,
        address:              formData.detailAddress,
        description:          formData.houseDesc,
        capacity:             formData.tenantCount,
        gender:               formData.tenantGender,
        images:               allImages,
        propertyImage:        formData.propertyImages,
        status:               formData.status,
        receptionTime:        formData.receptionTime,
        detailedReceptionTime: formData.detailedReceptionTime,
      };

      if (pid) {
        await API.property.modifyProperty({ ...requestData, pid });
        Taro.showToast({ title: '修改成功！', icon: 'none', duration: 2000 });
      } else {
        await API.property.uploadProperty(requestData);
        Taro.showToast({ title: '房源上传成功，等待审核后公开~', icon: 'none', duration: 2000 });
      }

      setTimeout(() => Taro.navigateBack(), 2000);
    } catch {
      Taro.showToast({ title: '网络请求失败，请重试', icon: 'none', duration: 2000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className='house-publish'>
      {isShowTagPop && (
        <Popup
          className='tag-pop'
          content={
            <Input
              className='input'
              placeholder='请输入标签名称'
              placeholderClass='placeholder'
              value={curTag}
              onInput={e => setCurTag(e.detail.value)}
            />
          }
          title='添加新标签'
          onClickClose={() => setIsShowTagPop(false)}
          onClickConfirm={handleTagConfirm}
        />
      )}
      {isShowReceptionTimePop && (
        <Popup
          className='reception-time-pop'
          content={
            <Input
              className='input'
              placeholder='请输入接待时间'
              placeholderClass='placeholder'
              value={curReceptionTime}
              onInput={e => setCurReceptionTime(e.detail.value)}
            />
          }
          title='添加自定义接待时间'
          onClickClose={() => setIsShowReceptionTimePop(false)}
          onClickConfirm={handleReceptionTimeConfirm}
        />
      )}

      {/* ── Section 1: 基本信息 ── */}
      <View className='section'>
        <View className='section-title'>
          <View className='section-title-icon' />
          <Text>基本信息</Text>
        </View>

        {/* 1/4 标题 */}
        <View className='input-item'>
          <Text className='label'>1/4 怎么称呼我的家（14字以内）*</Text>
          <Input
            className='input'
            placeholder='取一个有温度的名字吧~（比如尼斯阳光沙滩大别墅）'
            placeholderClass='placeholder'
            value={formData.houseName}
            maxlength={14}
            onInput={e => setFormData({ ...formData, houseName: e.detail.value })}
          />
        </View>

        {/* 2/4 地址 */}
        <View className='input-item'>
          <Text className='label with-margin'>2/4 我家的地址*</Text>
          <View className='address-select'>
            <Picker
              mode='selector'
              range={countries?.map(c => c.cname)}
              onChange={handleCountryChange}
              className='picker'
            >
              <View className='picker-item'>
                <Text className={formData.country.id === 0 ? 'placeholder' : ''}>{formData.country.cname}</Text>
              </View>
            </Picker>
            <Picker
              mode='selector'
              range={cities.map(c => c.cname)}
              onChange={handleCityChange}
              className='picker'
            >
              <View className='picker-item'>
                <Text className={formData.city.id === 0 ? 'placeholder' : ''}>{formData.city.cname}</Text>
              </View>
            </Picker>
          </View>
          <Textarea
            className='textarea'
            placeholder='注意保护隐私，建议只写大概地址，确认交易再给出门牌号哦'
            placeholderClass='placeholder'
            value={formData.detailAddress}
            onInput={e => setFormData({ ...formData, detailAddress: e.detail.value })}
            autoHeight
          />
        </View>

        {/* 3/4 关于我家 */}
        <View className='input-item'>
          <Text className='label with-margin'>3/4 关于我家*</Text>
          <Textarea
            className='textarea'
            placeholder='可以填写你家的基本信息（如周边环境特色、房源特色等）以及你希望的相处公约哦'
            placeholderClass='placeholder'
            value={formData.houseDesc}
            onInput={e => setFormData({ ...formData, houseDesc: e.detail.value })}
            autoHeight
          />
          <Text className='description'>下边可以快速选择一些房屋的基本信息~</Text>

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

          <View className='tag-category'>
            <Text className='category-title'>最多入住</Text>
            <View className='tags'>
              {[{ id: 1, name: '1人' }, { id: 2, name: '2人' }, { id: 3, name: '3人+' }].map(item => (
                <Text
                  key={item.id}
                  className={`tag ${formData.tenantCount === item.id ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, tenantCount: item.id })}
                >
                  {item.name}
                </Text>
              ))}
            </View>
          </View>

          <View className='tag-category'>
            <Text className='category-title'>性别限制</Text>
            <View className='tags'>
              <Text className={`tag ${formData.tenantGender === Gender.Female ? 'active' : ''}`} onClick={() => setFormData({ ...formData, tenantGender: Gender.Female })}>女生专属</Text>
              <Text className={`tag ${formData.tenantGender === Gender.Male ? 'active' : ''}`} onClick={() => setFormData({ ...formData, tenantGender: Gender.Male })}>男生专属</Text>
              <Text className={`tag ${formData.tenantGender === Gender.NoLimit ? 'active' : ''}`} onClick={() => setFormData({ ...formData, tenantGender: Gender.NoLimit })}>不限</Text>
            </View>
          </View>
        </View>

        {/* 4/4 照片 */}
        <View className='input-item'>
          <Text className='label with-margin'>4/4 我家美丽的照片*（每类最多4张）</Text>
          <Text className='description'>请分类上传你家的照片，客观真实展示你的房源吧！</Text>
          {IMAGE_CATEGORIES.map(({ key, label }) => (
            <View key={key} className='tag-category'>
              <Text className='category-title'>{label}（{formData.propertyImages[key].length}/4）</Text>
              <View className='image-upload'>
                {formData.propertyImages[key].map((image, index) => (
                  <View key={index} className='image-item'>
                    <Image src={image} mode='aspectFill' />
                    <View
                      className='delete-icon'
                      onClick={e => { e.stopPropagation(); handleDeleteImage(key, index); }}
                    >×</View>
                  </View>
                ))}
                {formData.propertyImages[key].length < 4 && (
                  <View className='upload-button' onClick={() => handleUpload(key)}>
                    <Text className='plus'>+</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* ── Section 2: 可接待时间 ── */}
      <View className='section'>
        <View className='section-title'>
          <View className='section-title-icon' />
          <Text>可接待时间</Text>
        </View>

        <View className='input-item'>
          <View className='tag-category'>
            <Text className='category-title'>房源状态*</Text>
            <View className='tags'>
              <Text
                className={`tag ${formData.status === PropertyStatus.Available ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, status: PropertyStatus.Available })}
              >正在接待</Text>
              <Text
                className={`tag ${formData.status === PropertyStatus.Unavailable ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, status: PropertyStatus.Unavailable })}
              >未开放接待</Text>
            </View>
          </View>

          <View className='tag-category'>
            <Text className='category-title'>接待时间</Text>
            <View className='tags'>
              {PRESET_RECEPTION_TIMES.map(time => (
                <Text
                  key={time}
                  className={`tag ${formData.receptionTime.includes(time) ? 'active' : ''}`}
                  onClick={() => handleReceptionTimeSelect(time)}
                >
                  {time}
                </Text>
              ))}
              {customReceptionTimes.map((time, index) => (
                <Text
                  key={`custom-${index}`}
                  className={`tag ${formData.receptionTime.includes(time) ? 'active' : ''}`}
                  onClick={() => handleReceptionTimeSelect(time)}
                >
                  {time}
                </Text>
              ))}
              <Text className='option' onClick={() => setIsShowReceptionTimePop(true)}>+</Text>
            </View>
          </View>

          <View style={{ marginTop: '20px' }}>
            <Text className='label'>具体换宿时间（最多16字）</Text>
            <Input
              className='input'
              placeholder='如：圣诞节、暑假期间'
              placeholderClass='placeholder'
              value={formData.detailedReceptionTime}
              maxlength={16}
              onInput={e => setFormData({ ...formData, detailedReceptionTime: e.detail.value })}
            />
          </View>
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
