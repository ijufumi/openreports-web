import DriverTypeVo from "../../application/dto/vos/responses/DriverTypeVo"

export default interface DriverTypeRepository {
  getAll(): Promise<Array<DriverTypeVo>>
}
