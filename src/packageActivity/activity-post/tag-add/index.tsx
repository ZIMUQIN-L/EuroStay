import { View, Input } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useState } from 'react';
import './index.scss';

const TagAdd = ({ onClose, onTagAdded }) => {
  const [tag, setTag] = useState('');
  const handleSubmitTagAdd = () => {
    onTagAdded(tag);
    onClose();
  };

  const handleTagChange = e => {
    setTag(e.detail.value);
  };

  return (
    <CustomFullScreenDialog
      title='添加tag（点击tag删除）'
      onClose={onClose}
      onSubmit={handleSubmitTagAdd}
    >
      <View className='tag-text-container' style={{ minHeight: '30px' }}>
        <View className='tag-text'>
          <Input
            type='text'
            placeholder='请输入新tag~'
            onInput={handleTagChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default TagAdd;
