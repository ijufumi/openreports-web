import { ListVo, ListProps } from "./base"
import WorkspaceMemberVo, {
  Props as WorkspaceMemberProps,
} from "./WorkspaceMemberVo"

interface Props extends ListProps<WorkspaceMemberProps> {
  items: Array<WorkspaceMemberProps>
}

export default class WorkspaceMembersVo extends ListVo<
  WorkspaceMemberProps,
  WorkspaceMemberVo
> {
  readonly items: Array<WorkspaceMemberVo> = []

  constructor(props: Props) {
    super(props)
    this.items = this.getItems(props)
  }

  getItems(props: Props): Array<WorkspaceMemberVo> {
    if (props.items.length > 0) {
      return props.items.map((item) => new WorkspaceMemberVo(item))
    }
    return []
  }
}
