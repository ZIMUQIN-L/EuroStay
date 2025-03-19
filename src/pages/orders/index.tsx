import { View, Text, Image, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import TabBar from '@components/TabBar';

const Index = () => {
  const [isShowPostModal, setIsShowPostModal] = useState(false);

  return (
    <View className={`home-orders ${isShowPostModal ? 'modal' : ''}`}>
      <View>22</View>
      <TabBar 
        onWorldSelected={() => {}}
        setIsShowPostModal={setIsShowPostModal}
        isShowPostModal={isShowPostModal}
      />
    </View>
  );
};

export default observer(Index);
