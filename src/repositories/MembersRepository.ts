import UserVo from "../vos/responses/UserVo"
import GoogleAuthUrlVo from "../vos/responses/GoogleAuthUrlVo"
import FunctionVo from "../vos/responses/FunctionVo"
import UpdateMemberVo from "../vos/requests/UpdateMemberVo"

interface MembersRepository {
  update(args: UpdateMemberVo): Promise<UserVo>

  logout(): Promise<void>

  status(): Promise<UserVo>

  permissions(): Promise<FunctionVo>

  accessToken(): Promise<void>
}

export default MembersRepository
