export enum RoleType {
  admin = "admin",
  developer = "developer",
  viewer = "viewer",
}

interface Props {
  id: string;
  roleType: string;
}

export default class Role {
  readonly id: string;
  private readonly _roleType: string;

  constructor(props: Props) {
    this.id = props.id;
    this._roleType = props.roleType;
  }

  get roleType() {
    if (this._roleType === RoleType.admin) {
      return RoleType.admin;
    } else if (this._roleType === RoleType.developer) {
      return RoleType.developer;
    }
    return RoleType.viewer;
  }
}
