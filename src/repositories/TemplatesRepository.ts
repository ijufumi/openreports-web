import TemplatesVo from "../vos/TemplatesVo";
import TemplateVo from "../vos/TemplateVo";

export default interface TemplatesRepository {
  getAll(args: { page: number; limit: number }): Promise<TemplatesVo>;

  getById(args: { id: string }): Promise<TemplateVo>;

  register(args: { name: string; file: File }): Promise<TemplateVo>;

  update(args: { id: string; name: string }): Promise<TemplateVo>;

  delete(args: { id: string }): Promise<void>;
}
