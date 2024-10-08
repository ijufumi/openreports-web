import React, { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import Login from "./login"
import GoogleCallback from "./google_callback"
import Top from "./top"
import GoogleAuthError from "./errors/google_auth_error"
import NotfoundError from "./errors/notfound_error"
import Reports from "./reports"
import ReportNew from "./reports/new"
import ReportEdit from "./reports/id/edit"
import Templates from "./templates"
import TemplateNew from "./templates/new"
import TemplateEdit from "./templates/id/edit"
import DataSources from "./data_sources"
import DataSourceNew from "./data_sources/new"
import Profile from "./members/profile"

export interface Path {
  path: string
  element: ReactNode
}

export enum PublicPath {
  top = "/",
  login = "/login",
  googleCallback = "/google/callback",
}

export enum AuthorizedPath {
  top = "/top",
  reports = "/reports",
  reportEdit = "/reports/edit/:id",
  reportNew = "/reports/new",
  templates = "/templates",
  templateNew = "/templates/new",
  templateEdit = "/templates/edit/:id",
  dataSources = "/data-sources",
  dataSourceNew = "/data-sources/new",
  dataSourceEdit = "/data-sources/edit/:id",
  profileEdit = "/member/profile",
}

export enum ErrorsPath {
  google = "/error/google",
  notfound = "/error/notfound",
}

export const usePublicPath = () => {
  return [
    {
      path: PublicPath.top,
      element: <Navigate to={"/login"} />,
    },
    {
      path: PublicPath.login,
      element: <Login />,
    },
    {
      path: PublicPath.googleCallback,
      element: <GoogleCallback />,
    },
  ]
}

export const useAuthorizedPath = () => {
  return [
    {
      path: AuthorizedPath.top,
      element: <Top />,
    },
    {
      path: AuthorizedPath.reports,
      element: <Reports />,
    },
    {
      path: AuthorizedPath.reportEdit,
      element: <ReportEdit />,
    },
    {
      path: AuthorizedPath.reportNew,
      element: <ReportNew />,
    },
    {
      path: AuthorizedPath.templates,
      element: <Templates />,
    },
    {
      path: AuthorizedPath.templateNew,
      element: <TemplateNew />,
    },
    {
      path: AuthorizedPath.templateEdit,
      element: <TemplateEdit />,
    },
    {
      path: AuthorizedPath.dataSources,
      element: <DataSources />,
    },
    {
      path: AuthorizedPath.dataSourceNew,
      element: <DataSourceNew />,
    },
    {
      path: AuthorizedPath.dataSourceEdit,
      element: <DataSources />,
    },
    {
      path: AuthorizedPath.profileEdit,
      element: <Profile />,
    },
  ]
}

export const useErrorsPath = () => {
  return [
    {
      path: ErrorsPath.google,
      element: <GoogleAuthError />,
    },
    {
      path: ErrorsPath.notfound,
      element: <NotfoundError />,
    },
  ]
}
