import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';
import ContactedCard from './contacted';

/**
 * @description 我的求宿页面，尽量共用一些组件，减少重复代码
 */
const Index = () => {
  const router = Taro.useRouter();
  const [currentTab, setCurrentTab] = useState('all');

  const renderContent = () => {
    switch (currentTab) {
      case 'all':
        return (
          <>
            <ContactedCard />
            <ContactedCard />
          </>
        );
      case 'contacted':
        return <View>已联系</View>;
      case 'toStay':
        return <View>待入住</View>;
      case 'toComment':
        return <View>待点评</View>;
      case 'toSeek':
        return <View>求宿中</View>;
      default:
        return (
          <>
            <ContactedCard />
            <ContactedCard />
          </>
        );
    }
  };

  useEffect(() => {
    if (router.params.tab) {
      setCurrentTab(router.params.tab);
    }
  }, [router.params]);

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
      <View className='content'>
        {renderContent()}
        </View>
    </View>
  );
};

export default observer(Index);
