import { compose, cond, elif, justReturn } from "fmagic";
import {
  Photo,
  FirestoreDate,
  TagsData,
  DateUTCString,
  JsonString,
} from "./../types";

export const isNotObjOrNull = (type: any) =>
  type === null || typeof type !== "object";

// max - file size in MB, value - file size in bytes
export const maxFileSizeMB = (max: number, val: number) =>
  fromBytesToMB(val) <= max;

export const fromBytesToMB = (bytes: number) => {
  if (bytes === 0) return 0;

  return bytes / (1024 * 1024);
};

// @type - MIME type like image/jpeg or application/json
export const isValidFileFormat = (formats: string[], type: string) => {
  const format = type.split("/")[1];

  return formats.includes(format);
};

export const hasTrueValue = (obj: any) => {
  for (let prop in obj) {
    if (obj[prop] === true) return true;
  }

  return false;
};

export const isValidDate = cond<DateUTCString, true | string>([
  //[(val: string) => val === undefined, (val: Date) => true],
  [
    (val: string) => typeof val !== "string",
    (val: string) => {
      return `Неверный формат даты | ${val}`;
    },
  ],
  [
    (val: string) => new Date(val).toString() === "Invalid Date",
    (val: string) => {
      return `Некорректная дата | ${val}`;
    },
  ],
  [
    (val: string) => new Date(val) > new Date(),
    (val: string) => {
      return `Фотка сделана в будущем? | ${val}`;
    },
  ],
  [
    (val: string) => new Date(val) < new Date("2018-07-08"),
    (val: string) => {
      return `До дня рождения? | ${val}`;
    },
  ],
  [() => true, () => true],
]);

export const isValidPhotoFileBackend = cond<Express.Multer.File, string | true>(
  [
    [
      (file: Express.Multer.File) =>
        isNotObjOrNull(file) || file.mimetype === undefined,
      (file: Express.Multer.File) =>
        `Неверный тип файла - ${JSON.stringify(file)}`,
    ],

    [
      (file: Express.Multer.File) =>
        isValidFileFormat(["jpeg", "png", "jpg"], file.mimetype) === false,
      (file: Express.Multer.File) =>
        `Файл должен быть типа: jpeg, png, jpg | ${file.mimetype}`,
    ],

    [() => true, () => true],
  ]
);

export const isValidPhotoFileFrontend = compose<
  Express.Multer.File,
  string | true
>(
  (file: Express.Multer.File) => ({
    file,
    validRes: isValidPhotoFileBackend(file),
  }),
  elif<{ file: Express.Multer.File; validRes: string | true }, string | true>(
    (data: { file: Express.Multer.File; validRes: string | true }) =>
      data.validRes === true,
    (data: { file: Express.Multer.File; validRes: string | true }) =>
      cond<Express.Multer.File, string | true>([
        [
          (file: Express.Multer.File) => file.size === undefined,
          (file: Express.Multer.File) =>
            `Неверный тип файла - ${JSON.stringify(file)}`,
        ],
        [
          (file: Express.Multer.File) => maxFileSizeMB(21, file.size) === false,
          (file: Express.Multer.File) =>
            `Максимальный размер файла 21 Mb. | ${file.size}`,
        ],
        [() => true, () => true],
      ])(data.file),
    (data: { file: Express.Multer.File; validRes: string | true }) =>
      data.validRes
  )
);
/* 
(file: Express.Multer.File) => {
  if (file === undefined) return `We've got no photo file`;

  if (
    file === null ||
    typeof file !== "object" ||
    file.mimetype === undefined
    // || file.size === undefined
  )
    return `Wrong file - ${JSON.stringify(file)}`;

  /* 
    // FILE SIZE WE CHECK WITH MULTER LIMITS 
    if (isLessThanMaxFileSizeMB(21, file.size) === false) {
      return `Максимальный размер файла 21 Mb. | ${file.size}`;
    } /

  if (isValidFileFormat(["jpeg", "png", "jpg"], file.mimetype) === false) {
    return `Файл должен быть типа: jpeg, png, jpg | ${file.mimetype}`;
  }

  return true;
}; */

export const isValidDesc = (val: string) => {
  //console.log("VALIDATE", val);
  if (typeof val !== "string") return "Какая-то ошибочка... | -23678- ";
  if (val !== undefined && val.length > 1200) return "Слишком длинно...";
  return true;
};

/* compose(
    (tags: JsonString) => {
      try {
        return JSON.parse(tags);
      } catch (err) {
        //console.error("Can not parse tags", JSON.stringify(tags));
        return null;
      }
    }, */
export const isValidTags = cond([
  [
    isNotObjOrNull,
    (tags: TagsData) =>
      `Какая-то ошибочка... | -2342- | ${JSON.stringify(tags)}`,
  ],
  [
    (tags: TagsData) => true,
    (tags: TagsData) =>
      hasTrueValue(tags) === true
        ? true
        : `Добавьте хотя бы один тэг. | ${JSON.stringify(tags)}`,
  ],
]);
