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

interface UserResult {
  aboutMe: string;
  avatar: string;
  backgroundPic: string[];  // Array of strings (e.g., URLs for images)
  birthday: string;
  countryVisited: string[]; // Array of strings (e.g., countries visited)
  gender: number;           // Assuming 0 = unspecified, 1 = male, 2 = female, etc.
  greenTag: string[];       // Array of tags for green (positive) categories
  hobby: string[];          // Array of hobbies
  location: string;
  memorableStory: string;
  occupation: string;
  redTag: string[];         // Array of tags for red (negative) categories
  school: string;
  tagStr: string[];         // Array of tags as strings
  uid: number;              // User ID
  username: string;
  viewOwn: boolean;         // Whether the user is viewing their own profile
  whySwap: string;
  xhsContact: string;       // Contact information (e.g., a social handle)
}


const UserDetail: React.FC = () => {
  const router = useRouter();
  const userOpenid = router?.params?.id;

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  const [userData, setUserData] = useState(null);

  Taro.request({
    url: 'https://api.eurostay.co/app/esuser/showProfile',
    method: 'POST',
    data: {
      uid: 1 // change later
    },
    header: {
      'Content-Type': 'application/json', 
      'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzM3MTUzMDI1LCJleHAiOjE3Mzc3NTc4MjV9.Dpv8FWC6I8npZr91OLJDmc6fd9diyUe-ffYdaVlWW2EeJdHeAgmLWBgQLIG7k9bOsllsqispQGutUaBpQlt7Yg' 
      // change later
    }
  })
    .then((res) => {
      // console.log('Response:', res.data);
      setUserData(res.data.result);
    })
    .catch((err) => {
      console.error('Request failed:', err);
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

  return (
  <View className="user-detail-page">
    <View className="profile-container">
      <View className="profile-background" 
        style={{
          backgroundImage: `url(${userData?.backgroundPic?.[0] || '/default-avatar.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '300px',
          width: '100%', 
          overflow: 'hidden' 
        }}
      />
      <View className="share-button" onClick={onShare}>
        <Text>分享</Text>
      </View>
      <View className="edit-button" onClick={toEdit}>
        <Text>编辑</Text>
      </View>
      <View className="profile-header">
        <Image
          src={userData?.avatar || "/default-avatar.png"}
          className="profile-image"
        />
      <View className="info">
        <Text className="profile-name">
          {userData?.username || "未知用户"}
          {/* <Text className="badge">认证</Text>
          <Text className="last-online">5min前在线</Text> */}
        </Text>

        {/* Badges Section */}
        <View className="badges">
          <View className="gender-icon">
            {userData?.gender === 1 ? (
              <Text className="badge-item">♂️</Text> // Icon for male
            ) : userData?.gender === 2 ? (
              <Text className="badge-item">♀️</Text> // Icon for female
            ) : (
              <Text className="badge-item">⚧️</Text> // Icon for non-binary or other
            )}
          </View>
          <Text className="badge-item">{userData?.location}</Text>
          <Text className="badge-item">{userData?.school}</Text>
          <Text className="badge-item">{userData?.occupation}</Text>
        </View>


        {/* Tags Section */}
        <View className="tags">
          {/* <Text className="tag-item">{userData?.location}</Text>
          <Text className="tag-item">{userData?.school}</Text> */}
        </View>
       <View className="self-intro">
        <Text className="intro-quote">“{userData?.aboutMe}”</Text>
      </View>
      </View>
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
    {activeTab === "简介" && <UserDetailContent {...userData} />}
    {activeTab === "房源" && <UserAccomContent {...userDetailInfo} />}
    {activeTab === "评价" && (
      <UserCommentContent
        userDetailInfo={userDetailInfo}
        userReceivedRatings={userReceivedRatings}
      />
    )}

  </View>
</View>

  );
};

export default UserDetail;
