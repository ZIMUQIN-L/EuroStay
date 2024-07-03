import { useState, useEffect } from 'react';
import SearchCard from '../search-section';
import './index.scss';
import { View } from '@tarojs/components';
import { UserAccomMessageItemProps } from '@utils/interfaces';
import Taro, { useReachBottom } from '@tarojs/taro';
import DefaultAvatar from '@assets/images/default-avatar.png';
import SeekingCard from '../seeking-item';
import CustomTabBar from '@components/CustomTabBar';
import { accomPageMessageSearch } from '@common/database/accomMessage/accomMessage';
import SeekReplyBoard from '@components/SeekContactInfoBoard';
import MsgInfoBoard from '@components/MsgInfoBoard';

/**
 * 求宿页面
 */
const SeekingAccommodation = () => {
  Taro.useShareAppMessage(() => {
    return {
      title: 'EuroStay欧洲换宿',
      path: `/pages/index/index`,
    };
  });
  const [infoBoardIsShown, setInfoBoardIsShown] = useState(false);
  const [contactInfoIsShown, setContactInfoIsShown] = useState(false);

  const [userDestination, setUserDestination] = useState<string>('');

  const handleDestinationChange = inputDestination => {
    setUserDestination(inputDestination);
  };

  const [userStartDate, setUserStartDate] = useState<Date>();
  const [userEndDate, setUserEndDate] = useState<Date>();
  const [isClickedSearch, setIsClickedSearch] = useState<Boolean>(false);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setUserStartDate(startDate);
    setUserEndDate(endDate);
  };

  const handleClickSearch = () => {
    accomPageMessageSearch(userDestination, userStartDate, userEndDate).then(
      (seekingAccomData: UserAccomMessageItemProps[]) => {
        setSeekingData(seekingAccomData);
      },
    );
    setIsClickedSearch(true);
  };

  const fetchInitialData = () => {
    accomPageMessageSearch('', '', '').then(
      (seekingAccomData: UserAccomMessageItemProps[]) => {
        setSeekingData(seekingAccomData);
      },
    );
  };

  const [selectedInfoId, setSelectedInfoId] = useState();
  const [selectedAccomInfo, setSelectedAccomInfo] =
    useState<UserAccomMessageItemProps>();
  const handleUserClickButton = accomInfo => {
    setSelectedAccomInfo(accomInfo);
    setInfoBoardIsShown(true);
  };

  const handleCloseAllBoards = () => {
    setContactInfoIsShown(false);
    setInfoBoardIsShown(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const [seekingData, setSeekingData] = useState<UserAccomMessageItemProps[]>(
    [],
  );

  const handleUserSubmitContactInfo = () => {
    // TODO: logic change @PJ
    console.log('do sth PJ');
  };

  const handleUserRejectMsg = () => {
    setInfoBoardIsShown(false);
  };

  const handleUserAcceptMsg = () => {
    if (infoBoardIsShown == true) {
      setInfoBoardIsShown(false);
      setContactInfoIsShown(true);
    }
  };

  // 样式可以直接用房源页面的
  return (
    <View className='home' id='home'>
      <SearchCard
        onDestinationChange={handleDestinationChange}
        onDateChange={handleDateChange}
        onClickSearch={handleClickSearch}
        searchType='accomadation'
      />
      <View className='house-list'>
        {seekingData.length > 0 &&
          seekingData.map(item => (
            <SeekingCard
              key={item._id}
              seekingItem={item}
              onClick={() => {
                handleUserClickButton(item);
              }}
            />
          ))}
      </View>
      {infoBoardIsShown && (
        <MsgInfoBoard
          userAccomMessage={selectedAccomInfo}
          onClose={handleCloseAllBoards}
          onSubmit={handleUserAcceptMsg}
          onReject={handleUserRejectMsg}
        />
      )}
      {contactInfoIsShown && (
        <SeekReplyBoard
          onClose={handleCloseAllBoards}
          retrivedData={null}
          editable={true}
          onUpdateData={handleUserSubmitContactInfo}
        ></SeekReplyBoard>
      )}
      <CustomTabBar />
    </View>
  );
};

export default SeekingAccommodation;
