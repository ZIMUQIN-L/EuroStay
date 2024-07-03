import { View, Text, Textarea, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import ImagesUpload from './images-upload';
import { useState, useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import './index.scss';
import Taro from '@tarojs/taro';
import { UserItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import TagAdd from './tag-add';

const Index = () => {
  const router = useRouter();
  const activityId = router?.params?.id;
  const [userInfo, setUserInfo] = useState<UserItemProps>(GlobalStore.userInfo);

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

  // 活动的tag
  const [activityTags, setActivityTags] = useState<string[]>([]);

  // 活动照片
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const userInfoList: UserItemProps = GlobalStore.userInfo;
    setUserInfo(userInfoList);
    // if id != none then search info @PJ
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

      <View style={{ backgroundColor: 'white' }}>
        <View
          className='act-post-submit-button'
          // onClick={//todo @PJ}
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
