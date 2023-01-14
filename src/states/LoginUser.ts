import { makeAutoObservable } from "mobx";
import User from "../vos/User";

class LoginUser {
  private userVo: User | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get = () => {
    return this.userVo;
  };

  set = (userVo: User) => {
    this.userVo = userVo;
  };

  clear = () => {
    this.userVo = undefined;
  };
}

const loginUser = new LoginUser();

const useLoginUser = () => {
  return loginUser;
};

export default useLoginUser;
