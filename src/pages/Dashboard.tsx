import Header from '@/components/Header';
import InstitutionDashboard from '@/components/InstitutionDashboard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Institution Dashboard</h1>
            <p className="text-muted-foreground">Manage your certificates and monitor validation activities</p>
          </div>
          <InstitutionDashboard />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;