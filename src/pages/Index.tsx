import { useState } from "react";
import Header from "@/components/Header";
import UploadArea from "@/components/UploadArea";
import ValidationResult from "@/components/ValidationResult";
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
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

      toast({
        title: "Validation Complete",
        description: `Certificate status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      });
    }, 2000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
        <Header />
        <main className="container mx-auto px-4 py-8 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">
              EduAuth Certificate Validator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload educational certificates for instant verification against our secure database. 
              Our system uses advanced OCR technology and blockchain-anchored validation.
            </p>
          </div>
          
          <UploadArea onFileSelect={handleFileSelect} />
          
          {validationResult && (
            <ValidationResult {...validationResult} />
          )}
          
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
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
