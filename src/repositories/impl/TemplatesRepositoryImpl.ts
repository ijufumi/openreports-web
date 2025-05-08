import BaseRepository from "./BaseRepository"
import TemplatesRepository from "../TemplatesRepository"
import TemplatesVo from "../../vos/responses/TemplatesVo"
import TemplateVo from "../../vos/responses/TemplateVo"
import GetTemplatesVo from "../../vos/requests/GetTemplatesVo"
import IdVo from "../../vos/requests/IdVo"
import CreateTemplateVo from "../../vos/requests/CreateTemplateVo"
import UpdateTemplateVo from "../../vos/requests/UpdateTemplateVo"

export default class TemplatesRepositoryImpl
  extends BaseRepository
  implements TemplatesRepository
{
  getAll = async (args: GetTemplatesVo) => {
    const path = `?page=${args.page}&limit=${args.limit}`
    const result = await this._get({ path, hasResponse: true })
    return new TemplatesVo(result)
  }

  getById = async (args: IdVo) => {
    const result = await this._get({ path: `/${args.id}` })
    return new TemplateVo(result)
  }

  register = async (args: CreateTemplateVo) => {
    const formData = new FormData()
    formData.append("name", args.name)
    if (!!args.file) {
      formData.append("file", args.file)
    }
    const result = await this._upload({ path: "/", body: formData })
    return new TemplateVo(result)
  }

  update = async (args: UpdateTemplateVo) => {
    const { id, name } = args
    const result = await this._put({
      path: `/${id}`,
      body: { name },
    })
    return new TemplateVo(result)
  }

  delete = async (args: IdVo) => {
    const { id } = args

    return await this._delete({
      path: `/${id}`,
    })
  }
}
