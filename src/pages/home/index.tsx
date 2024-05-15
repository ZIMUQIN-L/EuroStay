import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import Houses from './houses';
import { useState } from 'react';
import HouseSource from '@assets/images/house-source.svg';
import HouseSourceSelected from '@assets/images/house-source-selected.svg';
import AccomadationIcon from '@assets/images/accomadation.svg';
import AccomadationIconSelected from '@assets/images/accomadation-selected.svg';
import './index.scss';

const Index = () => {
  const [activeTab, setActiveTab] = useState('houses');

  return (
    <>
      <View className='tab-bar'>
        <View
          className={`tab-item ${activeTab === 'houses' ? 'active' : ''}`}
          onClick={() => setActiveTab('houses')}
          style={{ marginRight: '40px' }}
        >
          {activeTab === 'houses' ? (
            <Image src={HouseSourceSelected} />
          ) : (
            <Image src={HouseSource} />
          )}
          <Text>房源</Text>
        </View>
        <View
          className={`tab-item ${activeTab === 'accomadation' ? 'active' : ''}`}
          onClick={() => setActiveTab('accomadation')}
        >
          {activeTab === 'accomadation' ? (
            <Image src={AccomadationIconSelected} />
          ) : (
            <Image src={AccomadationIcon} />
          )}
          <Text>求宿</Text>
        </View>
      </View>
      <View className='search-area'>
        <Houses />
      </View>
    </>
  );
};

export default observer(Index);
