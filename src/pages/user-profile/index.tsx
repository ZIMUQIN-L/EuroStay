import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import { PointIcon, RightBottomArrow } from '@utils/cloudIcons';
import GlobalStore from '@store/GlobalStore';
import { useState } from 'react';

const menuList = [
  { text: '添加房源', icon: PointIcon, path: '/pages/add-house/index' },
  { text: '发起活动', icon: PointIcon, path: '/pages/start-activity/index' },
  { text: '房源列表', icon: PointIcon, path: '/pages/house-list/index' },
  { text: '活动列表', icon: PointIcon, path: '/pages/activity-list/index' },
];

const settingsList = [
  { text: '个人信息', icon: PointIcon, path: '/pages/personal-info/index' },
  { text: '账户安全', icon: PointIcon, path: '/pages/account-security/index' },
];

const Index = () => {
  const [user] = useState(GlobalStore.userInfo);

  return (
    <View className='user-page'>
      {/* Header */}
      <View className='header'>
        <Text className='header-title'>我的</Text>
        {/* <Image src={ProfileIcon} className='header-icon' /> */}
      </View>

      {/* User Info */}
      <View className='user-info'>
        <Image src={user.avatarUrl} className='avatar' />
        <View className='user-details'>
          <Text className='username'>{user.nickName || '用户名'}</Text>
          <Text className='user-desc'>显示个人资料</Text>
        </View>
        <Image src={RightBottomArrow} className='arrow-icon' />
      </View>

      {/* Travel Coins */}
      <View className='travel-coins'>
        <Text className='coins-label'>旅行币</Text>
        <Text className='coins-value'>800</Text>
        <Image src={RightBottomArrow} className='arrow-icon' />
      </View>

      {/* Hosting Section */}
      <View className='section'>
        <Text className='section-title'>Hosting</Text>
        {menuList.map((item, index) => (
          <View key={index} className='menu-item' onClick={() => Taro.navigateTo({ url: item.path })}>
            <Image src={item.icon} className='menu-icon' />
            <Text className='menu-text'>{item.text}</Text>
            <Image src={RightBottomArrow} className='arrow-icon' />
          </View>
        ))}
      </View>

      {/* Settings Section */}
      <View className='section'>
        <Text className='section-title'>常用设置</Text>
        {settingsList.map((item, index) => (
          <View key={index} className='menu-item' onClick={() => Taro.navigateTo({ url: item.path })}>
            <Image src={item.icon} className='menu-icon' />
            <Text className='menu-text'>{item.text}</Text>
            <Image src={RightBottomArrow} className='arrow-icon' />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Index;





// import { View, Text, Image } from '@tarojs/components';
// import CustomTabBar from '@components/CustomTabBar';
// import { observer } from 'mobx-react';
// import { useEffect, useState } from 'react';
// import './index.scss';
// import GlobalStore from '@store/GlobalStore';
// import { HouseItemProps, UserItemProps } from '@utils/interfaces';
// import UserInfo from './user-info';
// import { userHouseInfoSearch } from '@common/database/user/user';
// import {
//   AwaitingCheckin,
//   AwaitingComment,
//   AwaitingSeeking,
//   AlreadyContact,
//   MyHouseIcon,
//   MyFavoriteIcon,
//   ValidationIcon,
//   AwaitingResponse,
//   SettingIcon,
//   RightBottomArrow,
//   PointIcon,
// } from '@utils/cloudIcons';
// import Taro from '@tarojs/taro';

// const actionList = [
//   {
//     text: '已联系',
//     icon: AlreadyContact,
//     tab: 'contacted',
//   },
//   {
//     text: '待入住',
//     icon: AwaitingCheckin,
//     tab: 'toStay',
//   },
//   {
//     text: '待点评',
//     icon: AwaitingComment,
//     tab: 'toComment',
//   },
//   {
//     text: '求宿中',
//     icon: AwaitingSeeking,
//     tab: 'toSeek',
//   },
// ];

// const offeringList = [
//   {
//     text: '待回复',
//     icon: AwaitingResponse,
//     tab: 'awaitFeedback',
//   },
//   {
//     text: '已回复',
//     icon: AlreadyContact,
//     tab: 'hasFeedback',
//   },
//   {
//     text: '待入住',
//     icon: AwaitingCheckin,
//     tab: 'awaitStay',
//   },
//   {
//     text: '待点评',
//     icon: AwaitingComment,
//     tab: 'awaitComment',
//   },
// ];

// const menuList = [
//   {
//     text: '我的房源',
//     icon: MyHouseIcon,
//     path: '../../packageUser/my-houses/index',
//   },
//   {
//     text: '我的活动',
//     icon: MyFavoriteIcon,
//     path: '../../packageUser/my-activities/index',
//   },
//   {
//     text: '我的积分',
//     icon: PointIcon,
//     path: '../../packageUser/my-points/index',
//   },
//     {
//     text: '旅行币系统',
//     icon: PointIcon,
//     path: '../../packageUser/travel-coins/index',
//   },
//   {
//     text: '探险家系统',
//     icon: PointIcon,
//     path: '../../packageUser/traveler-system/index',
//   },
//   // {
//   //   text: '实名认证',
//   //   icon: ValidationIcon,
//   //   path: '',
//   // },
//   // {
//   //   text: '设置',
//   //   icon: SettingIcon,
//   //   path: '',
//   // },
// ];

// const Index = () => {
//   const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
//   // 用户拥有的房源信息
//   const [houseList, setHouseList] = useState<HouseItemProps[]>([]);

//   // 在user修改信息后不更新，应该是page没有reload，todo
//   useEffect(() => {
//     const demoUser: UserItemProps = GlobalStore.userInfo;
//     setUser(demoUser);
//     userHouseInfoSearch(demoUser._openid).then(
//       (houseData: HouseItemProps[]) => {
//         setHouseList(houseData);
//       },
//     );
//   }, [GlobalStore.userInfo]);

//   Taro.useShareAppMessage(res => {
//     return {
//       title: 'EuroStay欧洲换宿',
//       path: '/pages/login/index',
//     };
//   });

//   function navigateToAccommodation(tab) {
//     Taro.navigateTo({
//       url: `../../packageUser/my-accommodation/index?tab=${tab}`,
//     });
//   }

//   function navigateToOffering(tab) {
//     Taro.navigateTo({
//       url: `../../packageUser/my-offering/index?tab=${tab}`,
//     });
//   }

//   const navigateToMenu = page => {
//     Taro.navigateTo({
//       url: page,
//     });
//   };

//   const handleClickAll = () => {
//     Taro.navigateTo({
//       url: '../../packageUser/my-accommodation/index',
//     });
//   };

//   const handleClickAllOffering = () => {
//     Taro.navigateTo({
//       url: '../../packageUser/my-offering/index',
//     });
//   };

//   // TODO: mofidy the page if user is null
//   if (!user) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View className='user-page'>
//       <UserInfo {...user} />

//       <View className='action'>
//         <View className='action-text'>
//           <Text className='action-text-title'>我的求宿</Text>
//           <View onClick={handleClickAll}>
//             <Text className='action-text-to-see-all'>全部</Text>
//             <Image
//               src={RightBottomArrow}
//               style={{
//                 width: '12px',
//                 height: '12px',
//                 position: 'relative',
//                 top: '1px',
//               }}
//             />
//           </View>
//         </View>
//         <View className='action-list'>
//           {actionList.map((item, index) => (
//             <View
//               key={index}
//               className='action-item'
//               onClick={() => navigateToAccommodation(item.tab)}
//             >
//               <Image
//                 className='action-item-pic'
//                 src={item.icon}
//                 style={{ width: '24px', height: '24px' }}
//               />
//               <Text>{item.text}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       <View className='action'>
//         <View className='action-text'>
//           <Text className='action-text-title'>我的供宿</Text>
//           <View onClick={handleClickAllOffering}>
//             <Text className='action-text-to-see-all'>全部</Text>
//             <Image
//               src={RightBottomArrow}
//               style={{
//                 width: '12px',
//                 height: '12px',
//                 position: 'relative',
//                 top: '1px',
//               }}
//             />
//           </View>
//         </View>
//         <View className='action-list'>
//           {offeringList.map((item, index) => (
//             <View
//               key={index}
//               className='action-item'
//               onClick={() => navigateToOffering(item.tab)}
//             >
//               <Image
//                 className='action-item-pic'
//                 src={item.icon}
//                 style={{ width: '24px', height: '24px' }}
//               />
//               <Text>{item.text}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       <View className='menu'>
//         <View className='menu-title'>常用功能</View>
//         <View className='menu-list'>
//           {menuList.map((item, index) => (
//             <View
//               key={index}
//               className='menu-item'
//               onClick={() => navigateToMenu(item.path)}
//             >
//               <View className='menu-text'>
//                 <Image
//                   src={item.icon}
//                   style={{
//                     width: '18px',
//                     height: '18px',
//                     marginRight: '10px',
//                   }}
//                 />
//                 <Text>{item.text}</Text>
//               </View>
//               <View>
//                 <Image
//                   src={RightBottomArrow}
//                   style={{ width: '12px', height: '12px' }}
//                 />
//               </View>
//             </View>
//           ))}
//         </View>
//       </View>

//       <CustomTabBar />
//     </View>
//   );
// };

// export default observer(Index);
