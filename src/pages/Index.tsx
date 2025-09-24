import { useState } from "react";
import Header from "@/components/Header";
import UploadArea from "@/components/UploadArea";
import ValidationResult from "@/components/ValidationResult";
import AdminDashboard from "@/components/AdminDashboard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentView, setCurrentView] = useState<"upload" | "result" | "admin">("upload");
  const [validationResult, setValidationResult] = useState<any>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    // Mock file processing
    toast({
      title: "Processing Certificate",
      description: "Extracting details and validating against database...",
    });

    // Simulate processing delay
    setTimeout(() => {
      // Mock validation result based on file name
      const fileName = file.name.toLowerCase();
      let status: "valid" | "suspicious" | "invalid" = "valid";
      
      if (fileName.includes("fake") || fileName.includes("invalid")) {
        status = "invalid";
      } else if (fileName.includes("suspicious") || fileName.includes("test")) {
        status = "suspicious";
      }

      const mockResult = {
        status,
        details: {
          studentName: status === "invalid" ? "Unknown User" : "John Doe",
          rollNumber: status === "invalid" ? "N/A" : "CS2023001",
          dateOfBirth: status === "invalid" ? "N/A" : "1999-05-15",
          certificateNumber: status === "invalid" ? "FAKE-001" : "CERT-2023-001",
          course: status === "invalid" ? "N/A" : "Computer Science",
          year: status === "invalid" ? "N/A" : "2023",
        },
        hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
        timestamp: new Date().toLocaleString(),
      };

      setValidationResult(mockResult);
      setCurrentView("result");

      toast({
        title: "Validation Complete",
        description: `Certificate status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      });
    }, 2000);
  };

  const renderContent = () => {
    switch (currentView) {
      case "upload":
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                Educational Certificate Validation
              </h1>
              <p className="text-lg text-muted-foreground">
                Secure, blockchain-anchored certificate verification system
              </p>
            </div>
            <UploadArea onFileSelect={handleFileSelect} />
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                For demonstration purposes, upload any file. Use filenames containing:
              </p>
              <div className="flex justify-center space-x-6 text-xs">
                <span className="text-valid">• "valid" or "john" → Valid result</span>
                <span className="text-suspicious">• "suspicious" or "test" → Suspicious result</span>
                <span className="text-invalid">• "fake" or "invalid" → Invalid result</span>
              </div>
            </div>
          </div>
        );

      case "result":
        return (
          <div className="max-w-4xl mx-auto">
            <ValidationResult {...validationResult} />
          </div>
        );

      case "admin":
        return (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Monitor and manage certificate verifications</p>
            </div>
            <AdminDashboard />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Navigation */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setCurrentView("upload")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                currentView === "upload"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Verify Certificate
            </button>
            <button
              onClick={() => setCurrentView("admin")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                currentView === "admin"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Admin Dashboard
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
