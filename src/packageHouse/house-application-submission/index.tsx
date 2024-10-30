import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import UserProfile from './applicant-profile';
import ApplicationForm from './submission-form';
import SubmissionHeader from './submission-header';
import './index.scss';

const HouseApplicationPage = () => {
  return (
    <View className="house-application-page">
      <SubmissionHeader imageUrl="/path/to/image.jpg" headerText="求宿申请" />
      <UserProfile 
        title="求宿信息"
        imageUrl="/path/to/user-image.jpg"
        name="求宿者 紫苏文"
        tags={['学生', '优先安排理工学', '简单·优先处理']}
      />
      <ApplicationForm />
    </View>
  );
};

export default HouseApplicationPage;