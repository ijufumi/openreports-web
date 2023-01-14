import Reports from "../vos/Reports";
import Report from "../vos/Report";

export default interface ReportsRepository {
  getsByFilter(args: {
    page: number;
    limit: number;
    templateId?: string;
  }): Promise<Reports | undefined>;

  getById(args: { id: string }): Promise<Report | undefined>;

  update(args: {
    id: string;
    name: string;
    reportTemplateId: string;
  }): Promise<Report | undefined>;

  output(args: { id: string }): Promise<Blob | undefined>;

  delete(args: { id: string }): Promise<void>;
}
