import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';
import AwaitFeedback from './await-feedback';

/**
 * @description 我的求宿页面，尽量共用一些组件，减少重复代码
 */
const Index = () => {
  const router = Taro.useRouter();
  const [currentTab, setCurrentTab] = useState('all');

  const renderContent = () => {
    // TODO: 根据customcard和数据创建对应的组建
    switch (currentTab) {
      case 'all':
        // TODO：可以以待回复、已回复、待入住、待点评为单位，按顺序分别在全部板块展示
        return (
          <>
            <AwaitFeedback />
            <AwaitFeedback />
          </>
        );
      case 'awaitFeedback':
        return <View>待回复</View>;
      case 'hasFeedback':
        return <View>已回复</View>;
      case 'awaitStay':
        return <View>待入住</View>;
      case 'awaitComment':
        return <View>待点评</View>;
      default:
        return (
          <>
            <AwaitFeedback />
            <AwaitFeedback />
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
          <Text className={`text ${isActive('all')}`}>全部</Text>
        </View>
        <View
          className={isActive('awaitFeedback')}
          onClick={() => setCurrentTab('awaitFeedback')}
        >
          <Text className={`text ${isActive('awaitFeedback')}`}>待回复</Text>
        </View>
        <View
          className={isActive('hasFeedback')}
          onClick={() => setCurrentTab('hasFeedback')}
        >
          <Text className={`text ${isActive('hasFeedback')}`}>已回复</Text>
        </View>
        <View
          className={isActive('awaitStay')}
          onClick={() => setCurrentTab('awaitStay')}
        >
          <Text className={`text ${isActive('awaitStay')}`}>待入住</Text>
        </View>
        <View
          className={isActive('awaitComment')}
          onClick={() => setCurrentTab('awaitComment')}
        >
          <Text className={`text ${isActive('awaitComment')}`}>待点评</Text>
        </View>
      </View>
      <View className='content'>{renderContent()}</View>
    </View>
  );
};

export default observer(Index);
