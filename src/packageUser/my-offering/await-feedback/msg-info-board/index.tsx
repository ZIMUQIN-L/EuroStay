import { View, Text, Image, Textarea } from '@tarojs/components';
import './index.scss';
import {
  DateSelectionIcon,
  CapacitySelectionIcon,
  PreferenceIcon,
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

        <View className='selection-part'>
          <View className='selection-container'>
            <View className='selection-content'>
              <View className='selection-left'>
                <View className='icon-container'>
                  <Image src={DateSelectionIcon} />
                </View>
              </View>
              <View className='selection-right'>
                <View>求宿时间</View>
                <View className='selection-right-content'>
                  {`${userAccomMessage.start_date} - ${userAccomMessage.end_date}`}{' '}
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='selection-part'>
          <View className='selection-container'>
            <View className='selection-content'>
              <View className='selection-left'>
                <View className='icon-container'>
                  <Image src={CapacitySelectionIcon} className='capacity-pic' />
                </View>
              </View>
              <View className='selection-right'>
                <View>入住人数</View>
                <View className='selection-right-content'>
                  {userAccomMessage.capacity}{' '}
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='selection-part'>
          <View className='selection-container'>
            <View className='selection-content'>
              <View className='selection-left'>
                <View className='icon-container'>
                  <Image src={PreferenceIcon} />
                </View>
              </View>
              <View className='selection-right'>
                <View>个人联系方式</View>
                {/* Optionally display the selected contact info */}
                {userAccomMessage.contact != undefined &&
                  userAccomMessage.contact != '' && (
                    <View className='selection-right-content'>{`${userAccomMessage.contact}`}</View>
                  )}
                {!(
                  userAccomMessage.contact != undefined &&
                  userAccomMessage.contact != ''
                ) && <View className='selection-right-content'>无</View>}
              </View>
            </View>
          </View>
        </View>

        <Text className='des-title'>住客的一封自我介绍信~</Text>
        <View className='des-text-container' style={{ minHeight: '5px' }}>
          <View className='des-text'>{userAccomMessage.description}</View>
        </View>

        <View className='button-container'>
          <View className='msg-reject-button' onClick={onReject}>
            <Text style={{ color: 'white' }}>拒绝</Text>
          </View>
          <View className='msg-save-button' onClick={onSubmit}>
            <Text style={{ color: 'white' }}>确认</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default MsgInfoBoard;
