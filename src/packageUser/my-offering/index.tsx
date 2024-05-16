import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';

/**
 * @description 我的求宿页面，尽量共用一些组件，减少重复代码
 */
const Index = () => {
  const router = Taro.useRouter();
  const [currentTab, setCurrentTab] = useState('all');

  const renderContent = () => {
    console.log();
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
          className={isActive('awaitFeedback')}
          onClick={() => setCurrentTab('awaitFeedback')}
        >
          <Text>待回复</Text>
        </View>
        <View
          className={isActive('hasFeedback')}
          onClick={() => setCurrentTab('hasFeedback')}
        >
          <Text>已回复</Text>
        </View>
        <View
          className={isActive('awaitStay')}
          onClick={() => setCurrentTab('awaitStay')}
        >
          <Text>待入住</Text>
        </View>
        <View
          className={isActive('awaitComment')}
          onClick={() => setCurrentTab('awaitComment')}
        >
          <Text>待点评</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(Index);
