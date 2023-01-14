import Templates from "../vos/Templates";
import Template from "../vos/Template";

export default interface TemplatesRepository {
  getAll(args: { page: number; limit: number }): Promise<Templates | undefined>;

  getById(args: { id: string }): Promise<Template | undefined>;

  register(args: { name: string; file: File }): Promise<Template | undefined>;

  update(args: { id: string; name: string }): Promise<Template | undefined>;

  delete(args: { id: string }): Promise<void>;
}
