import TemplatesVo from "../vos/responses/TemplatesVo"
import TemplateVo from "../vos/responses/TemplateVo"

export default interface TemplatesRepository {
  getAll(args: { page: number; limit: number }): Promise<TemplatesVo>

  getById(args: { id: string }): Promise<TemplateVo>

  register(args: { name: string; file: File }): Promise<TemplateVo>

  update(args: { id: string; name: string }): Promise<TemplateVo>

  delete(args: { id: string }): Promise<void>
}
