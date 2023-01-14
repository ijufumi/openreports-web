import { makeAutoObservable } from "mobx";
import UserVo from "../vos/UserVo";

class LoginUser {
  private userVo: UserVo | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get = () => {
    return this.userVo;
  };

  set = (userVo: UserVo) => {
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
