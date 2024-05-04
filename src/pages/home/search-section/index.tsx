import { Input, View, Text, Picker, Image, Button } from '@tarojs/components';
import './index.scss';
import { useState, createContext, useRef, useEffect } from 'react';
// import RightBottomArrow from '@assets/images/right-bottom-arrow.svg';
// import SearchIcon from '@assets/images/search.svg';
import CustomDateRangePicker from '@components/CustomDateRangePicker';
import MultiSelector from '@components/multiSelector';
import { RightBottomArrow, SearchIcon } from '../../../utils/cloudIcons';
import addressData from './addressData';
import {AtList, AtListItem, AtTextarea} from "taro-ui";
interface Child {
  id: string;
  pid: string;
  path: string;
  level: string;
  name: string;
  name_en: string;
  name_pinyin: string;
  code: string | null;
  childrens?: Child[];
}
const SearchCard = ({ onDestinationChange, onDateChange, onClickSearch }) => {

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    onDateChange(startDate, endDate);
  };

  const [userDestination, setUserDestination] = useState<string>('');

  const handleDestinationChange = e => {
    const inputDestination = e.detail.value;
    setUserDestination(inputDestination);
    onDestinationChange(e.detail.value);
  };
  const handleAddressChange = (address) => {
    console.log("Selected address:", address);
  };

  return (
    <View className='search-card'>
      <View className='search-first-line'>    
      <MultiSelector addressData={addressData} onAddressChange={handleAddressChange} />

      {/* <Picker mode='multiSelector' range={onlyArray} onChange={addressOnChange} value={customIndex} onColumnChange={bindCustomPickerColumnChange.bind(this)}>
          <AtList>
            <AtListItem
              extraText={address}
            >
            </AtListItem>
          </AtList>
        </Picker>    
        <View className='vertical-line' />
        <Input
          className='destination-input'
          placeholder='目的地'
          value={userDestination}
          onInput={handleDestinationChange}
          placeholder-class='home-destination-input'
        />*/}
      </View> 
      <View className='search-second-line'>
        <CustomDateRangePicker onDateChange={handleDateChange} />
      </View>
      <View className='search-button' onClick={onClickSearch}>
        {/* <Button className='search-button'> */}
        <Image src={SearchIcon} className='search-icon' />
        <View>搜索房源</View>
        {/* </Button> */}
      </View>
    </View>
  );
};

export default SearchCard;