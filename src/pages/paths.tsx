import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import Login from "./login/Login";
import GoogleCallback from "./google_callback/GoogleCallback";
import Top from "./top/Top";
import GoogleAuthError from "./errors/GoogleAuthError";
import Reports from "./reports/Reports";

export interface Path {
  path: string;
  element: ReactNode;
}

export interface BreadcrumbsProps {
  path: string;
  title: string;
}

export interface PathWithBreadcrumbs extends Path {
  breadcrumbs?: Array<BreadcrumbsProps>;
}

export const PUBLIC_PATHS: Path[] = [
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
export const AUTHORIZED_PATHS: PathWithBreadcrumbs[] = [
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
];
export const ERRORS_PATHS: Path[] = [
  {
    path: "/error/google",
    element: <GoogleAuthError />,
  },
];
