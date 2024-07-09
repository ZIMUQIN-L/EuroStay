import { View, Input } from '@tarojs/components';
import CopyInfoModal from '@components/CopyInfoModal';
import './index.scss';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';

const CopyHostInfoModal = ({
  onClose,
  activity,
  hostInfo
}) => {
  const handleSubmit = () => {
    Taro.setClipboardData({
        data: activity.contact,
        success: function (res) {
            Taro.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 2000
              })
        }
      })
    onClose();
  };

  return (
    <CopyInfoModal
      title={activity.official? '报名成功，请等待后续联系哦~':activity.title}
      location={activity.location}
      date={activity.startTime}
      time={activity.endTime}
      username={hostInfo.nickName}
      wechatId={activity.contact}
      avatar={hostInfo.avatarUrl}
      point={activity.point}
      helloMessage={activity.helloMessage}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName='复制联系方式到剪贴板'
    ></CopyInfoModal>
  );
};
export default CopyHostInfoModal;
