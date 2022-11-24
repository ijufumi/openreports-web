import TemplatesVo from "../vos/TemplatesVo";
import TemplateVo from "../vos/TemplateVo";

export default interface TemplatesRepository {
  getAll(args: {
    page: number;
    limit: number;
  }): Promise<TemplatesVo | undefined>;

  getById(args: { id: string }): Promise<TemplateVo | undefined>;

  register(args: { name: string; file: File }): Promise<TemplateVo | undefined>;
}
