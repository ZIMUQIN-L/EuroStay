import { makeAutoObservable } from 'mobx';
import { ESUserLoginInfoProps } from '@utils/interfaces';
import Taro from '@tarojs/taro';

class GlobalStore {
  _currentTab: string = 'home';
  _userInfo: ESUserLoginInfoProps;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get userInfo() {
    const globalUserInfo: ESUserLoginInfoProps = {
      avatar: this._userInfo.avatar,
      username: this._userInfo.username,
      aboutMe: this._userInfo.aboutMe,
      location: this._userInfo.location,
      token: this._userInfo.token,
      gender: this._userInfo.gender,
      uid: this._userInfo.uid,
      isVip: this._userInfo.isVip
    };
    return globalUserInfo;
  }

  set userInfo(updateUserInfo: ESUserLoginInfoProps) {
    this._userInfo = { ...this._userInfo, ...updateUserInfo };
    Taro.setStorageSync('userInfo', this._userInfo); // 持久化
  }

  setAllInfo(userInfo: ESUserLoginInfoProps) {
    this._userInfo = userInfo;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setToken(newToken: string) {
    this._userInfo.token = newToken;
    Taro.setStorageSync('userInfo', this._userInfo); // 持久化
  }

  setAboutMe(newAboutMe: string) {
    this._userInfo.aboutMe = newAboutMe;
    Taro.setStorageSync('userInfo', this._userInfo); // 持久化
  }

  setUid(newUid: number) {
    this._userInfo.uid = newUid;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setAvatar(newAvatar: string) {
    this._userInfo.avatar = newAvatar;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setUsername(newUsername: string) {
    this._userInfo.username = newUsername;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setLocation(newLocation: string) {
    this._userInfo.location = newLocation;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setGender(newGender: number) {
    this._userInfo.gender = newGender;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setIsVip(newIsVip: boolean) {
    this._userInfo.isVip = newIsVip;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  get currentTab() {
    return this._currentTab;
  }

  set currentTab(tab: string) {
    this._currentTab = tab;
  }
}
const globalStoreInstance = new GlobalStore();
export default globalStoreInstance;
export interface IGlobalStore extends GlobalStore {}
