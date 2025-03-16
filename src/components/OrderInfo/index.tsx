import { View } from '@tarojs/components'
import './index.scss'

const HostAwaitingOrder = ({
    orderStatus,
    orderId,
    houseName,
    houseId,
    price,
    days,
    time,
}) => {
    return (
      <View className='info-card'>
        <View className='info-card-header'>
          <View className='purple-badge'/>
            订单信息
          <View className='status'>{orderStatus}</View>
        </View>
        
        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            订单号
            <View className='info-card-table-value'>
              {orderId}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            房源名称
            <View className='info-card-table-value'>
              {houseName}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            房源 ID
            <View className='info-card-table-value'>
              {houseId}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            价格
            <View className='info-card-table-value'>
              €{price}/晚，{days}晚共€
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            换宿时间
            <View className='info-card-table-value'>
              {time}
            </View>
          </View>
        </View>
      </View>
    )
}

export default HostAwaitingOrder;