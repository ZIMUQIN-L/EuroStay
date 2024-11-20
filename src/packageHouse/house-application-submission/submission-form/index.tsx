// src/pages/HouseApplicationPage/SubmissionForm.jsx
import { View, Text, Button } from '@tarojs/components';
import './index.scss';

const SubmissionForm = () => {
  return (
    <View className="submission-form">
      <View className="form-item">
        <Text>求宿时间</Text>
        <Text>2024-05-02 to 2024-05-10</Text>
      </View>
      <View className="form-item">
        <Text>人住人数</Text>
        <Text>2人</Text>
      </View>
      <View className="button-group">  {/* Container for buttons */}
        <Button className="submit-button">拒绝</Button>
        <Button className="extra-button">同意</Button>
      </View>
    </View>
  );
};


export default SubmissionForm;
