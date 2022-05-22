export type BuildFor = "lizzygram" | "portfolio";

//export type ResponseStatus = "success" | "error";

export type JsonString = string;
// Date.toUTCString();
export type DateUTCString = string;

export type WebImagesInfo = {
  ids: string[];
  urls?: Map<number, string>;
};

// RESPONSE | REQUEST

export type WorkerResponse<T> = {
  //status: ResponseStatus;
  data: T;
  /* error?: {
    msg: string;
    code?: number;
  }; */
};

// type for backend
/* export type WorkerRequest = {
  photoFile: Express.Multer.File;
  photoId: string;
  userUid: string;
  description?: string;
  date?: DateUTCString;
  tags?: JsonString;
}; */

export type MainRequestData = {
  file: any;
};

export type MainResponseData = Pick<
  Photo<any>,
  "base64" | "aspectRatio" | "imageExtention" | "googleDriveId"
> & {
  /*  base64: string;
  aspectRatio: number;
  imageExtention: string;
  googleDriveId: string; */
  webImagesInfo: WebImagesInfo;
};

export type CleanUpRequestData = Pick<Photo<any>, "googleDriveId"> & {
  webImagesInfo: WebImagesInfo;
};

////////////////////////////

export type TagsData = { [id: string]: true };

export type FavoriteData = { [userUid: string]: true };

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
  favoriteBy?: FavoriteData;
  // do we make changes by express
  isActive: boolean;
}
