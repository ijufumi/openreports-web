import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import Login from "./login/Login";
import GoogleCallback from "./google_callback/GoogleCallback";
import Top from "./top/Top";
import GoogleAuthError from "./errors/GoogleAuthError";
import Reports from "./reports/Reports";
import Report from "./report/Report";

type ElementFunc = () => ReactNode;

export type ElementType = ReactNode | ElementFunc;

export interface Path {
  path: string;
  element: ElementType;
}

export interface BreadcrumbsProps {
  path: string;
  title: string;
}

type BreadcrumbsFunc = () => Array<BreadcrumbsProps>;

export type BreadcrumbsType = Array<BreadcrumbsProps> | BreadcrumbsFunc;

export interface PathWithBreadcrumbs extends Path {
  breadcrumbs?: BreadcrumbsType;
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
  {
    path: "/report/:id",
    element: () => {
      return <Report />;
    },
  },
];
export const ERRORS_PATHS: Path[] = [
  {
    path: "/error/google",
    element: <GoogleAuthError />,
  },
];
