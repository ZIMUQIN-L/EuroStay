// src/components/CustomNavBar/index.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function CustomNavBar(props) {
  const { title, avatar } = props
  const [navBarHeight, setNavBarHeight] = useState(44) // 默认 44

  useEffect(() => {
    const info = Taro.getSystemInfoSync()
    // info.statusBarHeight 是状态栏高度
    // 有些机型的标题栏高度可以通过 info.titleBarHeight 或自行推算
    const statusBarH = info.statusBarHeight || 20
    // 小程序通常系统导航栏本体是 44px（某些安卓可能是 48px）
    // 你想让整体(状态栏 + 标题栏) >= 64px / 88px，具体看需求
    setNavBarHeight(statusBarH + 44)
  }, [])

  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className='custom-nav-bar' style={{ height: `${navBarHeight}px` }}>
      <View className='back-area' onClick={handleBack}>
        <Image src={require('@assets/images/back-btn.svg')} className='back-icon' />
      </View>
      <View className='title-area'>
        <Image src={avatar} className='avatar' />
        <Text>{title}</Text>
      </View>
    </View>
  )
}
