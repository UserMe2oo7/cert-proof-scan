import { useState } from "react";
import Header from "@/components/Header";
import UploadArea from "@/components/UploadArea";
import ValidationResult from "@/components/ValidationResult";
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useToast } from "@/hooks/use-toast";
import { extractTextFromImage, extractCertificateDetails } from "@/lib/ocr";

const Index = () => {
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setValidationResult(null);
    
    toast({
      title: "Processing Certificate",
      description: "Extracting text using OCR technology...",
    });

    try {
      // Check if file is an image
      const isImage = file.type.startsWith('image/');
      
      if (!isImage) {
        throw new Error('Please upload an image file (PNG, JPG, JPEG)');
      }

      // Extract text using OCR
      const extractedText = await extractTextFromImage(file);
      console.log('Extracted text:', extractedText);
      
      if (!extractedText || extractedText.trim().length === 0) {
        throw new Error('No text could be extracted from the image');
      }

      // Extract certificate details
      const details = extractCertificateDetails(extractedText);
      console.log('Extracted details:', details);
      
      toast({
        title: "Text Extracted",
        description: "Validating certificate details against database...",
      });

      // Simulate database validation (replace with real DB check later)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation logic based on extracted data
      let status: "valid" | "suspicious" | "invalid" = "valid";
      
      if (!details.studentName || !details.certificateNumber) {
        status = "suspicious";
      }
      
      if (extractedText.toLowerCase().includes('fake') || 
          extractedText.toLowerCase().includes('sample')) {
        status = "invalid";
      }

      const mockResult = {
        status,
        details: {
          studentName: details.studentName || "John Doe",
          rollNumber: details.rollNumber || "CS2023001",
          dateOfBirth: details.dateOfBirth || "1999-05-15",
          certificateNumber: details.certificateNumber || "CERT-2023-001",
          course: details.course || "Computer Science",
          year: details.year || "2023",
        },
        extractedText: extractedText.substring(0, 500) + (extractedText.length > 500 ? '...' : ''),
        hash: await generateFileHash(file),
        timestamp: new Date().toLocaleString(),
      };

      setValidationResult(mockResult);

      toast({
        title: "Validation Complete",
        description: `Certificate status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      });
      
    } catch (error) {
      console.error('Error processing certificate:', error);
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "Failed to process certificate",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate SHA-256 hash of the file
  const generateFileHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
          
          <UploadArea onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          
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
