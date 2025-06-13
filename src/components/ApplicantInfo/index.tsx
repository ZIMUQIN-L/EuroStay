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
    femaleNumber,
    maleNumber,
    reason,
    skill
}) => {
    // type 0: Host, type 1: Guest/Applicant
    const isHost = type === 0;
    
    return (
      <View className='info-card'>
        <View className='info-card-header'>
          <View className='purple-badge'/>
            {title}
        </View>
        
        <View className='info-card-table-row'>
          <View className='info-card-key'>
            {isHost ? 'Host名称' : '申请人名称'}
          </View>
          <View className='info-card-value'>
            {name}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            {isHost ? 'Host ID' : '申请人ID'}
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
            自我介绍
          </View>
          <View className='info-card-value'>
            {selfIntroduction}
          </View>
        </View>

        <View className='info-card-table-row'>
          <View className='info-card-key'>
            {isHost ? '可换宿人数' : '换宿人数'}
          </View>
          <View className='info-card-value'>
            {maleNumber > 0 && `${maleNumber}男`}{maleNumber > 0 && femaleNumber > 0 && ' '}{femaleNumber > 0 && `${femaleNumber}女`}
          </View>
        </View>

        {!isHost && identity && (
          <View className='info-card-table-row'>
            <View className='info-card-key'>
              身份
            </View>
            <View className='info-card-value'>
              {identity}
            </View>
          </View>
        )}

        {!isHost && reason && (
          <View className='info-card-table-row'>
            <View className='info-card-key'>
              换宿原因
            </View>
            <View className='info-card-value'>
              {reason}
            </View>
          </View>
        )}

        {!isHost && skill && (
          <View className='info-card-table-row'>
            <View className='info-card-key'>
              用于交换的技能
            </View>
            <View className='info-card-value'>
              {skill}
            </View>
          </View>
        )}
      </View>
    )
};

export default ApplicantInfo;