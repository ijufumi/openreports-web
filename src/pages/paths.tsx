import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import Login from "./login";
import GoogleCallback from "./google_callback";
import Top from "./top";
import GoogleAuthError from "./errors/google_auth_error";
import NotfoundError from "./errors/notfound_error";
import Reports from "./reports";
import ReportNew from "./reports/new";
import ReportEdit from "./reports/id/edit";
import ReportsTemplates from "./report_templates";

export interface Path {
  path: string;
  element: ReactNode;
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
  reportTemplates = "/report_templates",
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
  ];
};

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
      path: AuthorizedPath.reportTemplates,
      element: <ReportsTemplates />,
    },
  ];
};

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
  ];
};
