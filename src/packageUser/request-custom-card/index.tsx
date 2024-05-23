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
        success: function (res) {
          console.log('reserved for upload houseinfo');
        },
      });
    } catch (error) {
      console.info('be patient plz');
    }
  };

  const handleSubmitRequestCustomCard = () => {
    handleMessageRequest().then(res => {
      onSubmitCard();
      onClose();
    });
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
  ) => {
    onRequestInfoSelectionEdit(startDate, endDate, capacity, info);
  };
  // TODO: 可以传入参数来调整样式，button和上面text的颜色
  return (
    <CustomFullScreenDialog
      title='消息卡片'
      onClose={onClose}
      onSubmit={handleSubmitRequestCustomCard}
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
