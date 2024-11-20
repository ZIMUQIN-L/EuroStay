import { View, Image, Text, Input, Checkbox } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import RequestDes from './request-description';
import RequestSendToggle from './request-send-toggle';
import RequestInfoSelection from './request-info-selection';
// import { ContactInfo } from '@utils/interfaces';

/**
 * @description 联系房主和求宿公用的组件
 */
const RequestCustomCard = ({
  onClose,
  onRequestDesEdit,
  onSendToggleEdit,
  onRequestInfoSelectionEdit,
  onSubmitCard,
}) => {
  // here I remove the params for simplicity
  const [currentPage, setCurrentPage] = useState('main');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState(0);
  const [gender, setGender] = useState('');
  const [userDescription, setUserDescription] = useState('');

  const handleNavigateToDateSelection = () => {
    setCurrentPage('date'); // 切换到求宿时间页面
  };

  const handleMessageRequest = async () => {
    try {
      await Taro.showModal({
        title: '接受消息通知（请勾选`总是保持以上选择`确保消息发送成功',
        content:
          '是否允许小程序在有求宿者联系您时给您发送提醒，这样你们的沟通会更有效哦~',
        confirmColor: '#A6A0E0',
      });

      await Taro.requestSubscribeMessage({
        tmplIds: ['I5kMb7W6-QbKBqcXLlzqZzK9N97JPkrFWdMHBI7hyA4'],
      });
    } catch (error) {
      console.info('be patient plz');
    }
  };

  const handleSubmitRequestCustomCard = () => {
    if (!startDate || !endDate) {
      Taro.showToast({
        title: '请选择入住时间',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (capacity == 0) {
      Taro.showToast({
        title: '请选择入住人数~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (gender == '') {
      Taro.showToast({
        title: '请选择住客性别~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (userDescription == '') {
      Taro.showToast({
        title: '请填写个人描述~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else {
      handleMessageRequest().then(res => {
        onSubmitCard();
        onClose();
      });
    }
  };

  const handleRequestDesEdit = editRequestDes => {
    onRequestDesEdit(editRequestDes);
    setUserDescription(editRequestDes);
  };

  const handleSendToggleEdit = editSendToggle => {
    onSendToggleEdit(editSendToggle);
  };

  const handleDateSelection = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    setCurrentPage('main'); // 选中后返回主页面
  };

  const handleBackToMain = () => {
    setCurrentPage('main'); // 返回主页面
  };


  const handleSubmit = () => {
    if (!startDate || !endDate) {
      Taro.showToast({ title: '请选择入住时间', icon: 'error' });
    } else {
      onSubmitCard();
      onClose();
    }
  };

    // 根据 currentPage 动态设置标题
    const getDialogTitle = () => {
      switch (currentPage) {
        case 'main':
          return '发送求宿信息';
        case 'date':
          return '人数和性别';
        default:
          return '发送求宿信息';
      }
    };

    const handleAgreementLinkClick = () => {
      // Taro.navigateTo({
      //   url: '/pages/agreement/index', // 跳转到具体条款页面
      // });
    };

  const handleRequestInfoSelectionEdit = (
    startDate,
    endDate,
    capacity: number,
    info,
    genderInfo,
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setCapacity(capacity);
    setGender(genderInfo);
    onRequestInfoSelectionEdit(startDate, endDate, capacity, info, genderInfo);
  };
  // TODO: 可以传入参数来调整样式，button和上面text的颜色
  return (
    <CustomFullScreenDialog
    title={getDialogTitle()}
    onClose={onClose}
    onSubmit={handleSubmit}
    className="request-custom-card"
  >
    {currentPage === 'main' && (
      <View className="main-page">
        <View className="separator"></View> {/* 隔离线 */}
        <View className="selection" onClick={handleNavigateToDateSelection}>
          <Text className="section-title">求宿时间</Text>
          <Text>
            {startDate && endDate
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : '请选择'}
          </Text>
        </View>
        <View className="separator"></View> {/* 隔离线 */}

        <View className="selection" onClick={handleNavigateToDateSelection}>
          <Text className="section-title">性别</Text>
          <Text>
            {startDate && endDate
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : '请选择'}
          </Text>
        </View>

        <View className="separator"></View> {/* 隔离线 */}



        {/* 问题部分 */}
        <View className="question-section">
          <Text className="question-title">房东想知道关于你的~</Text>
          <View className="question-item">
            <Text className="question-text">1. 请问你有养宠物的经历吗？</Text>
            <Input
              className="question-input"
              placeholder="请展开回答（至少10个字）"
              placeholderStyle="color: #999;"
            />
          </View>
          <View className="question-item">
            <Text className="question-text">2. 请问你是否有过短租经历？</Text>
            <Input
              className="question-input"
              placeholder="请展开回答（至少10个字）"
              placeholderStyle="color: #999;"
            />
          </View>
        </View>


        <View className="question-section">
          <Text className="question-title">有什么想跟房东说的话吗?</Text>
          <View className="question-item">
            <Input
              className="question-input"
              placeholder="更详细的信息帮助房主更好的了解你的需求"
              placeholderStyle="color: #999;"
            />
          </View>
        </View>


        {/* 同意条款部分 */}
        <View className="agreement-section">
          <Checkbox
            className="agreement-checkbox"
            value="agree"
            onChange={handleAgreementLinkClick}
          />
          <Text className="agreement-text">
            我已阅读并同意 <Text className="agreement-link">《求宿须知》</Text>
          </Text>
        </View>
      </View>

    )}

    {currentPage === 'date' && (
      <View className="date-page">
        <Text onClick={handleBackToMain} className="back-button">
          返回
        </Text>
        <Text>请选择求宿时间</Text>
        {/* 模拟时间选择器 */}
        <View
          onClick={() => handleDateSelection(new Date(), new Date())}
          className="date-option"
        >
          2024-01-01 至 2024-01-07
        </View>

        <Text>
          请填写入住的人数和对应性别~
        </Text>
        {/* 性别输入区域 */}
        <View className="gender-selection">
          {/* 女性输入框 */}
          <View className="gender-item">
            <Text className="gender-label">女生</Text>
            <Input
              type="number"
              placeholder="填写数字"
              className="gender-input"
            />
          </View>      
          {/* 男性输入框 */}
          <View className="gender-item">
            <Text className="gender-label">男生</Text>
            <Input
              type="number"
              placeholder="填写数字"
              className="gender-input"
            />
          </View>
        </View>
      </View>
    )}
  </CustomFullScreenDialog>
  );
};

export default RequestCustomCard;
