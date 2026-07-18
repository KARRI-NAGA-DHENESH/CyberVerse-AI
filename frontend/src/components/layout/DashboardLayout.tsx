import Sidebar from "./Sidebar";
import Header from "./Header";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#020617]">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[-150px] top-[-150px] h-[420px] w-[420px] rounded-full bg-cyan-500/30 blur-[140px]" />

        <div className="absolute right-[-180px] bottom-[-180px] h-[450px] w-[450px] rounded-full bg-blue-500/30 blur-[160px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a,transparent_70%)]" />

      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        <Header />

        <main
          className="
            flex-1
            overflow-y-auto
            px-8
            py-8
            transition-all
            duration-300
          "
        >
          <div className="mx-auto max-w-[1800px]">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;