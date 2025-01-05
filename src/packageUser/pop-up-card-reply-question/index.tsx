import React, { useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import './index.scss';

const PopUpCardReplyQuestion = ({ title, question, placeholder, onSend, onCancel }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.detail.value); // 更新输入框内容
  };

  const handleSendClick = () => {
    if (inputValue.trim() !== '') {
      onSend(inputValue); // 发送输入框内容
      setInputValue(''); // 清空输入框
    }
  };

  return (
    <View className="popup-card">
    <View className="popup-content">
      {/* 标题部分 */}
      <View className="popup-header">
        <Text className="popup-title">{title}</Text>
      </View>
      <View className="popup-divider"></View>
      {/* 提问内容 */}
      <View className="popup-question">
        <Text className="popup-question-text">{question}</Text>
      </View>
      {/* 输入框部分 */}
      <View className="popup-body">
        <Input
          className="popup-input"
          placeholder={placeholder}
          value={inputValue}
          onInput={handleInputChange}
 
        />
      </View>
      {/* 按钮部分 */}
      <View className="popup-footer">
        <Button className="popup-cancel-button" onClick={onCancel}>
          取消
        </Button>
        <Button className="popup-send-button" onClick={handleSendClick}>
          发送
        </Button>
      </View>
      </View>
    </View>
  );
};

export default PopUpCardReplyQuestion;
