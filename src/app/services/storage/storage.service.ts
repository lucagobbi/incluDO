import { Injectable } from '@angular/core';
import {getDownloadURL, ref, Storage, uploadBytes} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  uploadDoc(file: File, userId: string) {
    const storageRef = ref(this.storage, `cv/${userId}`);
    return uploadBytes(storageRef, file);
  }

  getDocURL(path: string) {
    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef);
  }

}
