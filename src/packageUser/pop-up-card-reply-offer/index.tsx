import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import './index.scss';

const PopUpCardReplyOffer = ({ title, question, buttonOptions, onOptionSelect, onCancel }) => {
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

        {/* 按钮选项部分 */}
        <View className="popup-footer">
          {buttonOptions.map((option, index) => (
            <Button
              key={index}
              className={`popup-option-button ${index === 0 ? 'popup-cancel-button' : 'popup-send-button'}`}
              onClick={() => onOptionSelect(option)}
            >
              {option}
            </Button>
          ))}
        </View>

      </View>
    </View>
  );
};

export default PopUpCardReplyOffer;
