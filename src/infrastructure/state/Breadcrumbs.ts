import { makeAutoObservable } from "mobx";

export type BreadcrumbsProps = {
  path?: string;
  func?: () => void;
  title: string;
};

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

const localBreadcrumbs = new Breadcrumbs();

export const setBreadcrumbs = (breadcrumbs: BreadcrumbsDataType) => {
  localBreadcrumbs.set(breadcrumbs);
};

export const useBreadcrumbsState = () => {
  return localBreadcrumbs.get();
};
