import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";
import HomeIcon from "../../assets/images/home.png";
import RepostIcon from "../../assets/images/repost.png";
import UserIcon from "../../assets/images/user.png";
import HomeSelectedIcon from "../../assets/images/home-selected.png";
import RepostSelectedIcon from "../../assets/images/repost-selected.png";
import UserSelectedIcon from "../../assets/images/user-selected.png";
import { useEffect, useState } from "react";

const  CustomTabBar = () => {
    // 获取设备信息，判断是否为有底部安全区的iPhone
    const [isIphone, setIsIphone] = useState(false);
    useEffect(() => {
        const systemInfo = Taro.getSystemInfoSync();
        const { model } = systemInfo;
        const iphoneXModels = ['iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone 11', 'iPhone 12', 'iPhone 13', 'iPhone 14'];
        const isIphone = iphoneXModels.some((iphoneModel) => model.includes(iphoneModel));

        setIsIphone(isIphone);
    }, []);

    const [selectedTab, setSelectedTab] = useState('index');

    const tabBarHeight = isIphone ? '60px' : '40px';  // 根据设备调整底部高度

    const handleTabClick = (page) => {
        setSelectedTab(page);
        Taro.switchTab({
            url: `/pages/${page}/index`
        });
    };

    return (
        <View className="custom-tab-bar" style={{ height: tabBarHeight }}>
      <View className="tab-item" onClick={() => handleTabClick("index")}>
        <View className="tab-icon">
          <Image src={selectedTab === "index" ? HomeSelectedIcon : HomeIcon} />
        </View>
        <Text className={`tab-text ${selectedTab === "index" ? "active" : ""}`}>
          主页
        </Text>
      </View>

      <View className="tab-item" onClick={() => handleTabClick("repost")}>
        <View className="tab-icon">
          <Image src={selectedTab === "repost" ? RepostSelectedIcon : RepostIcon} />
        </View>
        <Text className={`tab-text ${selectedTab === "repost" ? "active" : ""}`}>
          发布
        </Text>
      </View>

      <View className="tab-item" onClick={() => handleTabClick("user")}>
        <View className="tab-icon">
          <Image src={selectedTab === "user" ? UserSelectedIcon : UserIcon} />
        </View>
        <Text className={`tab-text ${selectedTab === "user" ? "active" : ""}`}>
          我
        </Text>
      </View>
    </View>
    )
}

export default CustomTabBar;