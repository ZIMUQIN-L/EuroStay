import { View, Image, Text } from '@tarojs/components';
// import './index.scss';
import Taro from '@tarojs/taro';

const UserCardSmall = ({
    uid,
    avatar,
    role,
    username,
    tags,
    buttonText,
    buttonFunc=()=>{}
}) => {
    require('./index.scss');
    return (
        <View className='UserCardSmall'>
            <Image 
                src={avatar}
                className='user-avatar'
                mode="aspectFill"
                onClick={() => {
                    Taro.navigateTo({
                        url: `/pages/user/index?uid=${uid}`
                    });
                }}
            />
            <View className='user-name'>{role}：{username}</View>
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