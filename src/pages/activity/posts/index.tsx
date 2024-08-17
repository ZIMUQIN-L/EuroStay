import React from 'react';
import { View } from '@tarojs/components';
import PostGrid from './PostGrid';
import './index.scss';

const App = () => {
  const mockPosts = [
    {
      title: '帖子标题帖子标题帖子标题',
      image: 'https://via.placeholder.com/300x200',
      username: 'username1',
      views: 136,
      type: 'image',
      videoDuration: null,
    },
    {
      title: '帖子标题帖子标题帖子标题',
      image: 'https://via.placeholder.com/300x400',
      username: 'username2',
      views: 200,
      type: 'image',
      videoDuration: null,
    },
    {
      title: '视频标题视频标题视频标题',
      image: 'https://via.placeholder.com/300x300',
      username: 'username3',
      views: 136,
      type: 'video',
      videoDuration: '02:43',
    },
    // Add more posts as needed
  ];
  
  return (
    <View className='activity-index'>
      <PostGrid posts={mockPosts} />
    </View>
  );
};

export default App;
