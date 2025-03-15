import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  listAll,
  ref,
  Storage,
  uploadBytesResumable,
  UploadMetadata,
  UploadTask,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private storage: Storage) {}

  /**
   * Retrieves the download URL for a specific file.
   * @param path - The storage file path (e.g., 'images/slideshows/image.jpg').
   * @returns A promise resolving to a file download URL.
   * @throws An error if the file URL cannot be retrieved. The error type depends on Firebase Storage.
   */
  async getFileUrl(path: string): Promise<string> {
    const fileRef = ref(this.storage, path);
    try {
      return getDownloadURL(fileRef);
    } catch (error) {
      console.error(`Error fetching file URL for ${path}: ${error}`);
      throw error;
    }
  }

  /**
   * Retrieves the download URLs of all files in a specific directory.
   * @param directory - The storage directory path (e.g., 'images/slideshows/').
   * @returns A promise resolving to an array of file download URLs.
   * @throws An error if the file URLs cannot be retrieved. The error type depends on Firebase Storage.
   */
  async getFileUrls(directory: string): Promise<string[]> {
    const directoryRef = ref(this.storage, directory);
    try {
      const files = await listAll(directoryRef);
      return Promise.all(files.items.map((item) => getDownloadURL(item)));
    } catch (error) {
      console.error(`Error fetching file URLs in ${directory}: ${error}`);
      throw error;
    }
  }

  /**
   * Uploads file to a specific path.
   * @param file - File to upload.
   * @param fileURL - Storage file URL (e.g., 'images/gallery/img.jpg').
   * @param metadata - Custom file metadata.
   * @returns An instance of UploadTask.
   */
  uploadFile(
    file: File,
    fileURL: string,
    metadata?: UploadMetadata
  ): UploadTask {
    const storageRef = ref(this.storage, fileURL);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    return uploadTask;
  }
}
