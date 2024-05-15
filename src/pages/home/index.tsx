import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import Houses from './houses';
import { useState } from 'react';
import HouseSource from '@assets/images/house-source.svg';
import HouseSourceSelected from '@assets/images/house-source-selected.svg';
import AccommodationIcon from '@assets/images/accommodation.svg';
import AccommodationIconSelected from '@assets/images/accommodation-selected.svg';
import './index.scss';
import SeekingAccommodation from './seeking-accomadation';

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
      <View className='search-area'>
        {activeTab === 'houses' ? <Houses /> : <SeekingAccommodation />}
      </View>
    </>
  );
};

export default observer(Index);
