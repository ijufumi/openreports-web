import Role from "../vos/Role";

export default interface RoleRepository {
  roles(): Promise<Array<Role> | undefined>;
}
