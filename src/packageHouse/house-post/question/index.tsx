import { View, Text, Image, Textarea } from '@tarojs/components';
import { useState, useEffect, useCallback, useRef } from 'react';
import { KeyArrowLeft } from '@utils/cloudIcons';
import Popup from '.././popup';
interface IProps {
  // isQ1: boolean;
  isQ1: boolean;
  isQ2: boolean;
  isQ3: boolean;
  isQ4: boolean;
  isQ5: boolean;
  isQ6: boolean;
  isQ7: boolean;
  isQ8: boolean;
  isQ9: boolean;
  isQ0: boolean;
  personlizedQ1: string;
  personlizedQ2: string;
  personlizedQ3: string;
  onSetPersonalizedQ: (_, _) => void;
  onSetQuestion: (_, _) => void;
}

export default (props: IProps) => {
  const [isShowSelectPopup, setIsShowSelectPopup] = useState(false);
  const [isShowPersonalizedPopup, setIsShowPersonalizedPopup] = useState(false);
  const getIfSelect = useCallback(() => {
    let count = 0;
    props.isQ0 && count++;
    props.isQ1 && count++;
    props.isQ2 && count++;
    props.isQ3 && count++;
    props.isQ4 && count++;
    props.isQ5 && count++;
    props.isQ6 && count++;
    props.isQ7 && count++;
    props.isQ8 && count++;
    props.isQ9 && count++;
    return count < 3;
  }, [
    props.isQ0,
    props.isQ1,
    props.isQ2,
    props.isQ3,
    props.isQ4,
    props.isQ5,
    props.isQ6,
    props.isQ7,
    props.isQ8,
    props.isQ9,
  ]);
  // const [isShow]
  const questionGroups = [
    {
      title: '与旅行相关的问题',
      list: [
        { value: '是什么契机让你踏上这次旅行？', index: 0 },
        { value: '本次旅途中，你最期待体验或感受什么？', index: 1 },
        { value: '请用一两句话描述你在旅途中的“必做清单”', index: 2 },
        { value: '简单描述一下你的旅行计划？', index: 3 },
        { value: '你曾有过类似的旅行借宿体验吗？', index: 4 },
      ],
    },
    {
      title: '与您和您的房间相关的问题',
      list: [
        { value: '如果我们有机会交流，你最感兴趣的话题是？', index: 5 },
        { value: '你喜欢的交流方式？', index: 6 },
        { value: '你为什么选择我的小屋作为你的目的地？', index: 7 },
        { value: '你希望在我的小屋度过怎样的一天？', index: 8 },
        { value: '你对房间内的哪些设施最感兴趣或最需要？', index: 9 },
      ],
    },
  ];

  return (
    <View className='question'>
      {isShowSelectPopup && (
        <Popup
          onClickClose={() => {
            setIsShowSelectPopup(false);
          }}
          onClickConfirm={() => {
            setIsShowSelectPopup(false);
          }}
          title={'选择您感兴趣的问题'}
          content={
            <>
              <View className='content-title'>
                您最多可以选择3个问题，至少选择1个
              </View>
              <View className='question-groups'>
                <View className='group-title'>与旅行相关的问题</View>
                <View
                  className={`group-item ${props.isQ0 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ0 && props.onSetQuestion(0, false);
                    !props.isQ0 &&
                      getIfSelect() &&
                      props.onSetQuestion(0, true);
                  }}
                >
                  是什么契机让你踏上这次旅行？
                </View>
                <View
                  className={`group-item ${props.isQ1 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ1 && props.onSetQuestion(1, false);
                    !props.isQ1 &&
                      getIfSelect() &&
                      props.onSetQuestion(1, true);
                  }}
                >
                  本次旅途中，你最期待体验或感受什么？
                </View>
                <View
                  className={`group-item ${props.isQ2 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ2 && props.onSetQuestion(2, false);
                    !props.isQ2 &&
                      getIfSelect() &&
                      props.onSetQuestion(2, true);
                  }}
                >
                  请用一两句话描述你在旅途中的“必做清单”
                </View>
                <View
                  className={`group-item ${props.isQ3 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ3 && props.onSetQuestion(3, false);
                    !props.isQ3 &&
                      getIfSelect() &&
                      props.onSetQuestion(3, true);
                  }}
                >
                  简单描述一下你的旅行计划？
                </View>
                <View
                  className={`group-item ${props.isQ4 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ4 && props.onSetQuestion(4, false);
                    !props.isQ4 &&
                      getIfSelect() &&
                      props.onSetQuestion(4, true);
                  }}
                >
                  你曾有过类似的旅行借宿体验吗？
                </View>
                <View className='group-title'>与您和您的房间相关的问题</View>
                <View
                  className={`group-item ${props.isQ5 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ5 && props.onSetQuestion(5, false);
                    !props.isQ5 &&
                      getIfSelect() &&
                      props.onSetQuestion(5, true);
                  }}
                >
                  如果我们有机会交流，你最感兴趣的话题是？
                </View>
                <View
                  className={`group-item ${props.isQ6 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ6 && props.onSetQuestion(6, false);
                    !props.isQ6 &&
                      getIfSelect() &&
                      props.onSetQuestion(6, true);
                  }}
                >
                  你喜欢的交流方式？
                </View>
                <View
                  className={`group-item ${props.isQ7 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ7 && props.onSetQuestion(7, false);
                    !props.isQ7 &&
                      getIfSelect() &&
                      props.onSetQuestion(7, true);
                  }}
                >
                  你为什么选择我的小屋作为你的目的地？
                </View>
                <View
                  className={`group-item ${props.isQ8 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ8 && props.onSetQuestion(8, false);
                    !props.isQ8 &&
                      getIfSelect() &&
                      props.onSetQuestion(8, true);
                  }}
                >
                  你希望在我的小屋度过怎样的一天？
                </View>
                <View
                  className={`group-item ${props.isQ9 ? 'active' : ''}`}
                  onClick={() => {
                    props.isQ9 && props.onSetQuestion(9, false);
                    !props.isQ9 &&
                      getIfSelect() &&
                      props.onSetQuestion(9, true);
                  }}
                >
                  你对房间内的哪些设施最感兴趣或最需要？
                </View>
              </View>
            </>
          }
        />
      )}
      {isShowPersonalizedPopup && (
        <Popup
          onClickClose={() => {
            setIsShowPersonalizedPopup(false);
          }}
          onClickConfirm={() => {
            setIsShowPersonalizedPopup(false);
          }}
          title={'添加定制化问题'}
          content={
            <>
              <View className='content-title'>您最多可以添加3个问题</View>
              <View className='personalized-question-groups'>
                <View className='group-item'>
                  <Textarea
                    className='question1'
                    value={props.personlizedQ1}
                    onInput={value => {
                      props.onSetPersonalizedQ(1, value.detail.value);
                    }}
                  />
                  <View className='question-limit'>
                    {props.personlizedQ1.length}/50
                  </View>
                </View>
                <View className='group-item'>
                  <Textarea
                    className='question2'
                    value={props.personlizedQ2}
                    onInput={value => {
                      props.onSetPersonalizedQ(2, value.detail.value);
                    }}
                  />
                  <View className='question-limit'>
                    {props.personlizedQ1.length}/50
                  </View>
                </View>
                <View className='group-item'>
                  <Textarea
                    className='question3'
                    value={props.personlizedQ3}
                    onInput={value => {
                      props.onSetPersonalizedQ(1, value.detail.value);
                    }}
                  />
                  <View className='question-limit'>
                    {props.personlizedQ1.length}/50
                  </View>
                </View>
                {/* <Textarea
                  className='question-1'
                  value={''}
                  onInput={() => {}}
                  placeholder=''
                />
                <Textarea
                  className='question-2'
                  value={''}
                  onInput={() => {}}
                  placeholder=''
                />
                <Textarea
                  className='question-3'
                  value={''}
                  onInput={() => {}}
                  placeholder=''
                /> */}
              </View>
            </>
          }
        />
      )}

      <View className='question-title'>您对房客的期待</View>
      <View className='question-des'>您想对预定房间的房客问什么问题？</View>
      <View
        className='question-select'
        onClick={() => {
          setIsShowSelectPopup(true);
        }}
      >
        选择你感兴趣的问题吧
        <Image src={KeyArrowLeft} className='arrow-left' />
      </View>
      <View
        className='question-personalized'
        onClick={() => {
          setIsShowPersonalizedPopup(true);
        }}
      >
        添加你的定制化问题吧
        <Image src={KeyArrowLeft} className='arrow-left' />
      </View>
    </View>
  );
};
