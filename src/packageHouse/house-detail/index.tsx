import { observer } from '@store/utils';
import { Text } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import { HouseDetailItemProps } from '@utils/interfaces';
import { useEffect, useState } from 'react';
import HouseImagesSwiper from './house-images';
import HouseTexts from './house-texts';
import './index.scss';
import { houseDetailSearch } from '@common/database/house/house';
import { RoomDetailInfo } from './house-infos';
import HouseContact from './house-contact';
import HouseReviewCard from './house-review-card';

const Index = () => {
  const router = useRouter();
  const houseId = router?.params?.id;
  const [houseDetail, setHouseDetail] = useState<HouseDetailItemProps | null>(
    null,
  );

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
    <>
      <HouseImagesSwiper {...houseDetail} />
      <HouseTexts {...houseDetail} />
      <RoomDetailInfo
        roomUtility={houseDetail.houseSetting}
        roomSurrounding={houseDetail.houseSurrounding}
        roomPreference={houseDetail.preference}
      />
      <HouseReviewCard {...houseDetail} />
      <HouseContact {...houseDetail} />
    </>
  );
};

export default observer(Index);
