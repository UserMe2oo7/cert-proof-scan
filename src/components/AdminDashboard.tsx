import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Calendar,
  FileText,
  Users
} from "lucide-react";

interface VerificationRecord {
  id: string;
  timestamp: string;
  fileName: string;
  status: "valid" | "suspicious" | "invalid";
  studentName: string;
  certificateNumber: string;
  hash: string;
}

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for demonstration
  const verificationRecords: VerificationRecord[] = [
    {
      id: "1",
      timestamp: "2024-01-15 14:30:22",
      fileName: "certificate_john_doe.pdf",
      status: "valid",
      studentName: "John Doe",
      certificateNumber: "CERT-2023-001",
      hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    },
    {
      id: "2",
      timestamp: "2024-01-15 13:45:11",
      fileName: "degree_jane_smith.png",
      status: "suspicious",
      studentName: "Jane Smith",
      certificateNumber: "CERT-2023-002",
      hash: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1",
    },
    {
      id: "3",
      timestamp: "2024-01-15 12:20:45",
      fileName: "fake_certificate.jpg",
      status: "invalid",
      studentName: "Unknown User",
      certificateNumber: "FAKE-001",
      hash: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-valid text-valid-foreground">Valid</Badge>;
      case "suspicious":
        return <Badge className="bg-suspicious text-suspicious-foreground">Suspicious</Badge>;
      case "invalid":
        return <Badge className="bg-invalid text-invalid-foreground">Invalid</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-valid" />;
      case "suspicious":
        return <AlertTriangle className="h-4 w-4 text-suspicious" />;
      case "invalid":
        return <XCircle className="h-4 w-4 text-invalid" />;
      default:
        return null;
    }
  };

  const filteredRecords = verificationRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: verificationRecords.length,
    valid: verificationRecords.filter(r => r.status === "valid").length,
    suspicious: verificationRecords.filter(r => r.status === "suspicious").length,
    invalid: verificationRecords.filter(r => r.status === "invalid").length,
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Verifications</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center space-x-3">
            <div className="bg-valid p-2 rounded-lg">
              <CheckCircle className="h-5 w-5 text-valid-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Valid</p>
              <p className="text-2xl font-bold text-valid">{stats.valid}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center space-x-3">
            <div className="bg-suspicious p-2 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-suspicious-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Suspicious</p>
              <p className="text-2xl font-bold text-suspicious">{stats.suspicious}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center space-x-3">
            <div className="bg-invalid p-2 rounded-lg">
              <XCircle className="h-5 w-5 text-invalid-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Invalid</p>
              <p className="text-2xl font-bold text-invalid">{stats.invalid}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, certificate number, or filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Verification Records Table */}
      <Card className="bg-gradient-card shadow-card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-foreground">Recent Verifications</h3>
          <p className="text-sm text-muted-foreground">Monitor and review certificate verification attempts</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Timestamp</th>
                <th className="text-left p-4 font-medium text-muted-foreground">File</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Student</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Certificate #</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{record.timestamp}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground font-medium">{record.fileName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{record.studentName}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-foreground">{record.certificateNumber}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      {getStatusBadge(record.status)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {record.status === "suspicious" && (
                        <Button variant="hero" size="sm">
                          Review
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;