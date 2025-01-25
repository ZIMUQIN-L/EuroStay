import BoardGame from '@assets/images/board-game.svg';
import KTV from '@assets/images/ktv.svg';
import Cooking from '@assets/images/cooking.svg';
import Movies from '@assets/images/movies.svg';
import Hiking from '@assets/images/hiking.svg';
import Chat from '@assets/images/chat.svg';
import Skills from '@assets/images/skills.svg';
import HandMaking from '@assets/images/handmaking.svg';
import Visit from '@assets/images/vist.svg';
import Others from '@assets/images/others.svg';
import { View, Text, Image, Textarea } from '@tarojs/components';
import { useState, useEffect, useCallback, useRef } from 'react';
import Popup from '.././popup';

interface IProps {
  interest: string[];
  onChangeInterst: (_) => void;
  otherInterest: string;
  onChangeOther: (_) => void;
}

export default (props: IProps) => {
  const [isShowmPopup, setIsShowPopup] = useState(false);
  const [otherInterest, setOther] = useState<string>(props.otherInterest);
  const interestMap = [
    { name: '玩桌游', value: 'board-games', pic: BoardGame },
    { name: '做饭', value: 'cooking', pic: Cooking },
    { name: '看电影', value: 'movies', pic: Movies },
    { name: '徒步', value: 'hiking', pic: Hiking },
    { name: '唱K', value: 'karaok', pic: KTV },
    { name: '聊天', value: 'chat', pic: Chat },
    { name: '学习新技能', value: 'new-skills', pic: Skills },
    { name: '参观景点', value: 'scene-visiting', pic: Visit },
    { name: '手工创作', value: 'handmaking', pic: HandMaking },
    { name: '其他', value: 'others', pic: Others },
  ];
  const isContains = useCallback(
    value => {
      return props.interest.includes(value);
    },
    [props.interest.length],
  );
  return (
    <View className='interest'>
      {isShowmPopup && (
        <Popup
          onClickClose={() => {
            setIsShowPopup(false);
            setOther('');
          }}
          onClickConfirm={() => {
            props.onChangeOther(otherInterest);
            setIsShowPopup(false);
          }}
          title={'新建其他'}
          content={
            <>
              <View className='content-title'>添加您想与房客一起做的事</View>
              <View className='interest-input-wrapper'>
                <Textarea
                  className='interest-input'
                  value={otherInterest}
                  onInput={value => {
                    setOther(value.detail.value);
                  }}
                />
                <View className='text-limit'>{props.interest.length}/6</View>
              </View>
            </>
          }
        />
      )}
      <View className='interest-title'>想与房客一起做什么？</View>
      <View className='interest-des'>让房客了解您的兴趣，一起互动吧！</View>
      <View className={`interest-wrap`}>
        {interestMap.map(item => {
          return (
            <View
              className={`interest-item ${isContains(item.value) ? 'active' : ''}`}
              onClick={() => {
                console.log(isContains(item.value));
                if (isContains(item.value)) {
                  const updated = props.interest.filter(
                    value => value !== item.value,
                  );
                  props.onChangeInterst(updated);
                } else {
                  props.onChangeInterst([item.value, ...props.interest]);
                }
                if (item.value == 'others') {
                  setIsShowPopup(true);
                }
              }}
            >
              <Image src={item.pic} className='interest-pic'></Image>
              <View className='interest-name'>{item.name}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
