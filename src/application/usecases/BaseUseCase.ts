import useLoader from "../../infrastructure/state/Loader"
import UserVo from "../dto/vos/responses/UserVo"
import credentials from "../../infrastructure/state/Credentials"
import { LoginUser } from "../../infrastructure/state/LoginUser"

abstract class BaseUseCase {
  private loader = useLoader()
  protected readonly loginUser: LoginUser | null

  protected constructor(loginUser: LoginUser | null) {
    this.loginUser = loginUser
  }

  protected startLoader = () => {
    this.loader.show()
  }

  protected stopLoader = () => {
    this.loader.hide()
  }

  protected updateCredential = (
    user: UserVo | undefined,
    updateWorkspace: boolean = false
  ) => {
    if (user) {
      if (updateWorkspace && user.workspaces?.length > 0) {
        credentials.setWorkspaceId(user.workspaces[0].id)
      }
      this.loginUser?.set(user)
    }
  }
}

export default BaseUseCase
