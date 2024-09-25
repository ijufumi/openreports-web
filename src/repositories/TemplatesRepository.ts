import TemplatesVo from "../vos/responses/TemplatesVo"
import TemplateVo from "../vos/responses/TemplateVo"
import IdVo from "../vos/requests/IdVo"
import GetTemplatesVo from "../vos/requests/GetTemplatesVo"
import UpdateTemplateVo from "../vos/requests/UpdateTemplateVo"
import CreateTemplateVo from "../vos/requests/CreateTemplateVo"

export default interface TemplatesRepository {
  getAll(args: GetTemplatesVo): Promise<TemplatesVo>

  getById(args: IdVo): Promise<TemplateVo>

  register(args: CreateTemplateVo): Promise<TemplateVo>

  update(args: UpdateTemplateVo): Promise<TemplateVo>

  delete(args: IdVo): Promise<void>
}
