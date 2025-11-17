import MembersUseCase from "../ports/MembersUseCase"
import MembersRepository from "../../domain/repositories/MembersRepository"
import credentials from "../../infrastructure/state/Credentials"
import { LoginUser } from "../../infrastructure/state/LoginUser"
import BaseUseCase from "./BaseUseCase"
import UpdateMemberVo from "../dto/vos/requests/UpdateMemberVo"

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
    credentials.removeRefreshToken()
    this.loginUser?.clear()
  }

  isLoggedIn = async () => {
    try {
      if (!credentials.hasToken()) {
        return false
      }
      let user = await this.repository.status()
      if (!!!user) {
        if (credentials.hasRefreshToken()) {
          await this.repository.accessToken()
          user = await this.repository.status()
        }
        if (!!!user) {
          return false
        }
      }
      this.updateCredential(user)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  update = async (args: UpdateMemberVo) => {
    try {
      this.startLoader()
      return this.repository.update(args)
    } catch (e) {
      console.error(e)
      return undefined
    } finally {
      this.stopLoader()
    }
  }

  user = async () => {
    if (await this.isLoggedIn()) {
      return this.loginUser?.get()
    }
    return undefined
  }
}

export default MembersUseCaseImpl
