import UserVo from "../vos/responses/UserVo"
import GoogleAuthUrlVo from "../vos/responses/GoogleAuthUrlVo"
import FunctionVo from "../vos/responses/FunctionVo"

interface MembersRepository {
  logout(): Promise<void>

  status(): Promise<UserVo>

  permissions(): Promise<FunctionVo>

  accessToken(): Promise<void>
}

export default MembersRepository
