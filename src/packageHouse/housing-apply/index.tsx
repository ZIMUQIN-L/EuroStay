import { View, Textarea, Text } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useState } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
import { useRouter } from '@tarojs/taro';
import { API } from '@utils/apiService';

const RESOURCE_OPTIONS = [
  '我的房源',
  '带点儿本地特产',
  '我的换宿技能',
  '为Host做一顿饭/请Host吃一顿饭',
];

const Index = () => {
  const [maleCount, setMaleCount] = useState(0)
  const [femaleCount, setFemaleCount] = useState(0)
  const [description, setDescription] = useState('')
  const [skill, setSkill] = useState('')
  const [resources, setResources] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter();
  const id = router?.params?.id;
  const startDate = router?.params?.startDate;
  const endDate = router?.params?.endDate;

  const toggleResource = (option: string) => {
    setResources(prev =>
      prev.includes(option) ? prev.filter(r => r !== option) : [...prev, option]
    );
  };

  Taro.useShareAppMessage(() => ({ title: '房源申请' }));

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!description || !skill) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none', duration: 2000 });
      return;
    }

    if (maleCount <= 0 && femaleCount <= 0) {
      Taro.showToast({ title: '请填写正确的人数', icon: 'none', duration: 2000 });
      return;
    }

    if (resources.length === 0) {
      Taro.showToast({ title: '请选择至少一项换宿资源', icon: 'none', duration: 2000 });
      return;
    }

    setIsSubmitting(true);

    try {
      await API.property.applyProperty({
        pid: Number(id),
        maleNumber: maleCount,
        femaleNumber: femaleCount,
        description,
        startDate: startDate || '',
        endDate: endDate || '',
        resources,
        skill,
      });

      Taro.showToast({ title: '申请已提交', icon: 'success', duration: 2000 });
      setTimeout(() => Taro.navigateBack(), 2000);
    } catch (error) {
      Taro.showToast({
        title: error.message || '申请提交失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className='apply-page'>
      {/* 入住基本信息 */}
      <View className='apply-card'>
        <View className='apply-card-header'>
          <View className='apply-purple-bar' />
          <Text className='apply-card-title'>入住基本信息</Text>
        </View>

        <Text className='apply-field-label'>申请入住的日期</Text>
        <View className='apply-date-row'>
          <Text className='apply-date-text'>{startDate} ~ {endDate}</Text>
        </View>

        <Text className='apply-field-label'>我的出行计划*</Text>
        <Textarea
          className='apply-textarea'
          value={description}
          onInput={e => setDescription(e.detail.value)}
          placeholder='不需要事无巨细，但写上独特的行程安排有可能会找到同频的友友哦~'
          autoHeight
          showConfirmBar={false}
        />

        <Text className='apply-field-label'>旅客性别及人数</Text>
        <View className='apply-stepper-row'>
          <View className='apply-stepper-item'>
            <Text className='apply-stepper-label'>女生</Text>
            <View className='apply-stepper-control'>
              <View
                className='apply-stepper-btn'
                onClick={() => setFemaleCount(prev => Math.max(0, prev - 1))}
              >
                <Text className='apply-stepper-btn-text'>−</Text>
              </View>
              <Text className='apply-stepper-count'>{femaleCount}</Text>
              <View
                className='apply-stepper-btn'
                onClick={() => setFemaleCount(prev => prev + 1)}
              >
                <Text className='apply-stepper-btn-text'>+</Text>
              </View>
            </View>
          </View>

          <View className='apply-stepper-item'>
            <Text className='apply-stepper-label'>男生</Text>
            <View className='apply-stepper-control'>
              <View
                className='apply-stepper-btn'
                onClick={() => setMaleCount(prev => Math.max(0, prev - 1))}
              >
                <Text className='apply-stepper-btn-text'>−</Text>
              </View>
              <Text className='apply-stepper-count'>{maleCount}</Text>
              <View
                className='apply-stepper-btn'
                onClick={() => setMaleCount(prev => prev + 1)}
              >
                <Text className='apply-stepper-btn-text'>+</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 换宿相关 */}
      <View className='apply-card'>
        <View className='apply-card-header'>
          <View className='apply-purple-bar' />
          <Text className='apply-card-title'>换宿相关</Text>
        </View>

        <Text className='apply-field-label'>用于换宿的资源（可多选）*</Text>
        <View className='apply-resource-list'>
          {RESOURCE_OPTIONS.map(option => {
            const selected = resources.includes(option);
            return (
              <View
                key={option}
                className={`apply-resource-item ${selected ? 'active' : ''}`}
                onClick={() => toggleResource(option)}
              >
                <View className={`apply-checkbox ${selected ? 'checked' : ''}`}>
                  {selected && <Text className='apply-checkmark'>✓</Text>}
                </View>
                <Text className='apply-resource-label'>{option}</Text>
              </View>
            );
          })}
        </View>

        <Text className='apply-field-label'>换宿技能/自我介绍*</Text>
        <Textarea
          className='apply-textarea'
          value={skill}
          onInput={e => setSkill(e.detail.value)}
          placeholder='可以讲讲能为Host做的一些事情吗？可以参考Host的需求，或许可以解锁技能/房源换宿哦~'
          autoHeight
          showConfirmBar={false}
        />
      </View>

      <View
        className={`apply-submit-btn ${isSubmitting ? 'disabled' : ''}`}
        onClick={handleSubmit}
      >
        提交申请
      </View>
    </View>
  )
}

export default observer(Index)
