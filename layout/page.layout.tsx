import { NextPage } from "next";
import MainLayout from "./main.layout";
import DashboardLayout from "./dashboard.layout";

type pageMainLayout = NextPage & { layout: typeof MainLayout }
type pageDashboardLayout = NextPage & { layout: typeof DashboardLayout }

type PageWithLayout = pageMainLayout | pageDashboardLayout

export default PageWithLayout