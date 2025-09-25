import { useState } from "react";
import { Upload, FileImage, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

const UploadArea = ({ onFileSelect }: UploadAreaProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      console.log('File dropped:', files[0].name, files[0].type, files[0].size);
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files[0]) {
      console.log('File selected:', files[0].name, files[0].type, files[0].size);
      onFileSelect(files[0]);
      // Reset the input to allow selecting the same file again
      e.target.value = '';
    }
  };

  return (
    <Card className="p-8 bg-gradient-card shadow-card">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
          dragOver
            ? "border-primary bg-primary/5 shadow-glow"
            : "border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-gradient-primary p-4 rounded-full shadow-elegant">
            <Upload className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Upload Certificate for Verification
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your certificate here or click to browse
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>PDF</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileImage className="h-4 w-4" />
                <span>PNG/JPEG</span>
              </div>
            </div>
          </div>

          <div>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.docx,.doc"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              multiple={false}
            />
            <label htmlFor="file-upload">
              <Button asChild variant="default" size="lg" className="cursor-pointer bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <span>Choose File</span>
              </Button>
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UploadArea;