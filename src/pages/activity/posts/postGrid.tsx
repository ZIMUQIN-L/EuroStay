import React from 'react';
import { View } from '@tarojs/components';
import PostCard from './PostCard';
import './index.scss';

interface Post {
  title: string;
  image: string;
  username: string;
  views: number;
  type: string;
  videoDuration: string | null;
}

const PostGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <View className='post-grid'>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </View>
  );
};

export default PostGrid;
