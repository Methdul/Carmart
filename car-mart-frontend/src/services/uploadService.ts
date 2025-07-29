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
        throw new Error('Authentication token not found');
      }

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

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
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
        throw new Error('Authentication token not found');
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
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Delete uploaded file
  async deleteFile(filename: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
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
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }

  // Validate file before upload
  validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size must be less than 5MB'
      };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Only JPEG, PNG, and WebP images are allowed'
      };
    }

    return { isValid: true };
  }

  // Validate multiple files
  validateFiles(files: FileList | File[]): { isValid: boolean; error?: string } {
    const fileArray = Array.from(files);

    // Check file count (15 max)
    if (fileArray.length > 15) {
      return {
        isValid: false,
        error: 'Maximum 15 files allowed'
      };
    }

    // Validate each file
    for (const file of fileArray) {
      const validation = this.validateFile(file);
      if (!validation.isValid) {
        return validation;
      }
    }

    return { isValid: true };
  }

  // Helper function to create preview URLs for files
  createPreviewUrls(files: FileList | File[]): string[] {
    return Array.from(files).map(file => URL.createObjectURL(file));
  }

  // Helper function to clean up preview URLs
  cleanupPreviewUrls(urls: string[]): void {
    urls.forEach(url => URL.revokeObjectURL(url));
  }
}

export const uploadService = new UploadService();