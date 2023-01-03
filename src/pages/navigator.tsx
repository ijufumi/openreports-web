import { useNavigate, NavigateFunction } from "react-router";
import { AuthorizedPath, PublicPath, ErrorsPath } from "./paths";

class NavigatorWrapper {
  private readonly navigateFunction: NavigateFunction;

  constructor(navigateFunction: NavigateFunction) {
    this.navigateFunction = navigateFunction;
  }

  // public path
  toLogin = () => {
    this.navigateFunction(PublicPath.login);
  };

  // authorized path
  toTop = () => {
    this.navigateFunction(AuthorizedPath.top);
  };

  toReports = () => {
    this.navigateFunction(AuthorizedPath.reports);
  };

  toReportNew = () => {
    this.navigateFunction(AuthorizedPath.reportNew);
  };

  toReportEdit = (id: string) => {
    this.navigateFunction(AuthorizedPath.reportEdit.replace(":id", id));
  };

  toTemplates = () => {
    this.navigateFunction(AuthorizedPath.templates);
  };

  toTemplateNew = () => {
    this.navigateFunction(AuthorizedPath.templateNew);
  };

  toTemplateEdit = (id: string) => {
    this.navigateFunction(AuthorizedPath.templateEdit.replace(":id", id));
  };

  // error path
  toGoogleError = () => {
    this.navigateFunction(ErrorsPath.google);
  };

  toNotfoundError = () => {
    this.navigateFunction(ErrorsPath.notfound);
  };
}

const useNavigator = () => {
  const navigate = useNavigate();
  return new NavigatorWrapper(navigate);
};

export default useNavigator;
