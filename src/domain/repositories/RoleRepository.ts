import RoleVo from "../../application/dto/vos/responses/RoleVo"

export default interface RoleRepository {
  roles(): Promise<Array<RoleVo>>
}
