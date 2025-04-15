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
    // console.log('refuseReason', refuseReason);
    return (
      <View className='info-card'>
        <View className='info-card-header'>
          <View className='purple-badge'/>
            订单信息
          <View className='status'>{orderStatus}</View>
        </View>
        
        <View className='info-card-table-row'>
          <View className='info-card-key'>
            订单号
          </View>
          <View className='info-card-value'>
            {orderId}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            {type === 0 ? '房源' : '活动'}名称
          </View>
          <View className='info-card-value'>
            {houseName}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
          {type === 0 ? '房源' : '活动'} ID
          </View>
          <View className='info-card-value'>
            {houseId}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            价格
          </View>
          <View className='info-card-value'>
          {type === 0 ? `€${price}/晚` : price === 0 ? '免费' : `€${price}`}
          {/* {type === 0 ? `€${price}/晚，共${days}晚` : price === 0 ? '免费' : `€${price}`} */}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            {type === 0 ? '换宿' : '活动开始'}时间
          </View>
          <View className='info-card-value'>
            {time}
          </View>
        </View>

        { refuseReason !== undefined && refuseReason !== '' &&
          <View className='info-card-table-row'>
            <View className='info-card-key'>
              拒绝原因
            </View>
            <View className='info-card-value'>
              {refuseReason}
            </View>
          </View>
        }
      </View>
    )
}

export default HostAwaitingOrder;