import { View, Text, Button } from "@tarojs/components";
import { useStore, observer } from "@store/utils";
import CustomTabBar from "@components/CustomTabBar";
import "./index.scss";
import Taro from "@tarojs/taro";

const Index = () => {
  Taro.useShareAppMessage(() => {
    return {
      title: "EuroStay欧洲换宿",
      path: `/pages/index/index`,
    };
  });

  return (
    <View className="index">
      
      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
