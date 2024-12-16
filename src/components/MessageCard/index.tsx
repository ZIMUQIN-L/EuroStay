import { View, Text } from '@tarojs/components';
import './index.scss';

interface MessageCardProps {
  title: string;
  status: string;
  timestamp: string;
  description: string;
  dateAndLocation?: string;
  onClick?: () => void; // 点击回调
}

const MessageCard: React.FC<MessageCardProps> = ({
  title,
  status,
  timestamp,
  description,
  dateAndLocation,
  onClick,
}) => {
  return (
    <View className="message-card" onClick={onClick}>
      <View className="avatar-placeholder" />
      <View className="content">
        <View className="header">
          <Text className="title">{title}</Text>
          <Text className="status">{status}</Text>
        </View>
        <Text className="description">{description}</Text>
        {dateAndLocation && <Text className="meta">{dateAndLocation}</Text>}
      </View>
      <Text className="timestamp">{timestamp}</Text>
    </View>
  );
};

export default MessageCard;
