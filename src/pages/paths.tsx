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
export const AUTHORIZED_PATHS: Path[] = [
  {
    path: "/top",
    element: <Top />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
];
export const ERRORS_PATHS: Path[] = [
  {
    path: "/error/google",
    element: <GoogleAuthError />,
  },
];
