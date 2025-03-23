import { View } from '@tarojs/components'
import './index.scss'

const HostAwaitingOrder = ({
    type,
    orderStatus,
    orderId,
    houseName,
    houseId,
    price,
    time,
    refuseReason
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
            {type === 0 ? '房源' : '活动'}名称
            <View className='info-card-table-value'>
              {houseName}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
          {type === 0 ? '房源' : '活动'} ID
            <View className='info-card-table-value'>
              {houseId}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            价格
            <View className='info-card-table-value'>
            {type === 0 ? `€${price}/晚` : price === 0 ? '免费' : `€${price}`}
            {/* {type === 0 ? `€${price}/晚，共${days}晚` : price === 0 ? '免费' : `€${price}`} */}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            {type === 0 ? '换宿' : '活动开始'}时间
            <View className='info-card-table-value'>
              {time}
            </View>
          </View>
        </View>

        { refuseReason !== '' &&
          <View className='info-card-table-row'>
            <View className='info-card-table-key'>
              拒绝原因
              <View className='info-card-table-value'>
                {refuseReason}
              </View>
            </View>
          </View>
        }
      </View>
    )
}

export default HostAwaitingOrder;