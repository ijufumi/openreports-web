import UserVo from "../../application/dto/vos/responses/UserVo"
import GoogleAuthUrlVo from "../../application/dto/vos/responses/GoogleAuthUrlVo"
import FunctionVo from "../../application/dto/vos/responses/FunctionVo"
import UpdateMemberVo from "../../application/dto/vos/requests/UpdateMemberVo"

interface MembersRepository {
  update(args: UpdateMemberVo): Promise<UserVo>

  logout(): Promise<void>

  status(): Promise<UserVo>

  permissions(): Promise<FunctionVo>

  accessToken(): Promise<void>
}

export default MembersRepository
