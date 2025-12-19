"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex overflow-hidden text-foreground">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-background/50 relative overflow-y-auto custom-scrollbar">
        <div className="p-6 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
