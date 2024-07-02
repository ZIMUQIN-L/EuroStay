import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import './index.scss';

const TagBar = () => {
  const tags = ['#workshop', '#一起探店', '#剧本杀', '#KTV', '#其它标签'];

  return (
    <ScrollView
      className='tag-bar'
      scrollX
      enableFlex
    >
      {tags.map((tag, index) => (
        <View key={index} className='tag-item'>
          <Text>{tag}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default TagBar;
