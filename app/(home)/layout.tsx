import PageContainer from "@/components/home/page-container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer>
      <div className="w-full ">{children}</div>
    </PageContainer>
  );
}
