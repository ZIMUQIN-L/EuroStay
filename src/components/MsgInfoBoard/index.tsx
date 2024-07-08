import { View, Text, Image, Textarea } from '@tarojs/components';
import './index.scss';
import {
  DateSelectionIcon,
  CapacitySelectionIcon,
  PreferenceIcon,
  GenderIcon,
} from '@utils/cloudIcons';

const MsgInfoBoard = ({ userAccomMessage, onClose, onSubmit, onReject }) => {
  const handleOuterClick = () => {
    onClose();
  };

  return (
    <View className='MsgInfoBoard' onClick={handleOuterClick}>
      <View className='msg-container' onClick={e => e.stopPropagation()}>
        <View style={{ marginTop: '24px' }} className='msg-container-title'>
          住客信息卡片
        </View>

        <View className='msg-selection-part'>
          <View className='msg-selection-container'>
            <View className='msg-selection-content'>
              <View className='msg-selection-left'>
                <View className='msg-icon-container'>
                  <Image src={DateSelectionIcon} />
                </View>
              </View>
              <View className='msg-selection-right'>
                <View>求宿时间</View>
                <View className='msg-selection-right-content'>
                  {`${userAccomMessage.start_date} - ${userAccomMessage.end_date}`}{' '}
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='msg-selection-part'>
          <View className='msg-selection-container'>
            <View className='msg-selection-content'>
              <View className='msg-selection-left'>
                <View className='msg-icon-container'>
                  <Image src={CapacitySelectionIcon} className='capacity-pic' />
                </View>
              </View>
              <View className='msg-selection-right'>
                <View>入住人数</View>
                <View className='msg-selection-right-content'>
                  {userAccomMessage.capacity}{' '}
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='msg-selection-part'>
          <View className='msg--container'>
            <View className='msg-selection-content'>
              <View className='msg-selection-left'>
                <View className='msg-icon-container'>
                  <Image src={PreferenceIcon} />
                </View>
              </View>
              <View className='msg-selection-right'>
                <View>个人联系方式</View>
                {/* Optionally display the selected contact info */}
                {userAccomMessage.contact != undefined &&
                  userAccomMessage.contact != '' && (
                    <View className='msg-selection-right-content'>{`${userAccomMessage.contact}`}</View>
                  )}
                {!(
                  userAccomMessage.contact != undefined &&
                  userAccomMessage.contact != ''
                ) && <View className='msg-selection-right-content'>无</View>}
              </View>
            </View>
          </View>
        </View>

        <View className='msg-selection-part'>
          <View className='msg-selection-container'>
            <View className='msg-selection-content'>
              <View className='msg-selection-left'>
                <View className='msg-icon-container'>
                  <Image src={GenderIcon} className='capacity-pic' />
                </View>
              </View>
              <View className='msg-selection-right'>
                <View>房客性别</View>
                <View className='msg-selection-right-content'>
                  {userAccomMessage.gender}{' '}
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text className='msg-des-title'>住客的一封自我介绍信~</Text>
        <View className='msg-des-text-container' style={{ minHeight: '5px' }}>
          <View className='msg-des-text'>{userAccomMessage.description}</View>
        </View>

        <View className='button-container'>
          <View className='msg-reject-button' onClick={onReject}>
            <Text style={{ color: 'white' }}>
              {userAccomMessage.type == 'withoutTargetHouse' ? '关闭' : '拒绝'}
            </Text>
          </View>
          <View className='msg-save-button' onClick={onSubmit}>
            <Text style={{ color: 'white' }}>
              {userAccomMessage.type == 'withoutTargetHouse'
                ? '我有房源'
                : '联系'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default MsgInfoBoard;
