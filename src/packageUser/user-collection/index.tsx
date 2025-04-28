import { View } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { useDidShow } from '@tarojs/taro';
import Taro from '@tarojs/taro'
import HouseCard from '@components/HouseCard'
import GlobalStore from '@store/GlobalStore'
import './index.scss'

interface CollectionItem {
  id: number
  images: string[]
  location: string
  price: number
  startDate: string | null
  startTime: string | null
  tags: string[]
  title: string
  type: number
}

interface CollectionResponse {
  last_page: number
  per_page: number
  total: number
  current_page: number
  data: CollectionItem[]
}

const UserCollection: React.FC = () => {
  const [collections, setCollections] = useState<CollectionItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMorePage, setHasMorePage] = useState(true);
  const [loading, setLoading] = useState(false)

  useDidShow(() => {
    fetchCollections(1);
  });

  const fetchCollections = (page: number) => {
    setLoading(true)
    Taro.request({
      url: 'https://api.eurostay.co/app/esuser/getUserCollectionList',
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        page: page,
        uid: 0
      },
      success: function (res) {
          console.log(res);
        if (res.data.code === 0 && res.statusCode === 200) {
          const response = res.data.result as CollectionResponse
          if (page === 1) {
            setCollections(response.data)
          } else {
            setCollections(prev => [...prev, ...response.data])
          }
          if (response.data.length < response.per_page) {
              setHasMorePage(false);
          }
          setCurrentPage(response.current_page)
        } else {
          Taro.showToast({
            title: '获取收藏列表失败，请重试',
            icon: 'none',
            duration: 2000,
          })
        }
      },
      fail: function (err) {
        Taro.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000,
        })
      },
      complete: function () {
        setLoading(false)
        Taro.stopPullDownRefresh()
      }
    })
  }

  const parseStartDate = (startDate: string | undefined | null): string => {
    if (!startDate) {
      return '暂无可入住时间';
    }
    const date = new Date(startDate.replace(/-/g, "/"));
    return `${date.getMonth() + 1}月${date.getDate()}日起可入住`;
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
            location={item.location}
            price={item.price}
            images={item.images}
            currency='€'
            mode="participated"
            availableDate={item.type === 0 ? parseStartDate(item.startDate) : (item.startTime || '暂无开始时间')}
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