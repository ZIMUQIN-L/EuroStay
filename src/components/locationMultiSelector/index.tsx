import { View, Picker } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { useState, useEffect } from 'react';
import addressData from './addressData';
interface MultiSelectorProps {
  onAddressChange: (address: string) => void;
}
import './index.scss';

const LocationMultiSelector = ({ onAddressChange }: MultiSelectorProps) => {
  const [address, setAddress] = useState('点击选择地址');
  const [customArray, setCustomArray] = useState(addressData);
  const [customIndex, setCustomIndex] = useState([0, 0, 0]);
  let [onlyArray, setOnlyArray] = useState([[], [], []]);

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
    for (
      let k = 0;
      k < customArray[customIndex[0]].cityList[customIndex[1]].areaList.length;
      k++
    ) {
      // @ts-ignore
      data.onlyArray[2].push(
        customArray[customIndex[0]].cityList[customIndex[1]].areaList[k],
      );
    }
    setCustomArray(data.customArray);
    setCustomIndex(data.customIndex);
    setOnlyArray(data.onlyArray);
  });

  //多列选择
  const bindCustomPickerColumnChange = e => {
    const newCustomArray = addressData;
    const newCustomIndex = customIndex;
    const newOnlyArray = onlyArray;

    newCustomIndex[e.detail.column] = e.detail.value;

    const searchColumn = () => {
      for (let i = 0; i < newCustomArray.length; i++) {
        let arr1 = [];
        let arr2 = [];
        if (i == newCustomIndex[0]) {
          for (let j = 0; j < newCustomArray[i].cityList.length; j++) {
            // @ts-ignore
            arr1.push(newCustomArray[i].cityList[j].name);
            if (j == newCustomIndex[1]) {
              for (
                let k = 0;
                k < newCustomArray[i].cityList[j].areaList.length;
                k++
              ) {
                // @ts-ignore
                arr2.push(newCustomArray[i].cityList[j].areaList[k]);
              }
              newOnlyArray[2] = arr2;
            }
          }
          newOnlyArray[1] = arr1;
        }
      }
    };

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

    setOnlyArray([[], [], []]);
    setCustomIndex(newCustomIndex);
  };

  const addressOnChange = e => {
    const indexArr = e.detail.value;

    const addressText = `${customArray[indexArr[0]].cityList[indexArr[1]].name}${customArray[indexArr[0]].cityList[indexArr[1]].areaList[indexArr[2]]}`;
    setAddress(addressText);
    onAddressChange(addressText);
  };

  return (
    <View
      className={`information-pages ${address == '点击选择地址' ? '' : 'active'}`}
    >
      <Picker
        mode='multiSelector'
        range={onlyArray}
        onChange={addressOnChange}
        value={customIndex}
        onColumnChange={bindCustomPickerColumnChange.bind(this)}
      >
        <AtList>
          <AtListItem extraText={address}></AtListItem>
        </AtList>
      </Picker>
    </View>
  );
};

export default LocationMultiSelector;
