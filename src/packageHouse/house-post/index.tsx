import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import Start from './start/index';
import HouseType from './house-type/index';
import HouseAddress from './house-address/index';
import HouseInfo from './house-info/index';
import HouseFacility from './house-facility/index';
import PostImage from './post-image/index';
import Description from './description/index';
import Question from './question/index';
import Interest from './interest/index';
import Tips from './tips/index';
import Agreement from './agreement/index';
import SelectDate from './select-date/index';
import Price from './price/index';
import './index.scss';

const Index = () => {
  const [houseType, setHouseType] = useState<string>('default');
  const [capacity, setCapacity] = useState<number>(1);
  const [gender, setGender] = useState<'male' | 'female' | 'nolimited'>(
    'nolimited',
  );
  const [type, setType] = useState<0 | 1 | 2 | 3>(0);
  const [state, setState] = useState(0);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasWashMachine, setHasWashMachine] = useState(false);
  const [hasBathroom, setHasBathroom] = useState(false);
  const [hasKitchen, setHasKitchen] = useState(false);
  const [hasFreezer, setHasFreezer] = useState(false);
  const [hasAirConditioner, setHasAirConditioner] = useState(false);
  const [hasSofa, setHasSofa] = useState(false);
  const [hasHeat, setHasHeat] = useState(false);
  const [bedroomImages, setBedroomImages] = useState<string[]>([]);
  const [livingroomImages, setLivingroomImages] = useState<string[]>([]);
  const [bathroomImages, setBathdroomImages] = useState<string[]>([]);
  const [otherImages, setOthermages] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [des, setDes] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isQ0, setIsQ0] = useState<boolean>(false);
  const [isQ1, setIsQ1] = useState<boolean>(false);
  const [isQ2, setIsQ2] = useState<boolean>(false);
  const [isQ3, setIsQ3] = useState<boolean>(false);
  const [isQ4, setIsQ4] = useState<boolean>(false);
  const [isQ5, setIsQ5] = useState<boolean>(false);
  const [isQ6, setIsQ6] = useState<boolean>(false);
  const [isQ7, setIsQ7] = useState<boolean>(false);
  const [isQ8, setIsQ8] = useState<boolean>(false);
  const [isQ9, setIsQ9] = useState<boolean>(false);
  const [personlizedQ1, setPersonlizedQ1] = useState<string>('');
  const [personlizedQ2, setPersonlizedQ2] = useState<string>('');
  const [personlizedQ3, setPersonlizedQ3] = useState<string>('');
  const [interest, setInterst] = useState<string[]>([]);
  const [otherInterest, setOtherInterst] = useState<string>('');
  const [tips, setTips] = useState<string>('');
  const [agreement, setAgreement] = useState<string>('');
  const [selectDataList, setSelectDataList] = useState([]);
  const [coin, setCoin] = useState<number>(20);

  const setPersonalizedQ = (index, value) => {
    switch (index) {
      case 1:
        setPersonlizedQ1(value);
        break;
      case 2:
        setPersonlizedQ2(value);
        break;
      case 3:
        setPersonlizedQ3(value);
        break;
    }
  };

  const setQuestion = (index, value) => {
    console.log(index, value);
    switch (index) {
      case 0:
        setIsQ0(value);
        break;
      case 1:
        setIsQ1(value);
        break;
      case 2:
        setIsQ2(value);
        break;
      case 3:
        setIsQ3(value);
        break;
      case 4:
        setIsQ4(value);
        break;
      case 5:
        setIsQ5(value);
        break;
      case 6:
        setIsQ6(value);
        break;
      case 7:
        setIsQ7(value);
        break;
      case 8:
        setIsQ8(value);
        break;
      case 9:
        setIsQ9(value);
        break;
    }
  };
  const onClickHouseType = value => {
    setHouseType(value);
  };

  return (
    <View
      className='house-post'
      style={{ minHeight: '100%', backgroundColor: '#ffffff' }}
    >
      {state == 0 && <Start />}
      {state == 1 && (
        <HouseType houseType={houseType} onClickHouseType={onClickHouseType} />
      )}
      {state == 2 && <HouseAddress />}
      {state == 3 && (
        <HouseInfo
          capacity={capacity}
          gender={gender}
          type={type}
          onClickCapacity={value => {
            setCapacity(value);
          }}
          onClickGender={value => {
            setGender(value);
          }}
          onClickType={value => {
            setType(value);
          }}
        />
      )}
      {state == 4 && (
        <HouseFacility
          hasWifi={hasWifi}
          hasWashMachine={hasWashMachine}
          hasBathroom={hasBathroom}
          hasKitchen={hasKitchen}
          hasFreezer={hasFreezer}
          hasAirConditioner={hasAirConditioner}
          hasSofa={hasSofa}
          hasHeat={hasHeat}
          onClickItem={value => {
            switch (value) {
              case 'wifi':
                setHasWifi(!hasWifi);
                break;
              case 'washmachine':
                setHasWashMachine(!hasWashMachine);
                break;
              case 'bathroom':
                setHasBathroom(!hasBathroom);
                break;
              case 'kitchen':
                setHasKitchen(!hasKitchen);
                break;
              case 'freezer':
                setHasFreezer(!hasFreezer);
                break;
              case 'aircondition':
                setHasAirConditioner(!hasAirConditioner);
                break;
              case 'sofa':
                setHasSofa(!hasSofa);
                break;
              case 'heat':
                setHasHeat(!hasHeat);
                break;
            }
          }}
        />
      )}
      {state == 5 && (
        <PostImage
          onSetImage={(value, imgs) => {
            switch (value) {
              case 'bedroom':
                setBedroomImages(imgs);
                break;
              case 'livingroom':
                setLivingroomImages(imgs);
                break;
              case 'bathroom':
                setBathdroomImages(imgs);
                break;
              case 'others':
                setOthermages(imgs);
                break;
            }
          }}
          bedroomImages={bedroomImages}
          livingroomImages={livingroomImages}
          bathroomImages={bathroomImages}
          otherImages={otherImages}
        />
      )}
      {state == 6 && (
        <Description
          title={title}
          des={des}
          message={message}
          onChangeDes={des => {
            setDes(des);
          }}
          onChangeMessage={message => {
            setMessage(message);
          }}
          onChangeTitle={title => {
            setTitle(title);
          }}
        />
      )}
      {state == 7 && (
        <Question
          onSetQuestion={setQuestion}
          isQ0={isQ0}
          isQ1={isQ1}
          isQ2={isQ2}
          isQ3={isQ3}
          isQ4={isQ4}
          isQ5={isQ5}
          isQ6={isQ6}
          isQ7={isQ7}
          isQ8={isQ8}
          isQ9={isQ9}
          personlizedQ1={personlizedQ1}
          personlizedQ2={personlizedQ2}
          personlizedQ3={personlizedQ3}
          onSetPersonalizedQ={setPersonalizedQ}
        />
      )}
      {state == 8 && (
        <Interest
          interest={interest}
          onChangeInterst={value => {
            setInterst(value);
          }}
          otherInterest={otherInterest}
          onChangeOther={value => {
            setOtherInterst(value);
          }}
        />
      )}
      {state == 9 && (
        <Tips
          tips={tips}
          onChange={value => {
            setTips(value);
          }}
        />
      )}
      {state == 10 && (
        <Agreement
          agreement={agreement}
          onChange={value => {
            setAgreement(value);
          }}
        />
      )}
      {state == 11 && (
        <SelectDate
          selectDataList={selectDataList}
          onChange={value => {
            setSelectDataList(value);
          }}
        />
      )}
      {state == 12 && (
        <Price
          coin={coin}
          onChange={value => {
            setCoin(value);
          }}
        />
      )}

      <View className='bottom-bar'>
        {state == 0 ? (
          <View
            className='bottom-bar-button'
            onClick={() => {
              setState(1);
            }}
          >
            开始
          </View>
        ) : (
          <View className='bottom-bar-next-step'>
            <View
              className='previous'
              onClick={() => {
                setState(state - 1);
              }}
            >
              上一步
            </View>
            <View
              className='next'
              onClick={() => {
                setState(state + 1);
              }}
            >
              下一步
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
export default observer(Index);

// const StepSeven = () => {
//   return (
//     <View className='step-seven'>
//       <View className='title'>您对房客的期待</View>

//       <View className='guest-expectation'>您理想的房客是怎样的</View>
//       <Textarea
//         className='expectation-text-input'
//         value={''}
//         onInput={() => {}}
//         placeholder='请填写回答'
//       />
//       <View className='guest-not-want'>不希望接待怎样的房客</View>
//       <Textarea
//         className='not-want-text-input'
//         value={''}
//         onInput={() => {}}
//         placeholder='请填写回答'
//       />
//     </View>
//   );
// };
