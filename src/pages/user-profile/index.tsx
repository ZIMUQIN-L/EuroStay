import { View } from "@tarojs/components";
import CustomTabBar from "@components/CustomTabBar";
import { observer } from "mobx-react";

const Index = () => {
  return (
    <View className="index">
      <CustomTabBar currentTab={'user'}/>
    </View>
  );
};

export default observer(Index);
