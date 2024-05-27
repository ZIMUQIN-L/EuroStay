import { View, Text, Image } from '@tarojs/components';
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
        <Text style={{ marginTop: '24px' }}>住客信息卡片</Text>

        <View className='selection-part'>
          <View className='selection-container'>
            <View className='selection-content'>
              <View className='selection-left'>
                <View className='icon-container'>
                  <Image src={DateSelectionIcon} />
                </View>
                <Text>求宿时间</Text>
              </View>
              <View className='selection-right'>
                <Text>
                  {`${userAccomMessage.start_date} - ${userAccomMessage.end_date}`}{' '}
                </Text>
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
                <Text>入住人数</Text>
              </View>
              <View className='selection-right'>
                <Text>{userAccomMessage.capacity} </Text>
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
                <Text>个人联系方式</Text>
              </View>
              <View className='selection-right'>
                {/* Optionally display the selected contact info */}
                {userAccomMessage.contact != undefined &&
                  userAccomMessage.contact != '' && (
                    <Text>{`${userAccomMessage.contact}`}</Text>
                  )}
                {!(
                  userAccomMessage.contact != undefined &&
                  userAccomMessage.contact != ''
                ) && <Text>无</Text>}
              </View>
            </View>
          </View>
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
