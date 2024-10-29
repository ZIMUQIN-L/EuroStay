import { observer } from '@store/utils';
import { Text, View } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import { HouseDetailItemProps } from '@utils/interfaces';
import { useEffect, useState } from 'react';
import HouseImagesSwiper from './house-images';
import Taro from '@tarojs/taro';
import HouseTexts from './house-texts';
import './index.scss';
import { houseDetailSearch } from '@common/database/house/house';
import { RoomDetailInfo } from './house-infos';
import HouseContact from './house-contact';
import HouseReviewCard from './house-review-card';
import HouseOwner from './house-owner';
import HouseSummary from './house-summary';
import HostDetail from './host-detail';
import TextBlock from '../../components/TextBlock';

const Index = () => {
  const router = useRouter();
  const houseId = router?.params?.id;
  const [houseDetail, setHouseDetail] = useState<HouseDetailItemProps | null>(
    null,
  );

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  useEffect(() => {
    houseDetailSearch(houseId).then((houseDetail: HouseDetailItemProps) => {
      setHouseDetail(houseDetail);
    });
  }, []);

  // 如果houseDetail不存在，显示Loading...，避免报错
  if (!houseDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className='house-page-detail'>
      <HouseImagesSwiper {...houseDetail} />
      <HouseSummary></HouseSummary>
      <HostDetail />
      <TextBlock
        title='房源描述'
        body='详情介绍：两室一卫一厅、与人合租，地理位置好极了！该房源位于米兰理工Bovisa校区附近，交通便利，离中央火车站20min公交！周围有中超和Lidl～'
      />
      <TextBlock title='房源亮点与设施' />
      <TextBlock title='房源位置' />
      <TextBlock title='住客评价' />
      {/* <HouseTexts {...houseDetail} /> */}
      {/* <RoomDetailInfo
        roomUtility={houseDetail.houseSetting}
        roomSurrounding={houseDetail.houseSurrounding}
        roomPreference={houseDetail.preference}
      />
      <HouseReviewCard {...houseDetail} />
      <HouseOwner {...houseDetail} /> */}
      <HouseContact {...houseDetail} />
    </View>
  );
};

export default observer(Index);
