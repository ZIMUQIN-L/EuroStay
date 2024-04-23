import { View, Image, Input, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import DefaultAvatar from '@assets/images/default-avatar.png';
import { UserItemProps } from '@utils/interfaces';
import EditIcon from '@assets/images/profile-edit-icon.svg';
import './index.scss';

const Index: React.FC<UserItemProps> = user => {
  // 先采用默认数据
  return (
    <View className='index'>
      <Image src={DefaultAvatar} className='avatar-img' />
      <View>
        <Image src={EditIcon} className='edit-icon' />
        <View className='user-texts'>
          <View className='user-name'>
            <Text>Namexxx</Text>
          </View>

          <View className='sub-title'>ID: balabala</View>
          <View className='sub-title'>所属地: 英国</View>
        </View>
      </View>
      <View className='user-des'>
        <Input
          type='text'
          placeholder='个人描述：简单介绍一下自己吧'
          className='des-input'
        />
      </View>
      <View className='save-button'>
        <Text>保存修改</Text>
      </View>
    </View>
  );
};

export default observer(Index);
