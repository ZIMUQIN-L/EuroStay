import { View, Textarea } from '@tarojs/components'
import './index.scss'
import { observer } from 'mobx-react';

const ApplicantInfo = ({
    type,
    title,  
    name,
    id,
    gender,
    identity,
    selfIntroduction,
    numberOfGuests,
    reason
}) => {
    return (
      <View className='info-card'>
        <View className='info-card-header'>
          <View className='purple-badge'/>
            {title}
        </View>
        
        <View className='info-card-table-row'>
          <View className='info-card-key'>
            申请人名称
          </View>
          <View className='info-card-value'>
            {name}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            申请人ID
          </View>
          <View className='info-card-value'>
            {id}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            性别
          </View>
          <View className='info-card-value'>
            {gender}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            身份
          </View>
          <View className='info-card-value'>
            {identity}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            自我介绍
          </View>
          <View className='info-card-value'>
            {selfIntroduction}
          </View>
        </View>

        {type === 0 &&
          <View className='info-card-table-row'>
            <View className='info-card-key'>
              换宿人数
            </View>
            <View className='info-card-value'>
              {numberOfGuests}人
            </View>
          </View>
        }

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            {type === 0 ? '换宿' : '申请'}原因
          </View>
          <View className='info-card-value'>
            {reason}
          </View>
        </View>
      </View>
    )
};

export default ApplicantInfo;