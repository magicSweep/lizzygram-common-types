export type ResponseStatus = "successs" | "error";

export type JsonString = string;
// Date.toUTCString();
export type DateUTCString = string;

export type WorkerResponse = {
  status: ResponseStatus;
  data?: {
    [name: string]: any;
  };
  error?: {
    msg: string;
    code?: number;
  };
};

// type for backend
export type WorkerRequest = {
  photoFile: Express.Multer.File;
  photoId: string;
  userUid: string;
  description?: string;
  date?: DateUTCString;
  tags?: JsonString;
};

export type TagsData = { [id: string]: true };

// COMMON TYPES
export type ImgExt = "jpeg" | "jpg" | "png";
export type FirestoreDate = {
  toDate: () => Date;
};

export interface Photo<T> {
  id: any;
  base64: string;

  files: string[];
  aspectRatio: number; //1.6
  srcSet: string;
  iconSrc: string;
  src: string;

  _timestamp: Date | FirestoreDate;
  description: string;
  date: T;
  yearsOld: number;
  tags: TagsData;

  googleDriveId: string;
  imageExtention: ImgExt;
  addedByUserUID: string;
  // do we make changes by express
  isActive: boolean;
}
