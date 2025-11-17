import { makeAutoObservable } from "mobx"
import UserVo from "../../application/dto/vos/responses/UserVo"

export class LoginUser {
  private userVo: UserVo | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  get = () => {
    return this.userVo
  }

  set = (userVo: UserVo) => {
    this.userVo = userVo
  }

  clear = () => {
    this.userVo = undefined
  }
}

const loginUser = new LoginUser()

const useLoginUser = () => {
  return loginUser
}

export default useLoginUser
