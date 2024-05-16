import ReportGroupsVo from "../vos/ReportGroupsVo"
import ReportGroupVo from "../vos/ReportGroupVo"

export default interface ReportGroupRepository {
  getsByFilter(args: { page: number; limit: number }): Promise<ReportGroupsVo>

  getById(args: { id: string }): Promise<ReportGroupVo>

  register(args: { name: string }): Promise<ReportGroupVo>

  update(args: { id: string; name: string }): Promise<ReportGroupVo>

  delete(args: { id: string }): Promise<void>
}
