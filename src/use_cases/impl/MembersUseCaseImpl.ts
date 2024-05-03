import MembersUseCase from "../MembersUseCase"
import MembersRepository from "../../repositories/MembersRepository"
import credentials from "../../states/Credentials"
import { LoginUser } from "../../states/LoginUser"
import UserVo from "../../vos/UserVo"
import BaseUseCase from "./BaseUseCase"

class MembersUseCaseImpl extends BaseUseCase implements MembersUseCase {
  private readonly repository: MembersRepository

  constructor(repository: MembersRepository, loginUser: LoginUser) {
    super(loginUser)
    this.repository = repository
  }

  logout = async () => {
    try {
      await this.repository.logout()
    } catch (e) {
      console.error(e)
    }
    credentials.removeToken()
    credentials.removeWorkspaceId()
    this.loginUser.clear()
  }

  isLoggedIn = async () => {
    try {
      if (!credentials.hasToken()) {
        return false
      }
      const user = await this.repository.status()
      if (!user) {
        return false
      }
      this.updateCredential(user)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
}

export default MembersUseCaseImpl
