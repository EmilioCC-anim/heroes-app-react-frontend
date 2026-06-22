import { createHashRouter, Navigate } from "react-router";
import { lazy } from "react";


import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";


// import { SearchPage } from "@/heroes/pages/search/SearchPage";
const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"))


// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([

    {
        path: "/",
        element: <HeroesLayout />,
        children: [
            {
                //! El primer hijo
                index: true,
                element: <HomePage />
            },
            {
                path: "heroes/:idSlug",
                element: <HeroPage />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "*",
                // element: <h1>404 Not found...</h1>
                element: <Navigate to="/" />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            },
        ]
    },
])