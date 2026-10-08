import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#f8fafc] selection:bg-indigo-100 selection:text-indigo-900">
            <Sidebar />
            <main className="flex-1 ml-64 min-w-0">
                <Header />
                <div className="max-w-7xl mx-auto px-10 pb-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
