import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import RequestDes from './request-description';
import RequestSendToggle from './request-send-toggle';
import RequestInfoSelection from './request-info-selection';
// import { ContactInfo } from '@utils/interfaces';

/**
 * @description 联系房主和求宿公用的组件
 */
const RequestCustomCard = ({
  onClose,
  onRequestDesEdit,
  onSendToggleEdit,
  onRequestInfoSelectionEdit,
  onSubmitCard,
}) => {
  // here I remove the params for simplicity
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState(0);
  const [gender, setGender] = useState('');

  const handleMessageRequest = async () => {
    try {
      await Taro.showModal({
        title: '接受消息通知（请勾选`总是保持以上选择`确保消息发送成功',
        content:
          '是否允许小程序在有求宿者联系您时给您发送提醒，这样你们的沟通会更有效哦~',
        confirmColor: '#A6A0E0',
      });

      await Taro.requestSubscribeMessage({
        tmplIds: ['I5kMb7W6-QbKBqcXLlzqZzK9N97JPkrFWdMHBI7hyA4'],
      });
    } catch (error) {
      console.info('be patient plz');
    }
  };

  const handleSubmitRequestCustomCard = () => {
    if (!startDate || !endDate) {
      Taro.showToast({
        title: '请选择入住时间',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (capacity == 0) {
      Taro.showToast({
        title: '请选择入住人数~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (gender == '') {
      Taro.showToast({
        title: '请选择住客性别~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else {
      handleMessageRequest().then(res => {
        onSubmitCard();
        onClose();
      });
    }
  };

  const handleRequestDesEdit = editRequestDes => {
    onRequestDesEdit(editRequestDes);
  };

  const handleSendToggleEdit = editSendToggle => {
    onSendToggleEdit(editSendToggle);
  };

  const handleRequestInfoSelectionEdit = (
    startDate,
    endDate,
    capacity: number,
    info,
    genderInfo,
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setCapacity(capacity);
    setGender(genderInfo);
    onRequestInfoSelectionEdit(startDate, endDate, capacity, info, genderInfo);
  };
  // TODO: 可以传入参数来调整样式，button和上面text的颜色
  return (
    <CustomFullScreenDialog
      title='消息卡片'
      onClose={onClose}
      onSubmit={handleSubmitRequestCustomCard}
      className='request-custom-card'
    >
      <View className='index message-card'>
        <RequestInfoSelection
          onRequestInfoSelection={handleRequestInfoSelectionEdit}
        />
        <RequestSendToggle onChangeToggle={handleSendToggleEdit} />
        <RequestDes onRequestDes={handleRequestDesEdit} />
      </View>
    </CustomFullScreenDialog>
  );
};

export default RequestCustomCard;
