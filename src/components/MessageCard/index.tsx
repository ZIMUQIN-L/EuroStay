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
}

const MessageCard: React.FC<MessageCardProps> = ({
  title,
  status,
  timestamp,
  description,
  dateAndLocation,
  onClick,
  imageSrc,
}) => {
  return (
    <View className="message-card" onClick={onClick}>
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
  );
};

export default MessageCard;
