import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import Login from "./login/Login";
import GoogleCallback from "./google_callback/GoogleCallback";
import Top from "./top/Top";
import GoogleAuthError from "./errors/GoogleAuthError";
import Reports from "./reports/Reports";
import Report from "./report/Report";

export interface Path {
  path: string;
  element: ReactNode;
}

export interface BreadcrumbsProps {
  path: string;
  title: string;
}

export type BreadcrumbsType = Array<BreadcrumbsProps>;

export interface PathWithBreadcrumbs extends Path {
  breadcrumbs?: Array<BreadcrumbsProps>;
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
      breadcrumbs: [
        {
          path: "",
          title: "Reports",
        },
      ],
    },
    {
      path: "/reports/:id",
      element: <Report />,
      breadcrumbs: [
        {
          path: "/reports",
          title: "Reports",
        },
        {
          path: "",
          title: "",
        },
      ],
    },
  ];
};

export const useErrorsPath = () => {
  return [
    {
      path: "/error/google",
      element: <GoogleAuthError />,
    },
  ];
};
