import Header from '@/components/Header';
import AdminDashboard from '@/components/AdminDashboard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const Admin = () => {
  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage certificate verifications</p>
          </div>
          <AdminDashboard />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;