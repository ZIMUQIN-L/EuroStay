import { makeAutoObservable } from 'mobx';
import { UserItemProps } from '@utils/interfaces';
import Taro from '@tarojs/taro';

class GlobalStore {
  _currentTab: string = 'home';
  _userInfo: UserItemProps;
  searchStartDate: string;
  searchEndDate: string;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get userInfo() {
    const globalUserInfo: UserItemProps = {
      _id: this._userInfo._id,
      _openid: this._userInfo._openid,
      avatarUrl: this._userInfo.avatarUrl,
      nickName: this._userInfo.nickName,
      userDes: this._userInfo.userDes,
      userOpenid: this._userInfo.userOpenid,
      userLocation: this._userInfo.userLocation,
      token: this._userInfo.token,
      uid: this._userInfo.uid,
    };
    return globalUserInfo;
  }

  set userInfo(updateUserInfo: UserItemProps) {
    this._userInfo = { ...this._userInfo, ...updateUserInfo };
    Taro.setStorageSync('userInfo', this._userInfo); // 持久化
  }

  set setStartDate(searchStartDate: string) {
    this.searchStartDate = searchStartDate;
    Taro.setStorageSync('searchStartDate', this.searchStartDate); // 持久化
  }
  set setEndDate(endDate: string) {
    this.searchEndDate = endDate;
    Taro.setStorageSync('searchEndDate', this.searchEndDate); // 持久化
  }

  setToken(newToken: string) {
    this._userInfo.token = newToken;
    Taro.setStorageSync('userInfo', this._userInfo); // 持久化
  }

  setUid(newUid: string) {
    this._userInfo.uid = newUid;
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
