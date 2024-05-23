import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
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
  const handleSubmitRequestCustomCard = () => {
    onSubmitCard();
    onClose();
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
