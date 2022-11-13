import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

import { storage } from '../firebase/firebase';

class FileService {

  uploadImage(file, onUploadProgress) {
    return new Promise((resolve, reject) => {
      // get a reference to the firebase file location we want to store our file
      const fileRef = ref(storage, 'images/' + this.getUniqueFileName(file));
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {

          // called when an update happens (progress on upload)
          this.handleProgress(snapshot, onUploadProgress);
        },
        (error) => {
          // an error occurred
          reject(this.handleError(error));
        },
        () => {
          // upload complete successful
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        });

    });
  }

  getUniqueFileName(file) {
    const dotIndex = file.name.lastIndexOf('.');
    const fileName = file.name.substring(0, dotIndex);
    const fileExtension = file.name.substring(dotIndex);
    const timestamp = (new Date()).getTime();
    return fileName + '-' + timestamp + fileExtension;
  }

  handleProgress(snapshot, onUploadProgress) {
    // calculate the percentage complete
    const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    if (onUploadProgress) { onUploadProgress(progress); }
  }

  handleError(error) {
    return error.message;
  }


  async deleteFile(downloadUrl) {
    // get a reference to the file we want to remove
    const fileRef = ref(storage, downloadUrl);
    // remove the file using the file reference
    await deleteObject(fileRef);
  }

}

const service = new FileService();
export default service;