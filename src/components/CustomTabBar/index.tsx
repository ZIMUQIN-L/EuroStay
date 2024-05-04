import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
// import HomeIcon from '../../assets/images/home.png';
// import RepostIcon from '../../assets/images/repost.png';
// import UserIcon from '../../assets/images/user.png';
// import HomeSelectedIcon from '../../assets/images/home-selected.png';
// import RepostSelectedIcon from '../../assets/images/repost-selected.png';
// import UserSelectedIcon from '../../assets/images/user-selected.png';
import {
  HomeIcon,
  RepostIcon,
  UserIcon,
  HomeSelectedIcon,
  RepostSelectedIcon,
  UserSelectedIcon,
} from '../../utils/cloudIcons';
import { useMemo } from 'react';
import GlobalStore from '@store/GlobalStore';
import { observer } from 'mobx-react-lite';
interface CustomTabBarProps {
  onHomeSelected: () => void;
}
//const CustomTabBar = observer(() => {
const CustomTabBar: React.FC<CustomTabBarProps> = (({ onHomeSelected }) => {
  const currentTab = GlobalStore.currentTab; // 从全局状态管理中获取当前选中的tab

  // 获取设备信息，判断是否为有底部安全区的iPhone
  const isIphone = useMemo(() => {
    const systemInfo = Taro.getSystemInfoSync();
    const { model } = systemInfo;
    const iphoneXModels = [
      'iPhone X',
      'iPhone XR',
      'iPhone XS',
      'iPhone 11',
      'iPhone 12',
      'iPhone 13',
      'iPhone 14',
      'iPhone 15',
    ];
    return iphoneXModels.some(iphoneModel => model.includes(iphoneModel));
  }, []); // 空依赖数组，确保只计算一次

  const tabBarHeight = isIphone ? '60px' : '40px'; // 根据设备调整底部高度

  const handleTabClick = page => {
    if (GlobalStore.currentTab === 'home' && page === 'home') {
      console.log(`reset homepage`);
      onHomeSelected();
  } else {
      // Update the global store with the new tab
      GlobalStore.currentTab = page; // 点击时更新全局状态管理中的当前选中tab
      Taro.switchTab({
        url: `/pages/${page}/index`,
        success: () => {
          console.log(`Switched to ${page}`);
        },
        fail: err => {
          console.error(`Failed to switch tab: ${JSON.stringify(err)}`);
        },
      });
  }
  };

  return (
    <View className='custom-tab-bar' style={{ height: tabBarHeight }}>
      <View className='tab-item' onClick={() => handleTabClick('home')}>
        <View className='tab-icon'>
          <Image src={currentTab === 'home' ? HomeSelectedIcon : HomeIcon} />
        </View>
        <Text className={`tab-text ${currentTab === 'home' ? 'active' : ''}`}>
          主页
        </Text>
      </View>

      <View className='tab-item' onClick={() => handleTabClick('house-post')}>
        <View className='tab-icon'>
          <Image
            src={currentTab === 'house-post' ? RepostSelectedIcon : RepostIcon}
          />
        </View>
        <Text
          className={`tab-text ${currentTab === 'house-post' ? 'active' : ''}`}
        >
          发布
        </Text>
      </View>

      <View className='tab-item' onClick={() => handleTabClick('user-profile')}>
        <View className='tab-icon'>
          <Image
            src={currentTab === 'user-profile' ? UserSelectedIcon : UserIcon}
          />
        </View>
        <Text
          className={`tab-text ${currentTab === 'user-profile' ? 'active' : ''}`}
        >
          我
        </Text>
      </View>
    </View>
  );
});

export default observer(CustomTabBar);
//export default CustomTabBar;
