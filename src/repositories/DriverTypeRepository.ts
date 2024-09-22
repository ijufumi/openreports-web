import DriverTypeVo from "../vos/responses/DriverTypeVo"

export default interface DriverTypeRepository {
  getAll(): Promise<Array<DriverTypeVo>>
}
