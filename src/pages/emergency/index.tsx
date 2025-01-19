import { View, Text, Input, Button, Image } from '@tarojs/components';
import bell from '@assets/images/bell.svg';
import './index.scss';
import Taro from '@tarojs/taro';

const EmergencyPage: React.FC = () => {


    const handleReport = () => {


        // 这里会发送紧急通知
        Taro.navigateBack({
          delta: 1, // 返回层级
          success: () => {
            console.log('返回成功');
          },
        });
      };


  return (
    <View className="emergency-page">
      {/* 图标部分 */}
      <View className="icon-container">
        <Image
          src={bell}
          style={{ width: '80px', height: '80px' }}
        />
      </View>

      {/* 标题部分 */}
      <Text className="title">您正在使用紧急报警</Text>

      {/* 描述文字 */}
      <Text className="description">
        如果遇到人身危险，请先报警联系警方，报警后将具体情况填写在表单中，我们会在12小时内联系您。
      </Text>

      {/* 输入框 */}
      <Input
        className="textarea"
        placeholder="请描述具体情况……"
        type="text"
        multiline
      />

      {/* 按钮 */}
      <Button className="report-button" onClick={handleReport}>报告紧急情况</Button>
    </View>
  );
};

export default EmergencyPage;
