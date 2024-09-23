import ReportGroupsVo from "../vos/responses/ReportGroupsVo"
import ReportGroupVo from "../vos/responses/ReportGroupVo"
import IdVo from "../vos/requests/IdVo"
import GetReportGroupsVo from "../vos/requests/GetReportGroupsVo"
import CreateReportGroupVo from "../vos/requests/CreateReportGroupVo"
import UpdateReportGroupVo from "../vos/requests/UpdateReportGroupVo"

export default interface ReportGroupRepository {
  getsByFilter(args: GetReportGroupsVo): Promise<ReportGroupsVo>

  getById(args: IdVo): Promise<ReportGroupVo>

  register(args: CreateReportGroupVo): Promise<ReportGroupVo>

  update(args: UpdateReportGroupVo): Promise<ReportGroupVo>

  delete(args: IdVo): Promise<void>
}
