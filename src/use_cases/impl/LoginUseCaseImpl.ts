import LoginUseCase from "src/use_cases/LoginUseCase"
import LoginRepository from "src/repositories/LoginRepository"
import Credentials from "../../states/Credentials"
import UserVo from "../../vos/responses/UserVo"
import BaseUseCase from "./BaseUseCase"
import { LoginUser } from "src/states/LoginUser"

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
