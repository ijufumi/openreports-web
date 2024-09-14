import { useNavigate, NavigateFunction } from "react-router"
import { nanoid } from "nanoid"
import { AuthorizedPath, PublicPath, ErrorsPath } from "./paths"

class NavigatorWrapper {
  private readonly navigateFunction: NavigateFunction

  constructor(navigateFunction: NavigateFunction) {
    this.navigateFunction = navigateFunction
  }

  // public path
  toLogin = () => {
    this.navigate(PublicPath.login)
  }

  // authorized path
  toTop = () => {
    this.navigate(AuthorizedPath.top)
  }

  toReports = () => {
    this.navigate(AuthorizedPath.reports)
  }

  toReportNew = () => {
    this.navigate(AuthorizedPath.reportNew)
  }

  toReportEdit = (id: string) => {
    this.navigate(AuthorizedPath.reportEdit.replace(":id", id))
  }

  toTemplates = () => {
    this.navigate(AuthorizedPath.templates)
  }

  toTemplateNew = () => {
    this.navigate(AuthorizedPath.templateNew)
  }

  toTemplateEdit = (id: string) => {
    this.navigate(AuthorizedPath.templateEdit.replace(":id", id))
  }

  toDataSources = () => {
    this.navigate(AuthorizedPath.dataSources)
  }

  toDataSourceNew = () => {
    this.navigate(AuthorizedPath.dataSourceNew)
  }

  toDataSourceEdit = (id: string) => {
    this.navigate(AuthorizedPath.dataSources.replace(":id", id))
  }

  // error path
  toGoogleError = () => {
    this.navigate(ErrorsPath.google)
  }

  toNotfoundError = () => {
    this.navigate(ErrorsPath.notfound)
  }

  private navigate = (to: string) => {
    this.navigateFunction(to, { state: { key: nanoid() } })
  }
}

const useNavigator = () => {
  const navigate = useNavigate()
  return new NavigatorWrapper(navigate)
}

export default useNavigator
