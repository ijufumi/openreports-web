import LoginUseCase from "../ports/LoginUseCase"
import LoginRepository from "../../domain/repositories/LoginRepository"
import Credentials from "../../infrastructure/state/Credentials"
import UserVo from "../dto/vos/responses/UserVo"
import BaseUseCase from "./BaseUseCase"
import { LoginUser } from "../../infrastructure/state/LoginUser"

class LoginUseCaseImpl extends BaseUseCase implements LoginUseCase {
  private readonly repository: LoginRepository

  constructor(repository: LoginRepository, loginUser: LoginUser) {
    super(loginUser)
    this.repository = repository
  }

  login = async (args: { email: string; password: string }) => {
    try {
      this.startLoader()
      const user = await this.repository.login(args)
      this.updateCredential(user, true)
      return user
    } catch (e) {
      console.error(e)
      return undefined
    } finally {
      this.stopLoader()
    }
  }

  getGoogleLoginUrl = async () => {
    try {
      this.startLoader()
      return await this.repository.getGoogleLoginUrl()
    } finally {
      this.stopLoader()
    }
  }

  loginWithGoogle = async (args: { code: string }) => {
    try {
      this.startLoader()
      const user = await this.repository.loginWithGoogle(args)
      this.updateCredential(user, true)
      return user
    } finally {
      this.stopLoader()
    }
  }
}

export default LoginUseCaseImpl
