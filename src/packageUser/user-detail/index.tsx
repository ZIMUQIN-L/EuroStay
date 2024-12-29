import React, { useState, useEffect } from 'react';
import { UserDetailInfoItemProps, UserItemProps } from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import GlobalStore from '@store/GlobalStore';
import Taro from '@tarojs/taro';
import { useRouter } from '@tarojs/taro';
import { userInfoSearch } from '@common/database/user/user';
import UserDetailContent from './user-detail-content';
import UserAccomContent from './user-accom-content';
import UserCommentContent from './user-rating-content';

// const userData: UserDetailInfoItemProps = {
//   _id: 'user-001',
//   _openid: 'openid-001',
//   userOpenid: 'user-openid-001',
//   nickName: '偷心小白菜',
//   userDes: '欢迎和我进行换宿体验～',
//   avatarUrl: 'https://via.placeholder.com/80',
//   userLocation: 'Milan, Italy',
//   guestRating: 4.8,
//   guestRatingNumber: 25,
//   hostRating: 4.7,
//   hostRatingNumber: 18,
//   gender: 'female',
//   tags: ['INTP', '意大利米兰', '米兰理工大学'],
//   verified: {
//     student: true,
//     gov: true,
//   },
//   aboutMe: {
//     interests: 'Swimming, Movies, Skiing',
//     major: 'Computer Science',
//     languages: 'English, Italian, Chinese',
//     skills: 'Coding, Cooking, Photography',
//     funFact: 'I have visited 30 countries and counting!',
//     visitedCountries: 'Italy, France, Germany, USA, China, Japan',
//     serviceProvided:
//       'I can offer a cozy place to stay and a local tour around Milan.',
//   },
// };

const UserDetail: React.FC = () => {
  const router = useRouter();
  const userOpenid = router?.params?.id;

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });


  const [userDetailInfo, setUserDetailInfo] =
    useState<UserDetailInfoItemProps>();
  const [activeTab, setActiveTab] = useState('简介');
  const [currentUser, setCurrentUser] = useState<UserItemProps>(
    GlobalStore.userInfo,
  );

  useEffect(() => {
    userInfoSearch(userOpenid).then((ownerInfo: UserDetailInfoItemProps[]) => {
      setUserDetailInfo(ownerInfo[0]);
    });
  }, []);

  if (!userDetailInfo) {
    return <View>Loading...</View>;
  }


  const toEdit = () => {
    Taro.navigateTo({
      url: `/packageUser/user-edit/index?id=${currentUser._openid}`,
    });
  };

  const onShare = () => {
    console.log('Share button clicked');
    if (navigator.share) {
      navigator
        .share({
          title: 'Check out this profile',
          text: 'Take a look at this amazing profile!',
          url: window.location.href,
        })
        .then(() => console.log('Profile shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  const userReceivedRatings = [
    {
      type: "host",
      evaluation: {
        desMatch: 5,
        locationEval: 4,
        cleanEval: 5,
        serviceEval: 4,
        pricePerformance: 5,
        rating: 4.8,
      },
      toPublic: true,
      sourceUserAvatarUrl: "/path-to-avatar.jpg",
      sourceUserNickname: "John Doe",
      sourceUserLocation: "New York, USA",
      start_date: "2024-12-20",
      end_date: "2024-12-27",
      comment: "Great host, very welcoming!",
    },
  ];
  

  const handlePointsClick = () => {
    if (userDetailInfo._openid == currentUser._openid) {
      Taro.navigateTo({
        url: `/packageUser/my-points/index`,
      });
    }
  };

  return (
  <View className="user-detail-page">
    <View className="profile-container">
      <View className="profile-background" />
      <View className="share-button" onClick={onShare}>
        <Text>分享</Text>
      </View>
      <View className="edit-button" onClick={toEdit}>
        <Text>编辑</Text>
      </View>
      <View className="profile-header">
        <Image
          src={userDetailInfo?.avatarUrl || "/default-avatar.png"}
          className="profile-image"
        />
      <View className="info">
        <Text className="profile-name">
          {userDetailInfo?.nickName || "未知用户"}
          <Text className="badge">认证</Text>
          <Text className="last-online">5min前在线</Text>
        </Text>

        {/* Badges Section */}
        <View className="badges">
          <Text className="badge-item">⛺ 超级Host</Text>
          <Text className="badge-item">🏠 换宿x次</Text>
          <Text className="badge-item">🏆 活动x次</Text>
          <Text className="badge-item">💰 打赏x次</Text>
        </View>

        {/* Tags Section */}
        <View className="tags">
          <Text className="tag-item">西班牙Valencia</Text>
          <Text className="tag-item">INTP</Text>
          <Text className="tag-item">🙋‍♀️ 天蝎座</Text>
          <Text className="tag-item">🌍 环球冒险家</Text>
          <Text className="tag-item">📷 摄影爱好者</Text>
          <Text className="tag-item">👩‍🍳 厨神</Text>
        </View>
      </View>
      </View>
      <View className="self-intro">
        <Text className="intro-quote">“Hello，欢迎来瓦伦西亚找我玩，住我家！如果有更长的自我介绍就继续写。。。。”</Text>
      </View>
    </View>

  {/* Tabs */}
  <View className="tabs">
    {["简介", "房源", "评价"].map((tab) => (
      <View
        key={tab}
        className={`tab ${activeTab === tab ? "active" : ""}`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </View>
    ))}
  </View>

  {/* Tab Content */}
  <View className="tab-content">
    {activeTab === "简介" && <UserDetailContent {...userDetailInfo} />}
    {activeTab === "房源" && <UserAccomContent {...userDetailInfo} />}
    {activeTab === "评价" && (
      <UserCommentContent
        userDetailInfo={userDetailInfo}
        userReceivedRatings={userReceivedRatings}
      />
    )}

  </View>
</View>





    // <View>
    //   <View className='profile-container'>
    //     <View className='profile-background' />
    //     <View className='profile-header'>
    //       <Image src={userDetailInfo?.avatarUrl} className='profile-image' />
    //       <View className='info'>
    //         <Text className='profile-name'>
    //           {userDetailInfo?.nickName}
    //           {/* // TODO, @PJ */}
    //           {/* {userDetailInfo.verified && ?}
    //           <Text className='badge'>实名认证</Text> */}
    //           <Text className='badge-points' onClick={handlePointsClick}>
    //             {' '}
    //             积分值{userDetailInfo.point ? userDetailInfo.point : 10} {'>'}
    //           </Text>
    //         </Text>
    //         <View className='badges'>
    //           {userDetailInfo.tags && userDetailInfo.tags.length!=0? (
    //             userDetailInfo.tags.map((tag, index) => (
    //               <Text key={index} className='badge-item'>
    //                 {tag}
    //               </Text>
    //             ))
    //           ) : (
    //             <Text className='badge-item'>暂无个性标签</Text>
    //           )}
    //         </View>
    //       </View>

    //       <View className='additional-info'>
    //         <Text className='description'>
    //           我的简介：{userDetailInfo.userDes}
    //         </Text>
    //         <Text className='description'>
    //           所属地：{userDetailInfo.userLocation}
    //         </Text>
    //         <View className='ratings-container'>
    //           <View className='ratings'>
    //             <View className='rating-item'>
    //               <Text className='rating-title'>房东评分</Text>
    //               <Text className='rating-value'>
    //                 {userDetailInfo && userDetailInfo.hostRating
    //                   ? userDetailInfo.hostRating
    //                   : '暂无评分'}
    //               </Text>
    //             </View>
    //             <View className='rating-item'>
    //               <Text className='rating-title'>房客评分</Text>
    //               <Text className='rating-value'>
    //                 {userDetailInfo && userDetailInfo.guestRating
    //                   ? userDetailInfo.guestRating
    //                   : '暂无评分'}
    //               </Text>
    //             </View>
    //           </View>
    //           {userDetailInfo._openid == currentUser._openid ? (
    //             <View className='edit-button' onClick={toEdit}>
    //               <Text>编辑资料</Text>
    //             </View>
    //           ) : (
    //             <View></View>
    //           )}
    //         </View>
    //       </View>
    //     </View>
    //   </View>

    //   <View className='tabs'>
    //     <View
    //       className={`tab ${activeTab === '概况' ? 'active' : ''}`}
    //       onClick={() => setActiveTab('概况')}
    //     >
    //       概况
    //     </View>
    //     <View
    //       className={`tab ${activeTab === '供宿' ? 'active' : ''}`}
    //       onClick={() => setActiveTab('供宿')}
    //     >
    //       供宿
    //     </View>
    //     <View
    //       className={`tab ${activeTab === '发帖' ? 'active' : ''}`}
    //       onClick={() => setActiveTab('发帖')}
    //     >
    //       发帖
    //     </View>
    //   </View>
    //   {activeTab === '概况' ? (
    //     <UserDetailContent {...userDetailInfo} />
    //   ) : activeTab === '供宿' ? (
    //     <UserAccomContent {...userDetailInfo} />
    //   ) : null}
    // </View>
  );
};

export default UserDetail;
