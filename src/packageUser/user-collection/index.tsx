import { View } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { useDidShow } from '@tarojs/taro';
import Taro from '@tarojs/taro'
import HouseCard from '@components/HouseCard'
import GlobalStore from '@store/GlobalStore'
import { API } from '@utils/apiService'
import { CollectionItem, PaginatedResponse } from '@utils/interfaces'
import './index.scss'

const UserCollection: React.FC = () => {
  const [collections, setCollections] = useState<CollectionItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMorePage, setHasMorePage] = useState(true);
  const [loading, setLoading] = useState(false)

  useDidShow(() => {
    fetchCollections(1);
  });

  const fetchCollections = async (page: number) => {
    setLoading(true)
    try {
      const response = await API.user.getUserCollectionList(GlobalStore.userInfo.uid, page);
      
      // Process the data with location information
      const processedData = response.data.map(item => ({
        ...item,
        location: `${item.country}${item.city}`
      }));
      
      if (page === 1) {
        setCollections(processedData)
      } else {
        setCollections(prev => [...prev, ...processedData])
      }
      
      if (response.current_page >= response.last_page) {
        setHasMorePage(false);
      }
      
      setCurrentPage(response.current_page)
    } catch (error) {
      Taro.showToast({
        title: '获取收藏列表失败，请重试',
        icon: 'none',
        duration: 2000,
      })
    } finally {
      setLoading(false)
      Taro.stopPullDownRefresh()
    }
  }

  const formatDate = (date: Date): string => {
    if (!date) {
      return '暂无日期';
    }
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
  };

  const getAvailableDateText = (item: CollectionItem): string => {
    if (!item.startDate || !item.endDate) {
      return '暂无日期信息';
    }
    return `${formatDate(item.startDate)}-${formatDate(item.endDate)}`;
  };

  useEffect(() => {
    fetchCollections(1)
  }, [])

  // 上拉加载更多
  Taro.useReachBottom(() => {
    if (hasMorePage && !loading) {
      fetchCollections(currentPage + 1)
    }
  })

  return (
    <View className='collection-container'>
      {collections.map((item, index) => (
        <View className='card-wrapper' key={index}>
          <HouseCard
            key={item.id}   
            id={item.id}
            uid={GlobalStore.userInfo.uid}
            type={item.type}
            title={item.title}
            location={item.location || ''}
            price={item.price || 0}
            images={item.images}
            currency='€'
            maleCount={item.type === 1 ? item.maleNumber : undefined}
            femaleCount={item.type === 1 ? item.femaleNumber : undefined}
            availableDate={getAvailableDateText(item)}
            onFavoriteClick={() => {}}
          />
        </View>
      ))}
      {loading && <View className='loading'>加载中...</View>}
      {!loading && collections.length === 0 && (
        <View className='empty-state'>快去探索一下吧~</View>
      )}
      {!loading && !hasMorePage && collections.length > 0 && (
        <View className='no-more'>再去探索一下吧~</View>
      )}
    </View>
  )
}

export default UserCollection 