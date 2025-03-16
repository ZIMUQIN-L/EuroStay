import { View, Image, Text } from '@tarojs/components';
// import './index.scss';
import Taro from '@tarojs/taro';

// interface HostCardSmallGroups {
//     avatar: string;
//     role: string;
//     userName: string;
//     tags: string[];
//     buttonText: string;
//     buttonFunc: Function;
// }

// export default (props: HostCardSmallGroups) => {
//     return (
//         <View className='host-card-small'>
//             <Image 
//                 src={props.avatar}
//                 className='host-avatar'
//                 mode="aspectFill"
//             />
//             <View className='host-name'>{props.role}：{props.userName}</View>
//             <View className='host-button'
//                 onClick={() => {props.buttonFunc()}}
//                 >{props.buttonText}
//             </View>
//             <View className='host-tags'>
//                 {props.tags.map(item => {
//                     return <View className='host-tag'>{item}</View>;})
//                 }
//             </View>
//         </View>
//     )
// };

const HostCardSmall = ({
    avatar,
    role,
    userName,
    detail,
    tags,
    buttonText,
    buttonFunc
}) => {
    require('./index.scss');
    return (
        <View className='HostCardSmall'>
            <Image 
                src={avatar}
                className='host-avatar'
                mode="aspectFill"
            />
            <View className='host-name'>{role}：{userName}</View>
            <View className='host-detail'>{detail}</View>
            <View className='host-button'
                onClick={() => {buttonFunc()}}
                >{buttonText}
            </View>
            <View className='host-tags'>
                {tags.map(item => {
                    return <View className='host-tag'>{item}</View>;})
                }
            </View>
        </View>
    )
};

export default HostCardSmall;