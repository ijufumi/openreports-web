import UserVo from "../vos/UserVo"
import GoogleAuthUrlVo from "../vos/GoogleAuthUrlVo"
import FunctionVo from "../vos/FunctionVo"

interface MembersRepository {
  logout(): Promise<void>

  status(): Promise<UserVo>

  permissions(): Promise<FunctionVo>
}

export default MembersRepository
