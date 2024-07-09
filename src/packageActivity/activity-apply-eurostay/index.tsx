import {
  View,
  Text,
  Image,
  Button,
  Input,
  Textarea,
  Switch,
} from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import { useEffect, useState } from 'react';
import { useRouter } from '@tarojs/taro';
import { userInfoSearch } from '@common/database/user/user';
import { activityDetailSearch } from '@common/database/activityInfo/activityInfo';
import {
  ActivityInfoItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import {
    pointDetailInfoAdd,
    pointDecrease
  } from '@common/database/pointSystem/pointSystem';
import CopyHostInfoModal from '../activity-application/copy-host-info-modal';
import GlobalStore from '@store/GlobalStore';
import ActivityDetailSection from '../activity-application/activity-detail-section';
import { StarOutlined } from '@taroify/icons';
import { LocationSelectionIcon, RightBottomArrow } from '@utils/cloudIcons';
import { activityApplicationAdd, eurostayActApply } from '@common/database/activityInfo/activityInfo';
import { formatTimestamp } from '@utils/dateUtil';

const ActicityApplicationPage = () => {
  const router = useRouter();
  const activityId = router?.params?.id;

  const [activity, setActivity] = useState<ActivityInfoItemProps>();
  const [currentUser, setCurrentUser] = useState<UserDetailInfoItemProps>();
  const [activityHost, setActivityHost] = useState<UserDetailInfoItemProps>();

  const [isShowSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const curUser = GlobalStore.userInfo;
    userInfoSearch(curUser._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setCurrentUser(ownerInfo[0]);
      },
    );
    activityDetailSearch(activityId).then((res: ActivityInfoItemProps) => {
      setActivity(res);
      userInfoSearch(res._openid).then(
        (userInfoRes: UserDetailInfoItemProps[]) => {
          setActivityHost(userInfoRes[0]);
        },
      );
    });
  }, []);

  const handleCloseAllWindows = () => {
    setShowSuccessModal(false);
    Taro.navigateBack({
        delta: 2,
      });
  };

  const showSuccessModalEdit = () => {
    setShowSuccessModal(true);
  };

  const [appName, setAppName] = useState('');
  const [appGender, setAppGender] = useState('');
  const [appAge, setAppAge] = useState(0);
  const [appWechat, setAppWechat] = useState('');
  const [appSocialMedia, setAppSocialMedia] = useState('');
  const [appLanguages, setAppLanguages] = useState('');
  const [appFrom, setAppFrom] = useState('');
  const [appMajor, setAppMajor] = useState('');
  const [appSkills, setAppSkills] = useState('');
  const [appMbti, setAppMbti] = useState('');
  const [appWhy, setAppWhy] = useState('');
  const [appReason, setAppReason] = useState('');
  const [appExp, setAppExp] = useState('');
  const [appShow, setAppShow] = useState(true);
  const [appPub, setAppPub] = useState(true);
  const [appQuestion, setAppQuestion] = useState('');

  const handleGetHostInfoClick = () => {
    if (currentUser && activity && currentUser?.point <= activity?.point) {
        Taro.showModal({
            title: '积分不足',
            content: '当前积分不足，前往积分页面查看积分获取规则~',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({
                    url: `/packageUser/my-points/index`,
                  });
              } 
            }
          })
      }
      else if (
      appName == '' ||
      appGender == '' ||
      appAge == 0 ||
      appWechat == '' ||
      appSocialMedia == '' ||
      appLanguages == '' ||
      appFrom == '' ||
      appMajor == '' ||
      appSkills == '' ||
      appMbti == '' ||
      appWhy == '' ||
      appReason == '' ||
      appExp == ''
    ) {
      Taro.showToast({
        title: '请完整填写信息',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else {
      const answer = {
        姓名: appName,
        性别: appGender,
        年龄: appAge,
        微信号: appWechat,
        社交媒体账号: appSocialMedia,
        语言: appLanguages,
        出发地: appFrom,
        职业专业: appMajor,
        特殊技能: appSkills,
        mbti: appMbti,
        报名理由: appWhy,
        选择理由: appReason,
        有趣经历: appExp,
        真人: appShow,
        发帖: appPub,
        问题: appQuestion,
      };
      Taro.showLoading({
        title: '申请中',
        mask: true,
      });
      activityApplicationAdd(
        activityId,
        activityHost?._openid,
        appWhy,
        appWechat,
        currentUser?.avatarUrl,
        currentUser?.nickName,
      ).then(res => {
        pointDecrease(currentUser?._id, activity?.point);
        const timestamp = formatTimestamp(new Date().valueOf());
        pointDetailInfoAdd(
          currentUser?._openid,
          timestamp,
          4,
          '参加活动消耗',
          -(activity? activity?.point:0),
          (currentUser ? currentUser?.point : 0) - (activity? activity?.point:0),
        ).then(res1 => {
            eurostayActApply(activity?.title, activity?._id, answer).then(res2=> {
                Taro.hideLoading();
                showSuccessModalEdit();
            })
        });
      });
      
    }
  };

  return (
    <View className='activity-application-page'>
      <ActivityDetailSection
        title={activity?.title}
        imageUrls={activity?.images}
        dateInfo={activity?.startTime}
        timeInfo={activity?.endTime}
        organizer={activityHost?.nickName}
        location={activity?.location}
        hostOpenid={activity?._openid}
      />

      <View className='activity-app-info-eurostay'>
        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              姓名 <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View className='des-text-container'>
              <View className='des-text'>
                <Input
                  value={appName}
                  style={{ color: '#979797' }}
                  onInput={e => setAppName(e.detail.value)}
                  placeholder='请填写自己的姓名'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              认知性别 <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View
              className='des-text-container'
              //   style={{ minHeight: '80px' }}
            >
              <View className='des-text'>
                <Input
                  value={appGender}
                  style={{ color: '#979797' }}
                  onInput={e => setAppGender(e.detail.value)}
                  placeholder='请填写自己的认知性别'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              年龄 <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View
              className='des-text-container'
              //   style={{ minHeight: '80px' }}
            >
              <View className='des-text'>
                <Input
                  type='number'
                  value={appAge != 0 ? String(appAge) : ''}
                  style={{ color: '#979797' }}
                  onInput={e => setAppAge(Number(e.detail.value))}
                  placeholder='请填写自己的年龄'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              您的微信号 <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View
              className='des-text-container'
              //   style={{ minHeight: '80px' }}
            >
              <View className='des-text'>
                <Input
                  value={appWechat}
                  style={{ color: '#979797' }}
                  onInput={e => setAppWechat(e.detail.value)}
                  placeholder='请填写自己的微信号'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              您的社交媒体账号 <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View
              className='des-text-container'
              //   style={{ minHeight: '80px' }}
            >
              <View className='des-text'>
                <Input
                  value={appSocialMedia}
                  style={{ color: '#979797' }}
                  onInput={e => setAppSocialMedia(e.detail.value)}
                  placeholder='请填写自己的社交媒体账号'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              您会的语言有哪些？ <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View
              className='des-text-container'
              //   style={{ minHeight: '80px' }}
            >
              <View className='des-text'>
                <Input
                  value={appLanguages}
                  style={{ color: '#979797' }}
                  onInput={e => setAppLanguages(e.detail.value)}
                  placeholder='请填写自己会的语言~'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              您将从哪里出发？（国家+地区）{' '}
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View
              className='des-text-container'
              //   style={{ minHeight: '80px' }}
            >
              <View className='des-text'>
                <Input
                  value={appFrom}
                  style={{ color: '#979797' }}
                  onInput={e => setAppFrom(e.detail.value)}
                  placeholder='请填写自己的出发地'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              您的职业或专业是？ <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View
              className='des-text-container'
              //   style={{ minHeight: '80px' }}
            >
              <View className='des-text'>
                <Input
                  value={appMajor}
                  style={{ color: '#979797' }}
                  onInput={e => setAppMajor(e.detail.value)}
                  placeholder='请填写自己的职业/专业'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              您有什么特殊技能吗？（摄影？烹饪？调酒品酒？做饭？开车？写代码？画画？越多越好！）{' '}
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View className='des-text-container' style={{ minHeight: '60px' }}>
              <View className='des-text'>
                <Textarea
                  value={appSkills}
                  style={{ color: '#979797' }}
                  onInput={e => setAppSkills(e.detail.value)}
                  placeholder='请填写自己的技能'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              您的mbti，举一个你觉得自己最符合的例子吧{' '}
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View className='des-text-container' style={{ minHeight: '60px' }}>
              <View className='des-text'>
                <Textarea
                  value={appMbti}
                  style={{ color: '#979797' }}
                  onInput={e => setAppMbti(e.detail.value)}
                  placeholder='请填写自己的Mbti'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              为什么想来报名这个活动？您期待在活动中收获什么呢？{' '}
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View className='des-text-container' style={{ minHeight: '60px' }}>
              <View className='des-text'>
                <Textarea
                  value={appWhy}
                  style={{ color: '#979797' }}
                  onInput={e => setAppWhy(e.detail.value)}
                  placeholder='请填写自己的报名理由'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              给我们一个非你不可的理由吧 <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View className='des-text-container' style={{ minHeight: '60px' }}>
              <View className='des-text'>
                <Textarea
                  value={appReason}
                  style={{ color: '#979797' }}
                  onInput={e => setAppReason(e.detail.value)}
                  placeholder='给我们一个非你不可的理由吧'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>
              您有没有什么跟沙发客相关的有趣经历呢？{' '}
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View className='des-text-container' style={{ minHeight: '60px' }}>
              <View className='des-text'>
                <Textarea
                  value={appExp}
                  style={{ color: '#979797' }}
                  onInput={e => setAppExp(e.detail.value)}
                  placeholder='请填写自己的经历吧'
                />
              </View>
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='switch-container'>
            <Text className='switch-title'>
              您是否愿意真人出镜呢？（我们会后期美颜的！）{' '}
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View className='switch-style'>
              <Switch
                checked={appShow}
                type='checkbox'
                color='#FFD111'
                onChange={e => {
                  setAppShow(e.detail.value);
                }}
              />
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='switch-container'>
            <Text className='switch-title'>
              您是否愿意发帖帮忙宣传呢～ <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View className='switch-style'>
              <Switch
                checked={appPub}
                type='checkbox'
                color='#FFD111'
                onChange={e => {
                  setAppPub(e.detail.value);
                }}
              />
            </View>
          </View>
        </View>

        <View className='des-part'>
          <View className='des-container'>
            <Text className='des-title'>您有什么想问eurostay的？ </Text>
            <View className='des-text-container' style={{ minHeight: '60px' }}>
              <View className='des-text'>
                <Textarea
                  value={appQuestion}
                  style={{ color: '#979797' }}
                  onInput={e => setAppQuestion(e.detail.value)}
                  placeholder='请填写自己的问题吧'
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className='eurostay-contact-container'>
        <View className='price-info'>
          <Text className='price'>
            {activity?.price} 欧，{activity?.point} 积分
          </Text>
          <Text className='participants'>预估人数 {activity?.capacity}人</Text>
        </View>
        <View className='right-section'>
          {/* <View className='icon-container'>
            <StarOutlined className='icon' />
          </View> */}
          <Button className='contact-button' onClick={handleGetHostInfoClick}>
            发送
          </Button>
        </View>
      </View>
      {isShowSuccessModal && (
        <CopyHostInfoModal
          onClose={handleCloseAllWindows}
          activity={activity}
          hostInfo={activityHost}
        ></CopyHostInfoModal>
      )}
    </View>
  );
};

export default ActicityApplicationPage;
