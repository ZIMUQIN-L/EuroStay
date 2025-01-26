import { observer } from '@store/utils';
import { Text, View, Image } from '@tarojs/components';
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
import GlobalStore from '@store/GlobalStore';
import WIFI from '@assets/images/black-Wifi.svg';
import Refrigerator from '@assets/images/refrigerator.svg';
import Heater from '@assets/images/heater.svg';
import Bathroom from '@assets/images/bathroom.svg';
import Sofa from '@assets/images/sofa.svg';
import WashMachine from '@assets/images/wash-machine.svg';
import AirCondition from '@assets/images/air-condition.svg';
import Single from '@assets/images/single.svg';
import Ensuite from '@assets/images/ensuite.svg';
import Studio from '@assets/images/studio.svg';
import Apartment from '@assets/images/apartment.svg';
import House from '@assets/images/house.svg';
import Other from '@assets/images/other.svg';
import Gender from '@assets/images/gender.svg';
import Capacity from '@assets/images/capacity.svg';

// const PropertyMap: { string: JsxElement } = {
//   wifi: WIFI,
//   refrigenrator: Refrigerator,
//   heater: Heater,
//   bathroom: Bathroom,
//   sofa: Sofa,
//   washMachine: WashMachine,
//   airCondition: AirCondition,
// };
const houseTypeMap = {
  singe: Single,
  ensuite: Ensuite,
  studio: Studio,
  apartment: Apartment,
  house: House,
  other: Other,
};

const propertyMap = [
  { text: 'wifi', value: WIFI },
  { text: '冰箱', value: Refrigerator },
  { text: '暖气', value: Heater },
  { text: '沙发', value: Sofa },
  { text: '洗衣机', value: WashMachine },
  { text: '空调', value: AirCondition },
];
const Index = () => {
  const router = useRouter();
  const houseId = router?.params?.pid;
  const [houseDetail, setHouseDetail] = useState<HouseDetailItemProps | null>(
    null,
  );
  const [reviewList, setReviewList] = useState();

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  useEffect(() => {
    Taro.request({
      url: `https://api.eurostay.co/app/property/detail?pid=${houseId}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        token: GlobalStore.userInfo.token,
      },
    })
      .then(res => {
        if (res.statusCode == 200) {
          console.log('activity.list', res.data.result);
          setHouseDetail(res.data.result);
        }
      })
      .catch(err => {
        console.error('Request failed');
        return 1;
      });

    Taro.request({
      url: 'https://api.eurostay.co/app/property/showReviewList',
      method: 'POST',
      data: {
        myUid: 0,
        page: 0,
        pid: houseId,
      },
      header: {
        'Content-Type': 'application/json',
        token: GlobalStore.userInfo.token,
      },
    })
      .then(res => {
        if (res.statusCode == 200) {
          setReviewList(res.data.result.data);
          console.log('review.list', res.data.result.data);
          // setUserList(res.data.result.data);
        }
      })
      .catch(err => {
        console.error('Request failed');
        return 1;
      });
  }, []);

  // 如果houseDetail不存在，显示Loading...，避免报错
  if (!houseDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className='house-page-detail'>
      <HouseImagesSwiper {...houseDetail} />
      <HouseSummary {...houseDetail}></HouseSummary>
      <TextBlock
        title='入住前须知'
        body={
          <>
            <View className='gender-requirement'>
              <Image src={Gender} className='gender' />
              可以接待房客的性别：{houseDetail.genderRequirement}
            </View>
            <View className='capacity-requirement'>
              <Image src={Capacity} className='capacity' />
              可以接待房客的人数：可入住{houseDetail.capacity}人
            </View>
          </>
        }
      />
      {houseDetail.description ? (
        <TextBlock title='房源描述' body={houseDetail.description} />
      ) : null}
      {houseDetail.precautious ? (
        <TextBlock title='注意事项' body={houseDetail.precautious} />
      ) : null}

      {houseDetail.propertyInterests.length ? (
        <TextBlock
          title='房东想与房客一起做的事'
          body={
            <View className='interets-wrapper'>
              {houseDetail.propertyInterests.map(item => {
                return <View className='property-interest'>{item}</View>;
              })}
            </View>
          }
        />
      ) : null}
      <TextBlock
        title='房源综合信息'
        body={
          <View className='house-details-wrapper'>
            <View className='house-type-title'>房源类型</View>
            <View className='house-type-wrapper'>
              <View className='house-type-item'>
                <Image src={houseTypeMap['house']} className='house-type-pic' />
                house
              </View>
            </View>
            <View className='facilities-title'>房源设施</View>
            <View className='facilities-wrapper'>
              {propertyMap.map(item => {
                return (
                  <View className='facility-item'>
                    <Image src={item.value} className='facility-pic' />
                    {item.text}
                  </View>
                );
              })}
            </View>
          </View>
        }
      />
      <HouseReviewCard {...houseDetail} />
      {/* <TextBlock title='房源亮点与设施' />
      <TextBlock title='房源位置' />
      <TextBlock title='住客评价' /> */}
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
