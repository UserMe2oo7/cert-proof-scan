import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  FileText,
  Calendar,
  Download,
  Upload,
  Search
} from 'lucide-react';

const InstitutionDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const stats = {
    totalCertificates: 1247,
    validationsToday: 34,
    suspiciousFlags: 3,
    activeStudents: 892
  };

  const recentValidations = [
    { id: 1, student: "John Doe", certificate: "CS-2023-001", status: "valid", timestamp: "2 hours ago" },
    { id: 2, student: "Jane Smith", certificate: "EE-2023-045", status: "suspicious", timestamp: "4 hours ago" },
    { id: 3, student: "Mike Johnson", certificate: "ME-2023-078", status: "valid", timestamp: "6 hours ago" },
    { id: 4, student: "Sarah Wilson", certificate: "CS-2023-102", status: "invalid", timestamp: "8 hours ago" }
  ];

  const certificates = [
    { id: 1, number: "CS-2023-001", student: "John Doe", course: "Computer Science", issued: "2023-12-15", status: "active" },
    { id: 2, number: "EE-2023-045", student: "Jane Smith", course: "Electrical Engineering", issued: "2023-12-10", status: "active" },
    { id: 3, number: "ME-2023-078", student: "Mike Johnson", course: "Mechanical Engineering", issued: "2023-12-08", status: "active" },
    { id: 4, number: "CS-2023-102", student: "Sarah Wilson", course: "Computer Science", issued: "2023-12-05", status: "revoked" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-valid text-valid-foreground';
      case 'suspicious': return 'bg-suspicious text-suspicious-foreground';
      case 'invalid': return 'bg-invalid text-invalid-foreground';
      case 'active': return 'bg-valid text-valid-foreground';
      case 'revoked': return 'bg-invalid text-invalid-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCertificates.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validations Today</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.validationsToday}</div>
            <p className="text-xs text-muted-foreground">
              +8% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Flags</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-suspicious">{stats.suspiciousFlags}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="validations">Validations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Validations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Validations</CardTitle>
                <CardDescription>Latest certificate validation attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentValidations.map((validation) => (
                    <div key={validation.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{validation.student}</p>
                        <p className="text-xs text-muted-foreground">{validation.certificate}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className={getStatusColor(validation.status)}>
                          {validation.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{validation.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Issue Certificate</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Download className="h-6 w-6" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-sm">View Reports</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">Audit Log</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Certificate Management</CardTitle>
                  <CardDescription>View and manage all issued certificates</CardDescription>
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Issue New Certificate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{cert.number}</p>
                      <p className="text-sm text-muted-foreground">{cert.student} • {cert.course}</p>
                      <p className="text-xs text-muted-foreground">Issued: {cert.issued}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(cert.status)}>
                        {cert.status}
                      </Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Validation History</CardTitle>
              <CardDescription>Track all certificate validation requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentValidations.map((validation) => (
                  <div key={validation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{validation.student}</p>
                      <p className="text-sm text-muted-foreground">Certificate: {validation.certificate}</p>
                      <p className="text-xs text-muted-foreground">{validation.timestamp}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(validation.status)}>
                        {validation.status}
                      </Badge>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Validation Trends</CardTitle>
                <CardDescription>Certificate validation over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <TrendingUp className="h-8 w-8 mr-2" />
                  Analytics chart would be here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
                <CardDescription>Fraud detection and security insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Valid Certificates</span>
                    <span className="text-sm font-medium text-valid">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Suspicious Activity</span>
                    <span className="text-sm font-medium text-suspicious">4.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Invalid Attempts</span>
                    <span className="text-sm font-medium text-invalid">1.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstitutionDashboard;