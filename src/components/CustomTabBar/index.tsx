import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const  CustomTabBar = () => {
    const handleTabClick = (page) => {
        Taro.switchTab({
            url: `/pages/${page}/index`
        });
    };

    return (
        <View className="custom-tab-bar">
            <View className="tab-item" onClick={() => handleTabClick('index')}>
                <View className="tab-icon">

                </View>
                <Text>
                    主页
                </Text>
            </View>
            <View className="tab-item" onClick={() => handleTabClick('index')}>
                <View className="tab-icon">
                    
                </View>
                <Text>
                    发布
                </Text>
            </View>
            <View className="tab-item" onClick={() => handleTabClick('index')}>
                <View className="tab-icon">
                </View>
                <Text>
                    我
                </Text>
            </View>
        </View>
    )
}

export default CustomTabBar;