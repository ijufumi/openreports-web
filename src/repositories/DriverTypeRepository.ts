import DriverTypeVo from "../vos/DriverTypeVo"

export default interface DriverTypeRepository {
  getAll(): Promise<Array<DriverTypeVo>>
}
