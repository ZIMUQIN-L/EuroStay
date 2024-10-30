// src/components/SubmissionHeader.jsx
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

const SubmissionHeader = ({ imageUrl, headerText }) => {
  return (
    <View className="submission-header">
      <View className="icon-container">
        {imageUrl ? (
          <Image className="icon" src={imageUrl} style={{ backgroundImage: 'url(' + imageUrl + ')', backgroundSize: 'cover' }} />
        ) : (
          <View className="default-icon" />
        )}
      </View>
      <Text className="header-text">{headerText || "默认文本"}</Text>
    </View>
  );
};

export default SubmissionHeader;
