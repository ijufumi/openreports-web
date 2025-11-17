import TemplatesVo from "../../application/dto/vos/responses/TemplatesVo"
import TemplateVo from "../../application/dto/vos/responses/TemplateVo"
import IdVo from "../../application/dto/vos/requests/IdVo"
import GetTemplatesVo from "../../application/dto/vos/requests/GetTemplatesVo"
import UpdateTemplateVo from "../../application/dto/vos/requests/UpdateTemplateVo"
import CreateTemplateVo from "../../application/dto/vos/requests/CreateTemplateVo"

export default interface TemplatesRepository {
  getAll(args: GetTemplatesVo): Promise<TemplatesVo>

  getById(args: IdVo): Promise<TemplateVo>

  register(args: CreateTemplateVo): Promise<TemplateVo>

  update(args: UpdateTemplateVo): Promise<TemplateVo>

  delete(args: IdVo): Promise<void>
}
