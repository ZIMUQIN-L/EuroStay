import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import Houses from './houses';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import HouseSource from '@assets/images/house-source.svg';
import GlobalStore from '@store/GlobalStore';
import HouseSourceSelected from '@assets/images/house-source-selected.svg';
import AccommodationIcon from '@assets/images/accommodation.svg';
import AccommodationIconSelected from '@assets/images/accommodation-selected.svg';
import './index.scss';
import SeekingAccommodation from './seeking-accomadation';
import {
  PostButton,
  PurpleClose,
  HouseRequest,
  PostActivity,
  PostHouse,
} from '@utils/cloudIcons';

const Index = () => {
  const [activeTab, setActiveTab] = useState('houses');
  const [isShowPost, setIsShowPost] = useState(false);

  const onClickPostSeek = () => {
    Taro.navigateTo({
      url: `../../packageHouse/seek-post/index?id=none`,
    });
  };

  const onClickPostActivity = () => {
    Taro.navigateTo({
      url: `../../packageActivity/activity-post/index?id=none`,
    });
  };

  const onClickPostHouse = () => {
    Taro.navigateTo({
      url: '../../packageHouse/house-post/index',
    });
  };

  const handleClickAddBtn =() => {
    if (GlobalStore.userInfo._id == '') {
        Taro.showModal({
          title: '转至登录页面',
          content: '请登录后发布信息~',
          success: function (res) {
            if (res.confirm) {
              Taro.reLaunch({
                url: `/pages/login/index`,
              });
            }
          },
        });
      }
      else {
        setIsShowPost(true);
      }
  }

  return (
    <>
      <View className='tab-bar'>
        <View
          className={`tab-item ${activeTab === 'houses' ? 'active' : ''}`}
          onClick={() => setActiveTab('houses')}
          style={{ marginRight: '40px' }}
        >
          {activeTab === 'houses' ? (
            <Image
              src={HouseSourceSelected}
              style={{ width: '20px', height: '20px' }}
            />
          ) : (
            <Image
              src={HouseSource}
              style={{ width: '20px', height: '20px' }}
            />
          )}
          <Text>房源</Text>
        </View>
        <View
          className={`tab-item ${activeTab === 'accommodation' ? 'active' : ''}`}
          onClick={() => setActiveTab('accommodation')}
        >
          {activeTab === 'accommodation' ? (
            <Image src={AccommodationIconSelected} />
          ) : (
            <Image src={AccommodationIcon} />
          )}
          <Text>求宿</Text>
        </View>
      </View>
      <View
        className='add-button'
        onClick={() => {
         handleClickAddBtn()
        }}
      >
        <Image src={PostButton}></Image>
      </View>
      <View className='search-area'>
        {activeTab === 'houses' ? <Houses /> : <SeekingAccommodation />}
      </View>
      {/* 蒙层 */}
      {isShowPost && (
        <View
          className='page-post-modal'
          onClick={() => {
            setIsShowPost(false);
          }}
        >
          <Image
            src={PurpleClose}
            className='post-close'
            onClick={() => {
              setIsShowPost(false);
            }}
          />
          <Image
            src={PostActivity}
            className='post-activity'
            onClick={onClickPostActivity}
          />
          <Image
            src={PostHouse}
            className='post-house'
            onClick={onClickPostHouse}
          />
          <Image
            src={HouseRequest}
            className='house-request'
            onClick={onClickPostSeek}
          />
        </View>
      )}
    </>
  );
};

export default observer(Index);
