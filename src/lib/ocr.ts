import { pipeline } from '@huggingface/transformers';

// Configure transformers for browser use
const env = await import('@huggingface/transformers').then(m => m.env);
env.allowLocalModels = false;
env.useBrowserCache = true;

let ocrPipeline: any = null;

export const initializeOCR = async () => {
  if (!ocrPipeline) {
    console.log('Initializing OCR pipeline...');
    try {
      ocrPipeline = await pipeline(
        'image-to-text',
        'Xenova/trocr-base-printed',
        { device: 'webgpu' }
      );
      console.log('OCR pipeline initialized successfully');
    } catch (error) {
      console.warn('WebGPU not available, falling back to CPU:', error);
      ocrPipeline = await pipeline(
        'image-to-text',
        'Xenova/trocr-base-printed'
      );
    }
  }
  return ocrPipeline;
};

export const extractTextFromImage = async (file: File): Promise<string> => {
  try {
    console.log('Starting OCR extraction for:', file.name);
    
    // Initialize OCR if not already done
    const ocr = await initializeOCR();
    
    // Convert file to image URL
    const imageUrl = URL.createObjectURL(file);
    
    // Create image element to get proper dimensions
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });
    
    console.log('Image loaded, performing OCR...');
    
    // Perform OCR
    const result = await ocr(imageUrl);
    
    // Clean up object URL
    URL.revokeObjectURL(imageUrl);
    
    console.log('OCR completed:', result);
    
    // Extract text from result
    const extractedText = Array.isArray(result) 
      ? result.map(r => r.generated_text).join(' ')
      : result.generated_text || '';
    
    return extractedText;
    
  } catch (error) {
    console.error('OCR extraction failed:', error);
    throw new Error(`OCR extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Extract specific certificate details from OCR text
export const extractCertificateDetails = (text: string) => {
  const details = {
    studentName: '',
    rollNumber: '',
    dateOfBirth: '',
    certificateNumber: '',
    course: '',
    year: '',
    institution: ''
  };
  
  // Simple regex patterns for common certificate fields
  const patterns = {
    studentName: /(?:name|student|awarded to)[\s:]+([a-zA-Z\s]+?)(?:\n|certificate|roll|reg)/i,
    rollNumber: /(?:roll|registration|reg|student id)[\s:]*([a-zA-Z0-9]+)/i,
    dateOfBirth: /(?:date of birth|dob|born)[\s:]*(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})/i,
    certificateNumber: /(?:certificate|cert)[\s:]*(?:no|number|#)[\s:]*([a-zA-Z0-9-]+)/i,
    course: /(?:course|program|degree|bachelor|master|diploma)[\s:]*([a-zA-Z\s]+?)(?:\n|year|duration)/i,
    year: /(?:year|graduated|completed|issued)[\s:]*(\d{4})/i,
    institution: /(?:university|college|institute|school)[\s:]*([a-zA-Z\s]+?)(?:\n|certificate|awarded)/i
  };
  
  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = text.match(pattern);
    if (match && match[1]) {
      details[key as keyof typeof details] = match[1].trim();
    }
  });
  
  return details;
};