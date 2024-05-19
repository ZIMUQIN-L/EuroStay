import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import RequestDes from './request-description';
import RequestSendToggle from './request-send-toggle';
import RequestInfoSelection from './request-info-selection';

/**
 * @description 我的供宿和我的求宿的共用组件
 */
const RequestCustomCard = ({
  onClose,
  onRequestDesEdit,
  onSendToggleEdit,
  onRequestInfoSelectionEdit,

}) => {

  const handleSubmitRequestCustomCard = () => {
    console.log("--SubmitRequestCustomCard");
    onClose();
  };

  const handleRequestDesEdit = editRequestDes => {
    console.log("--handleRequestDesEdit", editRequestDes);
    onRequestDesEdit(editRequestDes);
  }

  const handleSendToggleEdit = editSendToggle => {
    console.log("handleSendToggleEdit", editSendToggle);
    onSendToggleEdit(editSendToggle);
  }

  const handleRequestInfoSelectionEdit = editRequestInfoSelection => {
    console.log(" -- handleRequestInfoSelectionEdit", editRequestInfoSelection);
    onRequestInfoSelectionEdit(editRequestInfoSelection);
  }
  // TODO: 可以传入参数来调整样式，button和上面text的颜色
  return (
    <CustomFullScreenDialog
      title='消息卡片'
      onClose={onClose}
      onSubmit={handleSubmitRequestCustomCard}
    >
      <View className='index'>
        <RequestInfoSelection onRequestInfoSelection={handleRequestInfoSelectionEdit}/>
        <RequestSendToggle onChangeToggle={handleSendToggleEdit} />
        <RequestDes onRequestDes={handleRequestDesEdit} />
      </View>
    </CustomFullScreenDialog>
  );
};

export default RequestCustomCard;
