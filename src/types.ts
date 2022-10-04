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

// WEB VIDEOS

export type WebVideoInfo = {
  id: string;
  thumbnailsUrl: string;
};

// file fieldName - file
export type WebVideosReqBody = {
  // video id for update
  id?: string;
  title: string;
  description?: string;
};

export type WebVideosResponse = {
  status: "success" | "error";
  data?: WebVideoInfo;
  // youtube errors - we must show to our user
  message?: "Token expires" | "Quota exceeded";
};

// WEB PHOTOS
export type WebPhotosFileFieldName = "file";

export type WebPhotosCleanupReq = {
  webImagesInfo: WebImagesInfo;
};

export type WebPhotosResponseData = Pick<
  Photo<any>,
  "base64" | "aspectRatio" | "imageExtension" | "googleDriveId"
> & {
  webImagesInfo: WebImagesInfo;
};

// ORIGINAL PHOTO STORE

////////////////////////////

export type TagsData = { [id: string]: true };

export type FavoriteData = { [userUid: string]: true };

// COMMON TYPES
export type ImgExt = "jpeg" | "jpg" | "png";

export type FirestoreDate = {
  toDate: () => Date;
};

export type Media<T> = {
  id: any;

  _timestamp: Date | FirestoreDate;
  description: string;
  date: T;
  yearsOld: number;
  tags: TagsData;

  addedByUserUID: string;
  favoriteBy?: FavoriteData;
  // do we make changes by express
  isActive: boolean;
};

export type Photo<T> = Media<T> & {
  base64: string;
  files: string[];
  aspectRatio: number; //1.6
  srcSet: string;
  iconSrc: string;
  src: string;

  googleDriveId: string;
  imageExtension: ImgExt;
};

export type Video<T> = Media<T> & {
  videoId: string;
  thumbnailsUrl: string;
};
