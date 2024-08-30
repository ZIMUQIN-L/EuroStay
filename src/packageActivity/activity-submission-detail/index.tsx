import {
  View,
  Text,
  Input,
  RadioGroup,
  Radio,
  Label,
  Button
} from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import './index.scss';
import { useEffect, useState } from 'react';
import { getEurostayActApplication, activityApplicationSearchById } from '@common/database/activityInfo/activityInfo';
import GlobalStore from '@store/GlobalStore';
// import ActivityDetailSection from '../activity-application/activity-detail-section';
import CopyHostInfoModal from '../activity-application/copy-host-info-modal';
import {
  ActivityApplicationItemDetailProps,
  UserItemProps,
  ActivityParticipantCombinedItemProps,
  ActivityApplicationItemProps,
  EurostayApplicationDetailProps
} from '@utils/interfaces';

const ActicityApplicationPage = () => {
  const router = useRouter();
  const applicationSubmissionId = router?.params?.id; // Assuming eurostayApplyId is passed in the URL

  const [applicationData, setApplicationData] = useState<EurostayApplicationDetailProps | ActivityApplicationItemProps | null>(null);
  const [isFallbackView, setIsFallbackView] = useState(false); // Track whether fallback data format should be displayed
  const [isShowSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!applicationSubmissionId) {
        Taro.showToast({
          title: '无效的活动ID',
          icon: 'error',
          duration: 2000,
        });
        return;
      }
  
      let data = null;
  
      try {
        // Try to fetch with the primary method
        data = await getEurostayActApplication(applicationSubmissionId);
  
        if (data && Object.keys(data).length > 0) {
          setApplicationData(data);
          return; // Data found, no need to proceed to fallback
        }
      } catch (error) {
        // Handle errors for the primary fetch
        // console.error('Error during primary data fetch:', error);
        // Even if there's an error, we'll proceed to try the fallback
      }
  
      try {
        // If primary data fetch fails (either no data or error), try the fallback method
        const fallbackData = await activityApplicationSearchById(applicationSubmissionId);
        console.log('fallbackData 63:', fallbackData);
        if (fallbackData && Object.keys(fallbackData).length > 0) {
          setApplicationData(fallbackData[0] as ActivityApplicationItemProps);
          console.log('fallbackData 66:', applicationData);
          setIsFallbackView(true); // Switch to fallback view
          return; // Fallback data found, stop further execution
        }
  
        // If no data is found in both methods
        throw new Error('No data found');
  
      } catch (fallbackError) {
        // Handle any errors specific to the fallback search
        // console.error('Error fetching fallback application data:', fallbackError);
        Taro.showToast({
          title: '数据加载失败',
          icon: 'error',
          duration: 2000,
        });
      }
    };
  
    fetchData();
  }, [applicationSubmissionId]);
  
  
  

  const handleBack = () => {
    Taro.navigateBack();
  };

  if (!applicationData) {
    return (
      <View className='loading-container'>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className='activity-application-page'>
      {/* <ActivityDetailSection
        title={applicationData?.activityTitle}
        dateInfo={applicationData?.startTime}
        organizer={applicationData?.hostInfo?.nickName}
        location={applicationData?.location}
      /> */}

    <View className='activity-application-page'>
      {!isFallbackView ? (
        applicationData && 'applicantInfo' in applicationData ? (
          <View className='activity-app-info-eurostay'>
            {Object.entries(applicationData.applicantInfo).map(([key, value]) => (
              <View key={key} className='des-container'>
                <Text className='des-title'>{key}:</Text>
                <Text className='des-content'>{value}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>Invalid data structure</Text>
        )
      ) : (
        // Fallback view
        applicationData && (
          <View className='activity-app-info-eurostay'>
              <View className='des-container'>
                <Text className='des-title'>联系方式:</Text>
                <Text className='des-content'>{(applicationData as ActivityApplicationItemProps).userContact}</Text>
              </View>

              <View className='des-container'>
                <Text className='des-title'>描述:</Text>
                <Text className='des-content'>{(applicationData as ActivityApplicationItemProps).userDescription}</Text>
              </View>

              <View className='des-container'>
                <Text className='des-title'>昵称:</Text>
                <Text className='des-content'>{(applicationData as ActivityApplicationItemProps).userNickName}</Text>
              </View>

          </View>

        )
      )}
    </View>

      {/* Back Button at the bottom */}
      <View className='buttons'>
        <Button className='back-button' onClick={handleBack}>
          返回活动列表
        </Button>
      </View>

    </View>
  );
};

export default ActicityApplicationPage;
