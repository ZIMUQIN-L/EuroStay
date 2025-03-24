import { View, Text, Image, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro, { useReachBottom } from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';
import './index.scss';
import CustemCard from './custom-card/index';
import GlobalStore from '@store/GlobalStore';
import { OrderInfo } from '@utils/interfaces';
import TabBar from '@components/TabBar';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('all');

  const [activeRole, setActiveRole] = useState<'host' | 'guest'>('host');

  const handleRoleChange = (role: 'host' | 'guest') => {
    setActiveRole(role);
    tabTitle();
  };

  // 添加页码和加载状态
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 数据列表
  const [orderListHost, setOrderListHost] = useState<OrderInfo[]>([]);

  const [orderListGuest, setOrderListGuest] = useState<OrderInfo[]>([]);

  const [isShowPostModal, setIsShowPostModal] = useState(false);

  const getButtonText = (status: number): string => {
    switch (status) {
      case 0:
        if (activeRole === 'host') return '待审核';
      case 1:
        if (activeRole === 'guest') return '待确认';
      case 3:
        return '待评价';
      case 2:
      case 4:
      case 5:
        return '查看';
      default:
        return '查看';
    }
  };

  const getStatus = (status: number): string => {
    switch (status) {
      case 0:
      case 1:
        return 'awaiting';
      case 2:
        return 'ongoing';
      case 3:
        return 'review';
      case 4:
      case 5:
        return 'expired';
      default:
        return 'unknown';
    }
  };

  const getRole = (role: number): string => {
    return role === 0 ? 'host' : 'guest';
  };

  const getDate = (date: string): string => {
    const dateObj = new Date(date.replace('-', '/').replace('-', '/'));
    return `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDay()}日`;
  };

  const getOrderList = (callback, type: number, isLoadMore = false) => {
    if (loading || (!hasMore && isLoadMore)) return;
    // console.log('GlobalStore.userInfo', GlobalStore.userInfo);

    setLoading(true);
    const currentPage = isLoadMore ? page : 1;
    console.log('currentPage', currentPage);
    Taro.request({
      url: `https://api.eurostay.co/app/order/getOrderList`,
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        type: type,
        page: currentPage,
      },
      success: function (response) {
        // console.log('response', response);
        if (response.statusCode === 200 && response.data.code === 0) {
          const newData = response.data.result.data;
          // console.log('newData', newData);
          if (isLoadMore) {
            if (newData.length === 0) {
              setHasMore(false);
            } else {
              callback(prev => [...prev, ...newData]);
              setPage(currentPage + 1);
            }
          } else {
            callback(newData);
            setPage(2);
            setHasMore(true);
          }
        }
      },
      fail: function (err) {
        Taro.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      },
      complete: function () {
        setLoading(false);
      },
    });
  };

  // 处理触底加载
  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    if (activeRole === 'host') getOrderList(setOrderListHost, 0, true);
    else getOrderList(setOrderListGuest, 1, true);
  };

  // 使用 useReachBottom hook
  useReachBottom(() => {
    handleLoadMore();
  });

  // 切换 tab 时重置分页状态
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    // getOrderList(
    //   activeRole === 'host' ? setOrderListHost : setOrderListGuest,
    //   1,
    // );
  }, [activeRole, currentTab]);

  const renderContent = () => {
    console.log('renderContent');
    if (activeRole === 'host') {
      console.log('renderHostContent', orderListHost);
      return renderHostContent();
    } else {
      console.log('renderGuestContent');
      return renderGuestContent();
    }
  };

  const renderGuestContent = () => {
    // console.log('renderGuestContent');
    // getOrderList(setOrderListGuest, 1);
    return (
      <>
        {orderListGuest.map((order, index) => {
          return (
            (currentTab === 'all' ||
              getStatus(order.status) === currentTab) && (
              <CustemCard
                image={order.image}
                location={order.location}
                buttonText={getButtonText(order.status)}
                title={order.title}
                date={order.type === 0 ? getDate(order.date) : order.date}
                price={order.price}
                role={getRole(1)}
                status={getStatus(order.status)}
                type={order.type}
                id={order.id}
                experienceId={order.experienceId}
              />
            )
          );
        })}
      </>
    );
  };

  const renderHostContent = () => {
    // console.log('renderHostContent');
    // getOrderList(setOrderListHost, 0);
    return (
      <>
        {orderListHost.map((order, index) => {
          return (
            (currentTab === 'all' ||
              getStatus(order.status) === currentTab) && (
              <CustemCard
                image={order.image}
                location={order.location}
                buttonText={getButtonText(order.status)}
                title={order.title}
                date={order.date}
                price={`€${order.price}/晚`}
                role={getRole(1)}
                status={getStatus(order.status)}
                type={order.type}
                id={order.id}
                experienceId={order.experienceId}
              />
            )
          );
        })}
      </>
    );
  };

  const isActive = tabName => {
    return currentTab === tabName ? 'active' : '';
  };

  const tabTitle = () => {
    if (activeRole === 'host') {
      return ['全部订单', '待审核', '进行中', '待评价', '已失效'];
    } else {
      return ['全部订单', '待确认', '进行中', '待评价', '已失效'];
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
            待审核
            {/* <View className='order-badge'>
              1
            </View> */}
          </View>
        </View>

        <View
          className={isActive('ongoing')}
          onClick={() => setCurrentTab('ongoing')}
        >
          <View className={`order-tab ${isActive('ongoing')}`}>
            进行中
            {/* <View className='order-badge'>
              3
            </View> */}
          </View>
        </View>

        <View
          className={isActive('review')}
          onClick={() => setCurrentTab('review')}
        >
          <View className={`order-tab ${isActive('review')}`}>待评价</View>
        </View>

        <View
          className={isActive('expired')}
          onClick={() => setCurrentTab('expired')}
        >
          <View className={`order-tab ${isActive('expired')}`}>已失效</View>
        </View>
      </View>

      <View className='order-list-scrollable'>{renderContent()}</View>

      <TabBar
        onWorldSelected={() => {}}
        setIsShowPostModal={setIsShowPostModal}
        isShowPostModal={isShowPostModal}
      />
    </View>
  );
};

export default observer(Index);
