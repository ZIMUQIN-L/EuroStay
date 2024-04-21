import { makeAutoObservable } from "mobx";

class GlobalStore {

  _currentTab: string = "index";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get currentTab() {
    return this._currentTab;
  };

  set currentTab(tab: string) {
    this._currentTab = tab;
  }
}
const globalStoreInstance = new GlobalStore();
export default globalStoreInstance;
export interface IGlobalStore extends GlobalStore {}
