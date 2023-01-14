import RoleVo from "../vos/RoleVo";

export default interface RoleRepository {
  roles(): Promise<Array<RoleVo> | undefined>;
}
