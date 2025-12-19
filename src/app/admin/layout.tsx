import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { NotificationCenter } from "@/components/admin/NotificationCenter";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex overflow-hidden text-foreground">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-background/50 relative overflow-y-auto custom-scrollbar">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-end px-8 sticky top-0 z-50">
          <NotificationCenter />
        </header>
        <div className="p-6 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
