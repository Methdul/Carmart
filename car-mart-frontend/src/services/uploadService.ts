// car-mart-frontend/src/services/uploadService.ts
const API_BASE_URL = 'http://localhost:3001/api';

export interface UploadedFile {
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimetype: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    files: UploadedFile[];
    count: number;
  };
}

export interface SingleUploadResponse {
  success: boolean;
  message: string;
  data: UploadedFile;
}

class UploadService {
  // Upload multiple images
  async uploadImages(files: FileList | File[]): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      
      // Convert FileList to Array if needed
      const fileArray = Array.from(files);
      
      // Add each file to FormData
      fileArray.forEach(file => {
        formData.append('images', file);
      });

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to upload images');
      }

      console.log('🔄 Uploading', fileArray.length, 'files...');

      const response = await fetch(`${API_BASE_URL}/upload/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      console.log('✅ Upload successful:', result);
      return result;
    } catch (error) {
      console.error('❌ Upload error:', error);
      throw error;
    }
  }

  // Upload single image
  async uploadSingleImage(file: File): Promise<SingleUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to upload images');
      }

      const response = await fetch(`${API_BASE_URL}/upload/single`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Single upload error:', error);
      throw error;
    }
  }

  // Delete uploaded file
  async deleteFile(filename: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/upload/${filename}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }

      console.log('✅ File deleted:', filename);
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }

  // Validate files before upload
  validateFiles(files: FileList | File[]): { isValid: boolean; error?: string } {
    const fileArray = Array.from(files);
    
    // Check file count
    if (fileArray.length === 0) {
      return { isValid: false, error: 'No files selected' };
    }
    
    if (fileArray.length > 15) {
      return { isValid: false, error: 'Maximum 15 files allowed' };
    }

    // Check each file
    for (const file of fileArray) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        return { isValid: false, error: `File "${file.name}" is too large. Maximum 5MB per file.` };
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        return { isValid: false, error: `File "${file.name}" is not an image.` };
      }

      // Check specific image types
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return { isValid: false, error: `File "${file.name}" must be JPEG, PNG, or WebP.` };
      }
    }

    return { isValid: true };
  }

  // Create preview URLs for immediate display
  createPreviewUrls(files: FileList | File[]): string[] {
    const fileArray = Array.from(files);
    return fileArray.map(file => URL.createObjectURL(file));
  }

  // Cleanup preview URLs to prevent memory leaks
  cleanupPreviewUrls(urls: string[]): void {
    urls.forEach(url => URL.revokeObjectURL(url));
  }
}

export const uploadService = new UploadService();