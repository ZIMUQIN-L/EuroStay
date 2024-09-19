import { View, Text, Textarea, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import ImagesUpload from './images-upload';
import { useState, useEffect } from 'react';
import { addCard, useRouter } from '@tarojs/taro';
import './index.scss';
import Taro from '@tarojs/taro';
import { UserItemProps, ActivityInfoItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import TagAdd from './tag-add';
import InfoSelection from './info-selection';
import {
  activityInfoPost,
  activityDetailSearch,
} from '@common/database/activityInfo/activityInfo';

const Index = () => {
  const router = useRouter();
  const activityId = router?.params?.id;
  const [userInfo, setUserInfo] = useState<UserItemProps>(GlobalStore.userInfo);
  const [clickable, setClickable] = useState(false);

  // 控制var
  const [isTagEdit, setIsTagEdit] = useState(false);

  const handleCloseAllWindows = () => {
    setIsTagEdit(false);
  };

  const handleOpenTagEdit = () => {
    setIsTagEdit(true);
  };

  // 填写的描述等
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityHello, setActivityHello] = useState('');

  // 活动的tag
  const [activityTags, setActivityTags] = useState<string[]>([]);

  // 活动照片
  const [images, setImages] = useState<string[]>([]);

  // infos
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState(0);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const userInfoList: UserItemProps = GlobalStore.userInfo;
    setUserInfo(userInfoList);
    console.log('Activity ID:', activityId);
    // if id != none then search info @PJ
    if (activityId != 'none') {
      activityDetailSearch(activityId).then(
        (activityDetail: ActivityInfoItemProps) => {
          setActivityTitle(activityDetail.title);
          setImages(activityDetail.images);
          setActivityDescription(activityDetail.description);
          setActivityHello(activityDetail.helloMessage);
          setActivityTags(activityDetail.tags);
          setCapacity(activityDetail.capacity);
          setStartTime(activityDetail.startTime);
          setEndTime(activityDetail.endTime);
          setContact(activityDetail.contact);
          setPrice(activityDetail.price);
          setPoint(activityDetail.point);
          setLocation(activityDetail.location);
        },
      );
    }
  }, []);

  // 处理照片上传的逻辑
  const handleUploadImage = uploadedImagePath => {
    setImages([...images, uploadedImagePath]);
  };

  // 删除image
  const handleDeleteImage = deletedImagePath => {
    const updatedImages = images.filter(image => image !== deletedImagePath);
    setImages(updatedImages);
  };

  // 活动描述和标题
  const handleUserEditTitle = e => {
    setActivityTitle(e.detail.value);
  };

  const handleUserEditHello = e => {
    setActivityHello(e.detail.value);
  };

  const handleUserEditDescription = e => {
    setActivityDescription(e.detail.value);
  };

  // logic for adding tags
  const handleAddTag = newTag => {
    activityTags.push(newTag);
  };

  const handleDeleteTag = deletedTag => {
    const updatedTags = activityTags.filter(tag => tag != deletedTag);
    setActivityTags(updatedTags);
  };

  // logic for act info
  const handleActivityInfoEdit = (
    location,
    startTime,
    endTime,
    capacity,
    contact,
    price,
    point,
  ) => {
    setLocation(location);
    setStartTime(startTime);
    setEndTime(endTime);
    setCapacity(capacity);
    setContact(contact);
    setPoint(point);
    setPrice(price);
  };

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  const handleButtonClickable = () => {
    if (
      images.length != 0 &&
      activityTags.length != 0 &&
      activityTitle != '' &&
      activityDescription != '' &&
      activityHello != '' &&
      startTime != '' &&
      endTime != '' &&
      capacity != 0 &&
      location != '' &&
      contact != ''
    ) {
      setClickable(true);
    } else {
      setClickable(false);
    }
  };

  const handleClickPostSubmit = () => {
    if (images.length == 0) {
      Taro.showToast({
        title: '请上传活动图片',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (activityTitle == '') {
      Taro.showToast({
        title: '请填写活动标题',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (activityDescription == '') {
      Taro.showToast({
        title: '请填写活动内容',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (activityTags.length == 0) {
      Taro.showToast({
        title: '请填写活动tag',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (location == '') {
      Taro.showToast({
        title: '请填写活动地址',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (startTime == '') {
      Taro.showToast({
        title: '请填写开始时间',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (endTime == '') {
      Taro.showToast({
        title: '请填写结束时间',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (new Date(endTime) < new Date(startTime)) {
      Taro.showToast({
        title: '结束时间不能早于开始时间',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (capacity == 0) {
      Taro.showToast({
        title: '请填写活动人数',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (contact == '') {
      Taro.showToast({
        title: '请填写联系方式',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (activityHello == '') {
      Taro.showToast({
        title: '请填写打招呼信息',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else {
      Taro.showLoading({
        title: '上传中',
        mask: true,
      });
      activityInfoPost(
        activityTitle,
        images,
        activityDescription,
        activityTags,
        location,
        startTime,
        endTime,
        capacity,
        contact,
        price,
        point,
        activityHello,
      ).then(res => {
        Taro.hideLoading();
        Taro.navigateBack({
          delta: 1,
        });
      });
    }
  };

  useEffect(() => {
    handleButtonClickable();
  }, [
    images,
    location,
    startTime,
    endTime,
    activityTags,
    activityTitle,
    activityDescription,
    activityHello,
    capacity,
    contact,
  ]);

  return (
    <View className='activity-post'>
      <ImagesUpload
        images={images}
        onUploadImage={handleUploadImage}
        onDeleteImage={handleDeleteImage}
      />

      <View className='act-des-part'>
        <View className='act-des-container'>
          <Input
            className='act-des-title'
            value={activityTitle}
            type='text'
            placeholder='填写活动标题'
            onInput={handleUserEditTitle}
          ></Input>
          <View
            className='act-des-text-container'
            style={{ minHeight: '70px' }}
          >
            <View className='act-lineDiv' />
            <View className='act-des-text'>
              <Textarea
                value={activityDescription}
                onInput={handleUserEditDescription}
                placeholder='详情介绍：更详细的介绍，如活动亮点、流程、更加相信的相关信息等。'
              />
            </View>
          </View>

          <View className='act-badges'>
            {activityTags.map((tag, index) => (
              <Text
                key={index}
                className='act-badge-item'
                onClick={() => handleDeleteTag(tag)}
              >
                {tag}
              </Text>
            ))}
            <Text className='act-badge-item-add' onClick={handleOpenTagEdit}>
              点击添加个性标签
            </Text>
          </View>
          <View className='act-lineDiv' />
        </View>
      </View>
      {isTagEdit && (
        <TagAdd onClose={handleCloseAllWindows} onTagAdded={handleAddTag} />
      )}
      <InfoSelection
        onActivityInfoEdit={handleActivityInfoEdit}
        activityId={activityId}
      ></InfoSelection>

      <View className='act-des-part'>
        <View className='act-des-container'>
          <View className='act-lineDiv' />
          <View
            className='act-des-text-container'
            style={{ minHeight: '30px' }}
          >
            <View className='act-des-text' style={{ minHeight: '30px' }}>
              <Textarea
                value={activityHello}
                onInput={handleUserEditHello}
                placeholder='和报名成功的朋友打个招呼吧~'
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: 'white' }}>
        <View
          className='act-post-submit-button'
          style={{ backgroundColor: clickable ? '#FFD111' : '#d6d6d6' }}
          onClick={handleClickPostSubmit}
        >
          <Text>发布活动</Text>
        </View>
      </View>
      {isTagEdit && (
        <TagAdd
          onClose={handleCloseAllWindows}
          onTagAdded={handleAddTag}
        ></TagAdd>
      )}
    </View>
  );
};

export default observer(Index);
