import PageContainerDashboard from "@/components/admin/page-container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainerDashboard>{children}</PageContainerDashboard>;
}
