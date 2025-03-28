import { View, Text, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro, { useRouter } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

const EditTags = () => {
  const router = useRouter();
  
  const getCurrentTags = () => {
    const value = router.params.currentValue;
    if (!value || value === 'undefined' || value === 'null') return [];
    try {
      // 解码并按"、"分割成数组
      const decodedValue = decodeURIComponent(value);
      return decodedValue ? decodedValue.split('、') : [];
    } catch (error) {
      console.error('Parse tags error:', error);
      return [];
    }
  };

  const [selectedTags, setSelectedTags] = useState<string[]>(getCurrentTags());
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newTag, setNewTag] = useState('');

  // 预设的热门标签
  const hotTags = {
    '爱好': ['画画', '美食', '滑雪', '游戏', '摄影', '音乐', '看电影', '写作',
        '旅行', '健身', '跳舞', '唱歌', '手工', '阅读', '追剧', '编程',
        '烘焙', '咖啡', '动漫', '爬山'],
    '职业': ['学生', 'Tech', '自由职业', '设计师', '产品经理', '程序员',
        '教师', '医生', '艺术家', '音乐人', '编辑', 'marketing',
        '律师', '科研人员', '企业主', '其他'],
    '其他': ['社牛', '社恐', '宠物控', '夜猫子', '早睡人', '乐天派', '理性派',
        'emo体质', '养生达人', '搞笑担当']
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags(prev => [...prev, tag]);
    } else {
      Taro.showToast({
        title: '最多选择3个标签',
        icon: 'none'
      });
    }
  };

  const handleAddNewTag = () => {
    if (!newTag.trim()) {
      Taro.showToast({
        title: '标签不能为空',
        icon: 'none'
      });
      return;
    }

    if (selectedTags.length >= 3) {
      Taro.showToast({
        title: '最多选择3个标签',
        icon: 'none'
      });
      return;
    }

    setSelectedTags(prev => [...prev, newTag.trim()]);
    setNewTag('');
    setShowAddPopup(false);
  };

  const handleConfirm = () => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const eventChannel = currentPage.getOpenerEventChannel();
    
    // 返回数组形式的 tags
    eventChannel.emit('updateData', {
      tags: selectedTags  // selectedTags 本身就是数组，会正确更新到 userInfo
    });

    Taro.navigateBack();
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className='edit-tags'>
      <View className='content-container'>
        <View className='selected-tags'>
          <Text className='section-title'>个性标签</Text>
          <View className='tags-list'>
            <View className='add-tag' onClick={() => setShowAddPopup(true)}>
              <Text className='plus'>+</Text>
            </View>
            {selectedTags.map((tag, index) => (
              <View key={index} className='tag selected' onClick={() => handleTagSelect(tag)}>
                {tag} ×
              </View>
            ))}
          </View>
        </View>

        <View className='hot-tags'>
          <Text className='section-title'>热门标签</Text>
          {Object.entries(hotTags).map(([category, tags]) => (
            <View key={category} className='category-section'>
              <Text className='category-title'>{category}</Text>
              <View className='tags-list'>
                {tags.map((tag, index) => (
                  <View
                    key={index}
                    className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View className='button-group'>
          <View className='confirm-button' onClick={handleConfirm}>
            确认修改
          </View>
          <View className='cancel-button' onClick={handleCancel}>
            取消
          </View>
        </View>
      </View>

      {/* 添加标签弹窗 */}
      {showAddPopup && (
        <View className='popup-mask' onClick={() => setShowAddPopup(false)}>
          <View className='popup-content' onClick={e => e.stopPropagation()}>
            <Text className='popup-title'>添加标签</Text>
            <Input
              className='popup-input'
              value={newTag}
              onInput={e => setNewTag(e.detail.value)}
              placeholder='请输入标签名称'
              maxlength={10}
            />
            <View className='popup-buttons'>
              <View className='confirm-button' onClick={handleAddNewTag}>
                确认添加
              </View>
              <View className='cancel-button' onClick={() => {
                setShowAddPopup(false);
                setNewTag('');
              }}>
                取消添加
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default observer(EditTags);
