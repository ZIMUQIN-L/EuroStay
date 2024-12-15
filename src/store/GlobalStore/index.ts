import { makeAutoObservable } from 'mobx';
import { UserItemProps } from '@utils/interfaces';
class GlobalStore {
  _currentTab: string = 'home';
  _userInfo: UserItemProps;

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
      token: this._userInfo.token
    };
    return globalUserInfo;
  }

  set userInfo(updateUserInfo: UserItemProps) {
    this._userInfo = updateUserInfo;
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
