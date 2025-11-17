import UpdateMemberVo from "../dto/vos/requests/UpdateMemberVo"
import UserVo from "../dto/vos/responses/UserVo"

interface MembersUseCase {
  logout(): Promise<void>

  isLoggedIn(): Promise<boolean>

  update(args: UpdateMemberVo): Promise<UserVo | undefined>

  user(): Promise<UserVo | undefined>
}

export default MembersUseCase
