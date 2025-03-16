import { View, Image, Text } from '@tarojs/components';
// import './index.scss';
import Taro from '@tarojs/taro';

const UserCardSmall = ({
    avatar,
    role,
    userName,
    tags,
    buttonText,
    buttonFunc
}) => {
    require('./index.scss');
    return (
        <View className='UserCardSmall'>
            <Image 
                src={avatar}
                className='user-avatar'
                mode="aspectFill"
            />
            <View className='user-name'>{role}：{userName}</View>
            <View className='user-button'
                onClick={() => {buttonFunc()}}
                >{buttonText}
            </View>
            <View className='user-tags'>
                {tags.map(item => {
                    return <View className='user-tag'>{item}</View>;})
                }
            </View>
        </View>
    )
};

export default UserCardSmall;