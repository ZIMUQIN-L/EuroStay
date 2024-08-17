import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

interface Post {
  title: string;
  image: string;
  username: string;
  views: number;
  type: string;
  videoDuration: string | null;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <View className='post-card'>
      <View className='post-image-container'>
        {post.type === 'video' && (
          <View className='video-overlay'>
            <Image src='/assets/images/play-button-icon.png' className='play-button' />
            <Text className='video-duration'>{post.videoDuration}</Text>
          </View>
        )}
        <Image src={post.image} className='post-image' />
      </View>
      <Text className='post-title'>{post.title}</Text>
      <View className='post-info'>
        <Text className='username'>{post.username}</Text>
        <Text className='views'>{post.views} views</Text>
      </View>
    </View>
  );
};

export default PostCard;
