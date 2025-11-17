import UserVo from "../../application/dto/vos/responses/UserVo"
import GoogleAuthUrlVo from "../../application/dto/vos/responses/GoogleAuthUrlVo"

interface LoginRepository {
  login(args: { email: string; password: string }): Promise<UserVo>

  getGoogleLoginUrl(): Promise<GoogleAuthUrlVo | undefined>

  loginWithGoogle(args: { code: string }): Promise<UserVo>
}

export default LoginRepository
