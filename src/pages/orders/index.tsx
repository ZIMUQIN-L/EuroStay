import { View, Text, Image, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro, { useReachBottom, useDidShow } from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';
import './index.scss';
import CustemCard from './custom-card/index';
import GlobalStore from '@store/GlobalStore';
import { OrderInfo } from '@utils/interfaces';
import TabBar from '@components/TabBar';
import { API } from '@utils/apiService';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const [activeRole, setActiveRole] = useState<'host' | 'guest'>('host');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRoleChange = (role: 'host' | 'guest') => {
    setActiveRole(role);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const loggedIn = Boolean(GlobalStore.userInfo?.uid && GlobalStore.userInfo?.uid !== 0);
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      // Reset pagination and data
      setPage(1);
      setHasMore(true);
      setLoading(false);
      setOrderListHost([]);
      setOrderListGuest([]);
      
      // Load data with current tab filter
      getOrderList(setOrderListHost, 0, false, getStatusNumber(currentTab));
      getOrderList(setOrderListGuest, 1, false, getStatusNumber(currentTab));
    }
  };

  const handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    });
  };

  // 添加页码和加载状态
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 数据列表
  const [orderListHost, setOrderListHost] = useState<OrderInfo[]>([]);
  const [orderListGuest, setOrderListGuest] = useState<OrderInfo[]>([]);
  const [isShowPostModal, setIsShowPostModal] = useState(false);

  const getButtonText = (status: number, hasReview: boolean = false, orderType: number = 0): string => {
    switch (status) {
      case 1:
        // Status 1 (申请中):
        // type 0: host发出的offer
        // type 1: guest发出的申请
        if (orderType === 0) {
          // Host发出的offer
          return activeRole === 'host' ? "查看" : "去确认";
        } else {
          // Guest发出的申请
          return activeRole === 'host' ? "去审核" : "查看";
        }
      case 2:
        return "查看";
      case 3:
        return hasReview ? "查看" : "去评价";
      case 4:
        return "查看";
      default:
        return "查看";
    }
  };

  const getStatus = (status: number): string => {
    switch (status) {
      case 1:
        return 'awaiting';
      case 2:
        return 'ongoing';
      case 3:
        return 'completed';
      case 4:
        return 'expired';
      default:
        return 'unknown';
    }
  };

  const getRole = (role: number): string => {
    return role === 0 ? 'host' : 'guest';
  };

  const getDate = (date: string): string => {
    return date.substring(0, 10);
  }

  const formatDate = (startDate: string, endDate?: string): string => {
    if (!startDate) return '';
    
    const formatSingleDate = (dateString: string): string => {
      const parts = dateString.split('-');
      if (parts.length >= 3) {
        const year = parts[0];
        const month = parts[1].replace(/^0+/, ''); // Remove leading zeros
        const day = parts[2].substring(0, 2).replace(/^0+/, ''); // Get only the day part and remove leading zeros
        
        return `${year}年${month}月${day}日`;
      }
      return dateString;
    };
    
    if (endDate) {
      return `${formatSingleDate(startDate)}-${formatSingleDate(endDate)}`;
    }
    
    return formatSingleDate(startDate);
  };

  const getStatusNumber = (tabName: string): number => {
    switch (tabName) {
      case 'all':
        return 0; // 0 means all statuses in the API
      case 'awaiting':
        return 1;
      case 'ongoing':
        return 2;
      case 'completed':
        return 3;
      case 'expired':
        return 4;
      default:
        return 0;
    }
  };

  const getOrderList = async (callback, type: number, isLoadMore = false, status = 0) => {
    if (loading || (!hasMore && isLoadMore)) return;

    setLoading(true);
    const currentPage = isLoadMore ? page : 1;
    
    try {
      const response = await API.order.getOrderList(type, currentPage, status);
      const { data: newData, current_page, last_page } = response;
      
      if (isLoadMore) {
        if (newData.length === 0 || current_page >= last_page) {
          setHasMore(false);
        } else {
          callback(prev => [...prev, ...newData]);
          setPage(current_page + 1);
        }
      } else {
        callback(newData);
        setPage(2);
        setHasMore(current_page < last_page);
      }
    } catch (error) {
      // Error handling is done inside the apiRequest function
      if (error.message?.includes('401') || error.message?.includes('403')) {
        // Token expired or invalid
        Taro.showModal({
          title: '登录已过期',
          content: '请重新登录',
          success: function (res) {
            if (res.confirm) {
              Taro.reLaunch({
                url: '/pages/login/index',
              });
            } else {
              // 如果用户不登录，重置 GlobalStore 信息
              GlobalStore.setAllInfo({
                token: '',
                uid: 0,
                username: '',
                avatar: '',
                aboutMe: '',
                location: '',
                gender: 0,
                isVip: false,
                backgroundPic: '',
              });
              // 重新加载当前页面
              Taro.reLaunch({
                url: '/pages/orders/index'
              });
            }
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // 处理触底加载
  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    else { 
      if (activeRole === 'host') getOrderList(setOrderListHost, 0, true, getStatusNumber(currentTab));
      else getOrderList(setOrderListGuest, 1, true, getStatusNumber(currentTab));
    }
  }

  // 使用 useReachBottom hook
  useReachBottom(() => {
    handleLoadMore();
  });

  // Add effect to reload data when tab or role changes
  useEffect(() => {
    if (isLoggedIn) {
      // Reset pagination
      setPage(1);
      setHasMore(true);
      setLoading(false); // Ensure we reset loading state when changing tabs
      
      // Reset data before loading new data
      if (activeRole === 'host') {
        setOrderListHost([]);
      } else {
        setOrderListGuest([]);
      }
      
      // Reload data with new status filter
      if (activeRole === 'host') {
        getOrderList(setOrderListHost, 0, false, getStatusNumber(currentTab));
      } else {
        getOrderList(setOrderListGuest, 1, false, getStatusNumber(currentTab)); 
      }
    }
  }, [currentTab, activeRole, isLoggedIn]);

  useDidShow(() => {
    checkLoginStatus();
  });

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <View className='order-list-scrollable'>
          <View className='empty-container'>
            <Text className='empty-text'>暂无订单数据</Text>
          </View>
        </View>
      );
    }

    if (activeRole === 'host') {
      return renderHostContent();
    } else {
      return renderGuestContent();
    }
  };

  const renderGuestContent = () => {
    return (
      <>
        {orderListGuest.length === 0 ? (
          <View className='empty-container'>
            <Text className='empty-text'>暂无订单数据</Text>
          </View>
        ) : (
          orderListGuest.map((order, index) => (
            <CustemCard
              key={order.id}
              image={order.images && order.images.length > 0 ? order.images[0] : ''}
              location={`${order.country}${order.city}`}
              buttonText={getButtonText(order.status, order.hasReview, order.type)}
              title={order.title}
              date={formatDate(order.startDate, order.endDate)}
              price={order.price}
              role={getRole(1)}
              status={getStatus(order.status)}
              type={order.type}
              id={order.id}
              experienceId={order.pid}
              hasReview={order.hasReview}
            />
          ))
        )}
      </>
    );
  };

  const renderHostContent = () => {
    return (
      <>
        {orderListHost.length === 0 ? (
          <View className='empty-container'>
            <Text className='empty-text'>暂无订单数据</Text>
          </View>
        ) : (
          orderListHost.map((order, index) => (
            <CustemCard
              key={order.id}
              image={order.images && order.images.length > 0 ? order.images[0] : ''}
              location={`${order.country}${order.city}`}
              buttonText={getButtonText(order.status, order.hasReview, order.type)}
              title={order.title}
              date={formatDate(order.startDate, order.endDate)}
              price={`${order.price}`}
              role={getRole(0)}
              status={getStatus(order.status)}
              type={order.type}
              id={order.id}
              experienceId={order.pid}
              hasReview={order.hasReview}
            />
          ))
        )}
      </>
    );
  };

  const isActive = tabName => {
    return currentTab === tabName ? 'active' : '';
  };

  const tabTitle = () => {
    if (activeRole === 'host') {
      return ['全部订单', '申请中', '进行中', '已完成', '已失效'];
    } else {
      return ['全部订单', '申请中', '进行中', '已完成', '已失效'];
    }
  };

  return (
    <View className={`orders-page ${isShowPostModal ? 'modal' : ''}`}>
      <View
        className={`role-selection ${activeRole === 'host' ? 'host' : 'guest'}`}
      >
        <View className='role-tabs'>
          <View
            className={`role-tab ${activeRole === 'host' ? 'host-active' : ''}`}
            onClick={() => handleRoleChange('host')}
          >
            我是Host
          </View>
          <View
            className={`role-tab ${activeRole === 'guest' ? 'guest-active' : ''}`}
            onClick={() => handleRoleChange('guest')}
          >
            我是Guest
          </View>
        </View>
      </View>

      <View className='order-tabs'>
        <View className={isActive('all')} onClick={() => setCurrentTab('all')}>
          <View className={`order-tab ${isActive('all')}`}>全部订单</View>
        </View>

        <View
          className={isActive('awaiting')}
          onClick={() => setCurrentTab('awaiting')}
        >
          <View className={`order-tab ${isActive('awaiting')}`}>
            申请中
          </View>
        </View>

        <View
          className={isActive('ongoing')}
          onClick={() => setCurrentTab('ongoing')}
        >
          <View className={`order-tab ${isActive('ongoing')}`}>
            进行中
          </View>
        </View>

        <View
          className={isActive('completed')}
          onClick={() => setCurrentTab('completed')}
        >
          <View className={`order-tab ${isActive('completed')}`}>已完成</View>
        </View>

        <View
          className={isActive('expired')}
          onClick={() => setCurrentTab('expired')}
        >
          <View className={`order-tab ${isActive('expired')}`}>已失效</View>
        </View>
      </View>

      {renderContent()}

      {!isLoggedIn && (
        <View className='login-container'>
          <View className='login-btn' onClick={handleLogin}>
            <Text>登录查看</Text>
          </View>
        </View>
      )}

      <TabBar
        onWorldSelected={() => {}}
        setIsShowPostModal={setIsShowPostModal}
        isShowPostModal={isShowPostModal}
      />
    </View>
  );
};

export default observer(Index);