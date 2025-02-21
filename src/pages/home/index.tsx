import { View, Text, Image, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import GlobalStore from '@store/GlobalStore';
import './index.scss';
import HomeSearch from '../home-search';
import Orders from '../orders';
import Messages from '../messages';
import User from '../user';
import '../../app.scss';
const Index = () => {
  const [activeTab, setActiveTab] = useState<
    'search' | 'orders' | 'messages' | 'user'
  >('search');

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  const handleClickAddBtn = () => {
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
    } else {
      // setIsShowPost(true);
    }
  };
  const bottomBar = [
    { img: '', value: 'search' },
    { img: '', value: 'orders' },
    { img: '', value: 'messages' },
    { img: '', value: 'user' },
  ];

  return (
    <>
      <View className='homepage'>
        {activeTab == 'search' && <HomeSearch />}
        {activeTab == 'orders' && <Orders />}
        {activeTab == 'messages' && <Messages />}
        {activeTab == 'user' && <User />}
        <View className='homepage-bottom-bar fix-iphonex-button'>
          {bottomBar.map(item => {
            return (
              <View
                className='button'
                onClick={() => {
                  //@ts-ignore
                  setActiveTab(item.value);
                }}
              ></View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default observer(Index);
