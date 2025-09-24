import { CheckCircle, AlertTriangle, XCircle, Hash, QrCode } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ValidationResultProps {
  status: "valid" | "suspicious" | "invalid";
  details: {
    studentName: string;
    rollNumber: string;
    dateOfBirth: string;
    certificateNumber: string;
    course: string;
    year: string;
  };
  hash: string;
  timestamp: string;
}

const ValidationResult = ({ status, details, hash, timestamp }: ValidationResultProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "valid":
        return {
          icon: CheckCircle,
          title: "Certificate Valid",
          description: "This certificate has been successfully verified against our database.",
          bgColor: "bg-valid-light",
          borderColor: "border-valid",
          textColor: "text-valid",
          buttonVariant: "valid" as const,
        };
      case "suspicious":
        return {
          icon: AlertTriangle,
          title: "Certificate Suspicious",
          description: "Partial match found. Please review the details carefully.",
          bgColor: "bg-suspicious-light",
          borderColor: "border-suspicious",
          textColor: "text-suspicious",
          buttonVariant: "suspicious" as const,
        };
      case "invalid":
        return {
          icon: XCircle,
          title: "Certificate Invalid",
          description: "No matching record found in our database.",
          bgColor: "bg-invalid-light",
          borderColor: "border-invalid",
          textColor: "text-invalid",
          buttonVariant: "invalid" as const,
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Status Header */}
      <Card className={`p-6 ${config.bgColor} border-2 ${config.borderColor} shadow-card`}>
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${config.textColor} bg-background/80`}>
            <StatusIcon className="h-8 w-8" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${config.textColor}`}>{config.title}</h2>
            <p className="text-muted-foreground">{config.description}</p>
          </div>
        </div>
      </Card>

      {/* Certificate Details */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Extracted Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Student Name</label>
            <p className="text-foreground font-medium">{details.studentName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Roll Number</label>
            <p className="text-foreground font-medium">{details.rollNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
            <p className="text-foreground font-medium">{details.dateOfBirth}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Certificate Number</label>
            <p className="text-foreground font-medium">{details.certificateNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Course</label>
            <p className="text-foreground font-medium">{details.course}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Year</label>
            <p className="text-foreground font-medium">{details.year}</p>
          </div>
        </div>
      </Card>

      {/* Blockchain Hash & QR Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center space-x-3 mb-4">
            <Hash className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Blockchain Anchor</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">SHA-256 Hash</label>
              <p className="text-xs font-mono bg-muted p-2 rounded break-all">{hash}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
              <p className="text-sm text-foreground">{timestamp}</p>
            </div>
          </div>
        </Card>

        {status === "valid" && (
          <Card className="p-6 bg-gradient-card shadow-card">
            <div className="flex items-center space-x-3 mb-4">
              <QrCode className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Verification QR Code</h3>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
              <Button variant={config.buttonVariant} size="sm">
                Generate QR Code
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Verify Another Certificate
        </Button>
        <Button variant={config.buttonVariant}>
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default ValidationResult;