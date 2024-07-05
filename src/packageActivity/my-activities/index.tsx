import { observer } from 'mobx-react';
import { View, Text } from '@tarojs/components';

import './index.scss';
import { useState } from 'react';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('initiated');

  const isActive = tabName => {
    return currentTab === tabName ? 'active' : '';
  };

  return (
    <View className='tab-bar'>
      <View
        className={isActive('initiated')}
        onClick={() => setCurrentTab('initiated')}
      >
        <Text className={`text ${isActive('initiated')}`}>我发起的</Text>
      </View>
      <View
        className={isActive('registered')}
        onClick={() => setCurrentTab('registered')}
      >
        <Text className={`text ${isActive('registered')}`}>我报名的</Text>
      </View>
      <View
        className={isActive('favorited')}
        onClick={() => setCurrentTab('favorited')}
      >
        <Text className={`text ${isActive('favorited')}`}>我收藏的</Text>
      </View>
    </View>
  );
};

export default observer(Index);
