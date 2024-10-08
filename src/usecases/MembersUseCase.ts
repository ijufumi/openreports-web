import UpdateMemberVo from "../vos/requests/UpdateMemberVo"
import UserVo from "../vos/responses/UserVo"

interface MembersUseCase {
  logout(): Promise<void>

  isLoggedIn(): Promise<boolean>

  update(args: UpdateMemberVo): Promise<UserVo | undefined>
}

export default MembersUseCase
