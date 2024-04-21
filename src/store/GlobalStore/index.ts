import { makeAutoObservable } from "mobx";

class GlobalStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
export default new GlobalStore();
export interface IGlobalStore extends GlobalStore {}
