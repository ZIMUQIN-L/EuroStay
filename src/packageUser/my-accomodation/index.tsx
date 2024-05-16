import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useState } from 'react';
import './index.scss';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('all');

  const renderContent = () => {
    console.log();
  };

  const isActive = tabName => {
    return currentTab === tabName ? 'active' : '';
  };

  return (
    <View>
      <View className='tab-bar'>
        <View className={isActive('all')} onClick={() => setCurrentTab('all')}>
          <Text>全部</Text>
        </View>
        <View
          className={isActive('contacted')}
          onClick={() => setCurrentTab('contacted')}
        >
          <Text>已联系</Text>
        </View>
        <View
          className={isActive('toStay')}
          onClick={() => setCurrentTab('toStay')}
        >
          <Text>待入住</Text>
        </View>
        <View
          className={isActive('toComment')}
          onClick={() => setCurrentTab('toComment')}
        >
          <Text>待点评</Text>
        </View>
        <View
          className={isActive('toSeek')}
          onClick={() => setCurrentTab('toSeek')}
        >
          <Text>求宿中</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(Index);
