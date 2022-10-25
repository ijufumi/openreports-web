import React, { ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";

import Login from "./login/Login";
import GoogleCallback from "./google_callback/GoogleCallback";
import Top from "./top/Top";
import GoogleAuthError from "./errors/GoogleAuthError";
import NotfoundError from "./errors/NotfoundError";
import Reports from "./reports/Reports";
import Report from "./report/Report";
import ReportTemplates from "./report_templates/ReportTemplates";

export interface Path {
  path: string;
  element: ReactNode;
}

export const usePublicPath = () => {
  return [
    {
      path: "/",
      element: <Navigate to={"/login"} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/google/callback",
      element: <GoogleCallback />,
    },
  ];
};

export const useAuthorizedPath = () => {
  return [
    {
      path: "/top",
      element: <Top />,
    },
    {
      path: "/reports",
      element: <Reports />,
    },
    {
      path: "/reports/:id",
      element: <Report />,
    },
    {
      path: "/report_templates",
      element: <ReportTemplates />,
    },
  ];
};

export const useErrorsPath = () => {
  return [
    {
      path: "/error/google",
      element: <GoogleAuthError />,
    },
    {
      path: "/error/notfound",
      element: <NotfoundError />,
    },
  ];
};
