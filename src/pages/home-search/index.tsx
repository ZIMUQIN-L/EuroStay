import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import HomepageCard from '@components/HomepageCard';
import './index.scss';
import HomepageSearch from '@components/HomepageSearch';
import { useState } from 'react';

const HomeSearch = () => {
  const [activeTab, setActiveTab] = useState('房源');

  const mockData = {
    location: '德国柏林',
    userName: '我是一条想飞的鱼',
    userPic: '',
    tags: ['infj', '画画', '摄影'],
  };

  return (
    <>
      <View className='home-search'>
        <View className='tab-container'>
          <View
            className={`tab-item ${activeTab === '友友' ? 'active' : ''}`}
            onClick={() => setActiveTab('友友')}
          >
            友友
          </View>
          <View
            className={`tab-item ${activeTab === '房源' ? 'active' : ''}`}
            onClick={() => setActiveTab('房源')}
          >
            房源
          </View>
          <View
            className={`tab-item ${activeTab === '活动' ? 'active' : ''}`}
            onClick={() => setActiveTab('活动')}
          >
            活动
          </View>
        </View>

        <HomepageSearch />

        <View className='home-user-wrapper'>
          <HomepageCard {...mockData} />
          <HomepageCard {...mockData} />
        </View>
      </View>
    </>
  );
};

export default HomeSearch;
