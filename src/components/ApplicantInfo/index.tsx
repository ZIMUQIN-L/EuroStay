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
          <View className='info-card-table-key'>
            申请人名称
            <View className='info-card-table-value'>
              {name}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            申请人ID
            <View className='info-card-table-value'>
              {id}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            性别
            <View className='info-card-table-value'>
              {gender}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            身份
            <View className='info-card-table-value'>
              {identity}
            </View>
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            自我介绍
            <View className='info-card-table-value'>
              {identity}
            </View>
            {/* <Textarea 
              className='info-card-table-value'
              autoHeight
              disabled
            >
              {selfIntroduction}
            </Textarea> */}
          </View>
        </View>

        {type === 0 &&
          <View className='info-card-table-row'>
            <View className='info-card-table-key'>
              换宿人数
              <View className='info-card-table-value'>
                {numberOfGuests}人
              </View>
            </View>
          </View>
        }

        <View className='info-card-table-row'>
          <View className='info-card-table-key'>
            {type === 0 ? '换宿' : '申请'}原因
            <View className='info-card-table-value'>
              {reason}
            </View>
          </View>
        </View>
      </View>
    )
};

export default ApplicantInfo;