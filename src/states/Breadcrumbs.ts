import { makeAutoObservable } from "mobx";

export interface BreadcrumbsProps {
  path?: string;
  title: string;
}

export type BreadcrumbsDataType = Array<BreadcrumbsProps>;

class Breadcrumbs {
  private breadcrumbs: BreadcrumbsDataType = [];

  constructor() {
    makeAutoObservable(this);
  }

  set = (breadcrumbs: BreadcrumbsDataType) => {
    this.breadcrumbs = breadcrumbs;
  };

  get = () => {
    return this.breadcrumbs;
  };

  clear = () => {
    this.breadcrumbs = [];
  };
}

const breadcrumbs = new Breadcrumbs();

const useBreadcrumbs = () => {
  return breadcrumbs;
};

export default useBreadcrumbs;
