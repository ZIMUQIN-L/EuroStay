import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import RequestDes from './request-description';
import RequestSendToggle from './request-send-toggle';
import RequestInfoSelection from './request-info-selection';
// import { ContactInfo } from '@utils/interfaces';

/**
 * @description 我的供宿和我的求宿的共用组件
 */
const RequestCustomCard = ({
  onClose,
  onRequestDesEdit,
  onSendToggleEdit,
  onRequestInfoSelectionEdit,
  onSubmitCard,
}) => {
  const handleSubmitRequestCustomCard = messageContent => {
    onSubmitCard(messageContent);
    onClose();
  };

  const handleRequestDesEdit = editRequestDes => {
    onRequestDesEdit(editRequestDes);
  };

  const handleSendToggleEdit = editSendToggle => {
    onSendToggleEdit(editSendToggle);
  };

  const handleRequestInfoSelectionEdit = (
    startDate: Date | undefined,
    endDate: Date | undefined,
    capacity: number,
    info: string | undefined,
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
      <View className='index'>
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
