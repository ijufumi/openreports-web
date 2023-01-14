import { ListVo, ListProps } from "./base";
import WorkspaceMemberVo, {
  Props as WorkspaceMemberProps,
} from "./WorkspaceMemberVo";

interface Props extends ListProps {
  items: Array<WorkspaceMemberProps>;
}

export default class WorkspaceMembersVo extends ListVo {
  readonly items: Array<WorkspaceMemberVo> = [];

  constructor(props: Props) {
    super(props);
    this.items = this.getItems(props);
  }

  getItems(props: Props): Array<WorkspaceMemberVo> {
    if (props.items) {
      return props.items.map((item) => new WorkspaceMemberVo(item));
    }
    return [];
  }
}
