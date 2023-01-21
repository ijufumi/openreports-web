import BaseUseCase from "./BaseUseCase";
import DataSourceUseCase from "../DataSourceUseCase";
import DataSourceRepository from "../../repositories/DataSourceRepository";

export default class DataSourceUseCaseImpl
  extends BaseUseCase
  implements DataSourceUseCase
{
  private readonly repository: DataSourceRepository;

  constructor(repository: DataSourceRepository) {
    super();
    this.repository = repository;
  }

  delete = async (args: { id: string }) => {
    try {
      await this.repository.delete(args);
      return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  getById = async (args: { id: string }) => {
    try {
      return this.repository.getById(args);
    } catch (e) {
      console.error(e);
    }
    return undefined;
  };

  gets = async (args: { page: number; limit: number }) => {
    try {
      this.startLoader();
      return this.repository.gets(args);
    } catch (e) {
      console.error(e);
    } finally {
      this.stopLoader();
    }
    return undefined;
  };

  register = async (args: {
    name: string;
    url: string;
    username: string;
    password: string;
    driverTypeId: string;
  }) => {
    try {
      return this.repository.register(args);
    } catch (e) {
      console.error(e);
    }
    return undefined;
  };

  update = async (args: {
    id: string;
    name: string;
    url: string;
    username: string;
    password: string;
    driverTypeId: string;
  }) => {
    try {
      return this.repository.update(args);
    } catch (e) {
      console.error(e);
    }
    return undefined;
  };
}
