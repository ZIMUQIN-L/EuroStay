import { View, Input } from '@tarojs/components';
import CopyInfoModal from '@components/CopyInfoModal';
import './index.scss';
import { useEffect, useState } from 'react';

const CopyHostInfoModal = ({
  onClose,
  title,
  date,
  time,
  location,
  username,
  avatar,
  wechatId,
}) => {
  const handleSubmitTagAdd = () => {
    onClose();
  };

  return (
    <CopyInfoModal
      title={title}
      location={location}
      date={date}
      time={time}
      username={username}
      wechatId={wechatId}
      avatar={avatar}
      onClose={onClose}
      onSubmit={handleSubmitTagAdd}
      buttonName='复制联系方式到剪贴板'
    ></CopyInfoModal>
  );
};
export default CopyHostInfoModal;
