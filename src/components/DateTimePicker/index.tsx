import { View, Text, Picker } from '@tarojs/components';
import './index.scss';

const DateTimePicker = ({ value = '', onChange }) => {
  const handleChange = (e, type) => {
    let [date, time] = value.split(' ');

    if (type === 'date') {
      date = e.detail.value;
    } else if (type === 'time') {
      time = e.detail.value;
    }

    const dateTimeValue = `${date} ${time || ''}`.trim();
    onChange(dateTimeValue);
  };

  return (
    <View className='datetime-picker'>
      <Picker
        mode='date'
        value={value.split(' ')[0] || ''}
        onChange={(e) => handleChange(e, 'date')}
      >
        <View className='picker'>
          <Text>{value.split(' ')[0] || '请选择日期'}</Text>
        </View>
      </Picker>
      <Picker
        mode='time'
        value={value.split(' ')[1] || ''}
        onChange={(e) => handleChange(e, 'time')}
      >
        <View className='picker'>
          <Text>{value.split(' ')[1] || '请选择时间'}</Text>
        </View>
      </Picker>
    </View>
  );
};

export default DateTimePicker;
