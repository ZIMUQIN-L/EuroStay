import { View, Text, Image } from '@tarojs/components';
import './index.scss';

interface MessageCardProps {
  title: string;
  status: string;
  timestamp: string;
  description: string;
  dateAndLocation?: string;
  onClick?: () => void; // 点击回调
  imageSrc?: string; // 右侧图片路径
  type: string; // system or private
  isNew: boolean; //有没有未读消息
}

const MessageCard: React.FC<MessageCardProps> = ({
  title,
  status,
  timestamp,
  description,
  dateAndLocation,
  onClick,
  imageSrc,
  type,
  isNew
}) => {
  return (
    <View className={`message-card ${type}`} onClick={onClick}>
      {type === 'system' ? (
        // 系统信息布局
        <View className="inner-wrapper">
          <View className="avatar-placeholder"/>
          <View className="system-content">
            <View className="left-content">
              <Text className="title">{title}</Text>
              <Text className="description">{description}</Text>
            </View>
            <Text className="timestamp">{timestamp}</Text>
          </View>
        </View>
      ) : (
        <View className="inner-wrapper">
          <View className="avatar-placeholder" />
          <View className="content">
            <View className="header">
              <Text className="title">{title}</Text>
              {/* <Text className="status">{status}</Text> */}
            </View>
            <View  className="des">
              <Text className="description">{description}</Text>
              {dateAndLocation && <Text className="meta">{dateAndLocation}</Text>}
            </View>
          </View>
          <Text className="timestamp">{timestamp}</Text>
          {imageSrc && <Image className="image-right" src={imageSrc} />}
        </View>
      )}
    </View>
  );
};

export default MessageCard;
