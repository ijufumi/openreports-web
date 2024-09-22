import RoleVo from "../vos/responses/RoleVo"

export default interface RoleRepository {
  roles(): Promise<Array<RoleVo>>
}
