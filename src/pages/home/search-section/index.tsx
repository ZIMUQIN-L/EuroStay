import { Input, View, Text, Picker, Image, Button } from '@tarojs/components';
import './index.scss';
import { useState, createContext, useRef, useEffect } from 'react';
// import RightBottomArrow from '@assets/images/right-bottom-arrow.svg';
// import SearchIcon from '@assets/images/search.svg';
import CustomDateRangePicker from '@components/CustomDateRangePicker';
import { RightBottomArrow, SearchIcon } from '../../../utils/cloudIcons';
import addressData from './addressData';
import {AtList, AtListItem, AtTextarea} from "taro-ui";
//import options from '../../../common/database/world_city/addressJson';
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
const selectorAddress = addressData
const SearchCard = ({ onDestinationChange, onDateChange, onClickSearch }) => {
  // 先只保留欧洲

  
    const [address, setAddress] = useState('请选择地址')
    //三级联动
    const [customArray, setCustomArray] = useState(selectorAddress)
    const [customIndex, setCustomIndex] = useState([0, 0, 0])
    let [onlyArray, setOnlyArray] = useState([[], [], []])
  
    useEffect(() => {
      const data = {
        customArray: customArray,
        customIndex: customIndex,
        onlyArray: onlyArray,
      };
      for (let i = 0; i < data.customArray.length; i++) {
        // @ts-ignore
        data.onlyArray[0].push(customArray[i].name);
      }
      for (let j = 0; j < data.customArray[customIndex[0]].cityList.length; j++) {
        // @ts-ignore
        data.onlyArray[1].push(customArray[customIndex[0]].cityList[j].name);
      }
      for (let k = 0; k < customArray[customIndex[0]].cityList[customIndex[1]].areaList.length; k++) {
        // @ts-ignore
        data.onlyArray[2].push(customArray[customIndex[0]].cityList[customIndex[1]].areaList[k]);
      }
      console.log(data.customArray)
      setCustomArray(data.customArray)
      setCustomIndex(data.customIndex)
      setOnlyArray(data.onlyArray)
    })
  
    //多列选择
    const bindCustomPickerColumnChange = (e) => {
      const newCustomArray = selectorAddress
      const newCustomIndex = customIndex
      const newOnlyArray = onlyArray
  
      newCustomIndex[e.detail.column] = e.detail.value;
      // console.log(e.detail)
      // console.log(onlyArray);
  
      const searchColumn = () => {
        for (let i = 0; i < newCustomArray.length; i++) {
          let arr1 = [];
          let arr2 = [];
          if (i == newCustomIndex[0]) {
            for (let j = 0; j < newCustomArray[i].cityList.length; j++) {
              // @ts-ignore
              arr1.push(newCustomArray[i].cityList[j].name);
              if (j == newCustomIndex[1]) {
                for (let k = 0; k < newCustomArray[i].cityList[j].areaList.length; k++) {
                  // @ts-ignore
                  arr2.push(newCustomArray[i].cityList[j].areaList[k]);
                }
                newOnlyArray[2] = arr2;
              }
            }
            newOnlyArray[1] = arr1;
          }
        };
      }
  
      switch (e.detail.column) {
        case 0:
          newCustomIndex[1] = 0;
          newCustomIndex[2] = 0;
          searchColumn();
          break;
        case 1:
          newCustomIndex[2] = 0;
          searchColumn();
          break;
      }
      setOnlyArray([[],[],[]])
      setCustomIndex(newCustomIndex)
    }

    const addressOnChange = (e) => {
      const indexArr = e.detail.value
      // console.log(customArray[indexArr[0]].cityList[indexArr[1]].areaList[indexArr[2]])
  
      const addressText = `${customArray[indexArr[0]].name}${customArray[indexArr[0]].cityList[indexArr[1]].areaList[indexArr[2]]}`
      setAddress(addressText)
    }

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

  return (
    <View className='search-card'>
      <View className='search-first-line'>    
      <Picker mode='multiSelector' range={onlyArray} onChange={addressOnChange} value={customIndex} onColumnChange={bindCustomPickerColumnChange.bind(this)}>
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
        />
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
