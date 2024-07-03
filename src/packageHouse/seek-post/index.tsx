import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import './index.scss';
import { loadFontFace, useRouter } from '@tarojs/taro';
import Taro from '@tarojs/taro';
import { UserAccomMessageItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import { accomMessageSearchWithId } from '@common/database/accomMessage/accomMessage';
import SeekInfoSelection from './seek-info-selection';
import SeekDescription from './seek-description';
const Index = () => {
  const router = useRouter();
  const seekInfoId = router?.params?.id;

  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<string | Date>();
  const [endDate, setEndDate] = useState<string | Date>();
  const [capacity, setCapacity] = useState(0);
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (seekInfoId != 'none') {
      accomMessageSearchWithId(seekInfoId).then(
        (accomInfo: UserAccomMessageItemProps) => {
          setLocation(accomInfo.location);
          setStartDate(accomInfo.start_date);
          setEndDate(accomInfo.end_date);
          setDescription(accomInfo.description);
          setCapacity(accomInfo.capacity);
          setGender(accomInfo.gender);
          setContact(accomInfo.contact);
        },
      );
    }
  }, []);

  const handleRequestInfoSelectionEdit = (
    location,
    startDate,
    endDate,
    capacity: number,
    info,
    genderInfo,
  ) => {
    setLocation(location);
    setStartDate(startDate);
    setEndDate(endDate);
    setCapacity(capacity);
    setContact(info);
    setGender(genderInfo);
  };

  const handleSeekDesEdit = editRequestDes => {
    setDescription(editRequestDes);
  };

  const handleClickSeekSubmit = () => {
    //@PJ TODO
  };

  return (
    <View className='seek-post-index'>
      <SeekInfoSelection
        seekInfoId={seekInfoId}
        onSeekInfoSelection={handleRequestInfoSelectionEdit}
      />
      <SeekDescription
        seekPrevDes={description}
        onChangeDes={handleSeekDesEdit}
      ></SeekDescription>
      <View style={{ backgroundColor: 'white' }}>
        <View className='post-submit-button' onClick={handleClickSeekSubmit}>
          <Text>发布求宿</Text>
          {/* // to be changed @PJ  */}
        </View>
      </View>
    </View>
  );
};

export default observer(Index);
