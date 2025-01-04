import React, { useState, useEffect } from 'react';
import {
  UserDetailInfoItemProps,
  UserRatingInfoItemProps,
} from '@utils/interfaces';
import './index.scss';
import { userReceivedRatingSearch } from '@common/database/ratingInfo/ratingInfo';
import { DefaultHouse } from '@utils/cloudIcons';
import { View, Text, Image } from '@tarojs/components';
import StarIcon from '../icons/star.svg';
import GlobalStore from '@store/GlobalStore';
import { HouseDetailItemProps, UserItemProps } from '@utils/interfaces';
import './index.scss';
import Taro from '@tarojs/taro';
import { userHouseInfoSearch } from '@common/database/user/user';
import HouseItem from '../../../pages/home/house-item';

const UserAccomContent: React.FC<UserDetailInfoItemProps> = userDetailInfo => {
  if (!userDetailInfo) {
    return <View>Loading...</View>;
  }

  const mockHouseList = [
    {
      _id: "house1",
      _openid: "owner1",
      capacity: 2,
      description: "A cozy apartment in downtown Paris with a great view.",
      end_date: "2025-12-31",
      start_date: "2025-12-01",
      houseType: "Apartment",
      images: ["https://example.com/house1.jpg"],
      location: "Paris, France",
      ownerTarget: "Looking for a quiet tenant",
      contact: "owner1@example.com",
      xhsContact: "xhs_owner1",
    },
    {
      _id: "house2",
      _openid: "owner2",
      capacity: 4,
      description: "Spacious house near Tokyo station, great for families.",
      end_date: "2025-11-30",
      start_date: "2025-11-01",
      houseType: "House",
      images: ["https://example.com/house2.jpg"],
      location: "Tokyo, Japan",
      ownerTarget: "Ideal for travelers and students",
      contact: "owner2@example.com",
      xhsContact: "xhs_owner2",
    },
    {
      _id: "house3",
      _openid: "owner3",
      capacity: 1,
      description: "Small studio in New York, close to subway.",
      end_date: "2025-10-15",
      start_date: "2025-09-15",
      houseType: "Studio",
      images: ["https://example.com/house3.jpg"],
      location: "New York, USA",
      ownerTarget: "Looking for a professional tenant",
      contact: "owner3@example.com",
      xhsContact: "xhs_owner3",
    },
    {
      _id: "house4",
      _openid: "owner4",
      capacity: 3,
      description: "Modern condo in downtown Toronto with great amenities.",
      end_date: "2025-09-30",
      start_date: "2025-09-01",
      houseType: "Condo",
      images: ["https://example.com/house4.jpg"],
      location: "Toronto, Canada",
      ownerTarget: "Prefer working professionals",
      contact: "owner4@example.com",
      xhsContact: "xhs_owner4",
    },
    {
      _id: "house5",
      _openid: "owner5",
      capacity: 5,
      description: "Large villa near Barcelona beach, perfect for a group stay.",
      end_date: "2025-08-31",
      start_date: "2025-08-01",
      houseType: "Villa",
      images: ["https://example.com/house5.jpg"],
      location: "Barcelona, Spain",
      ownerTarget: "Vacation rental available",
      contact: "owner5@example.com",
      xhsContact: "xhs_owner5",
    },
  ];

  const [houseList, setHouseList] = useState<HouseDetailItemProps[]>([]);
  useEffect(() => {
    userHouseInfoSearch(userDetailInfo._openid).then(
      (houseData: HouseDetailItemProps[]) => {
        setHouseList(houseData); // Update demoData state with the fetched data
      },
    );
  }, []);

  const handleHouseClick = houseId => {
    Taro.navigateTo({
      url: `/packageHouse/house-detail/index?id=${houseId}`,
    });
  };

  return (
    <View className="content">
      {mockHouseList.map(house => (
        <HouseItem key={house._id} {...house} />
      ))}
    </View>
    // <View className='content'>
    //   <View className='section'>
    //     <Text className='section-title'>'{userDetailInfo.nickName}'的房源test</Text>
    //     <View className='house-grid'>
    //       {houseList.map(house => (
    //         <View
    //           key={house._id}
    //           className='house-card'
    //           onClick={() => handleHouseClick(house._id)}
    //         >
    //           <Image
    //             src={house.images.length > 0 ? house.images[0] : DefaultHouse}
    //             mode='aspectFill'
    //           />
    //           <Text className='house-title'>{house.location}</Text>
    //           <View className='house-info'>
    //             <Text>{house.capacity}人</Text>
    //             <View className='house-likes'>
    //               {/* <Image src={StarIcon} /> */}
    //               {/* <Text>{house.likes}</Text> */}
    //             </View>
    //           </View>
    //         </View>
    //       ))}
    //     </View>
    //   </View>
    // </View>
  );
};

export default UserAccomContent;
