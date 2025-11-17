import ReportGroupsVo from "../../application/dto/vos/responses/ReportGroupsVo"
import ReportGroupVo from "../../application/dto/vos/responses/ReportGroupVo"
import IdVo from "../../application/dto/vos/requests/IdVo"
import GetReportGroupsVo from "../../application/dto/vos/requests/GetReportGroupsVo"
import CreateReportGroupVo from "../../application/dto/vos/requests/CreateReportGroupVo"
import UpdateReportGroupVo from "../../application/dto/vos/requests/UpdateReportGroupVo"

export default interface ReportGroupRepository {
  getsByFilter(args: GetReportGroupsVo): Promise<ReportGroupsVo>

  getById(args: IdVo): Promise<ReportGroupVo>

  register(args: CreateReportGroupVo): Promise<ReportGroupVo>

  update(args: UpdateReportGroupVo): Promise<ReportGroupVo>

  delete(args: IdVo): Promise<void>
}
