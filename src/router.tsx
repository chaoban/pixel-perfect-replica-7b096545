import { createBrowserRouter, type RouteObject } from "react-router-dom";

import RootLayout, { ErrorPage, NotFoundPage } from "./RootLayout";
import Index from "./pages/Index";
import LoginPage from "./pages/Login";
import BarbersPage from "./pages/Barbers";

// Client-side routes. Vercel serves index.html for every path (see vercel.json),
// so deep links like /login and /barbers resolve here in the browser.
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "login", element: <LoginPage /> },
      { path: "barbers", element: <BarbersPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
