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
    refuseReason,
    orderTime
}) => {
    // console.log('refuseReason', refuseReason);
    return (
      <View className='info-card'>
        <View className='info-card-header'>
          <View className='purple-badge'/>
            订单状态
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
          房源名称
          </View>
          <View className='info-card-value'>
            {houseName}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
          房源ID
          </View>
          <View className='info-card-value'>
            {houseId}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            下单时间
          </View>
          <View className='info-card-value'>
            {orderTime || ''}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            价格
          </View>
          <View className='info-card-value'>
          {price === 0 ? '与房主自行商议' : `€${price}/晚`}
          {/* {type === 0 ? `€${price}/晚，共${days}晚` : price === 0 ? '免费' : `€${price}`} */}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            换宿时间
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