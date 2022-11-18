import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import Login from "./login";
import GoogleCallback from "./google_callback";
import Top from "./top";
import GoogleAuthError from "./errors/google_auth_error";
import NotfoundError from "./errors/notfound_error";
import Reports from "./reports";
import ReportEdit from "./reports/id/edit";
import ReportsTemplates from "./report_templates";

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
      element: <ReportEdit />,
    },
    {
      path: "/report_templates",
      element: <ReportsTemplates />,
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
