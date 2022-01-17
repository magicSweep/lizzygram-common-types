import { compose, cond, elif, justReturn } from "fmagic";
import {
  Photo,
  FirestoreDate,
  TagsData,
  DateUTCString,
  JsonString,
} from "./../types";
import {
  isObject,
  isValidFileFormat,
  hasProperties,
  hasTrueValue,
  maxFileSizeMB,
  fromBytesToMB,
} from "./helper";

export const photoFileFormats = ["jpeg", "png", "jpg", "webp"];
export const maxPhotoFileSize = 21; // MB

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
        isObject(file) === false || hasProperties(["mimetype"], file) === false,
      (file: Express.Multer.File) =>
        `Неверный тип файла - ${JSON.stringify(file)}`,
    ],

    [
      (file: Express.Multer.File) =>
        isValidFileFormat(photoFileFormats, file.mimetype) === false,
      (file: Express.Multer.File) =>
        `Файл должен быть типа: ${photoFileFormats.join(", ")} | ${
          file.mimetype
        }`,
    ],

    [() => true, () => true],
  ]
);

/*  export const isValidPhotoFileBackend = cond<Express.Multer.File, string | true>(
  [
    [
      (file: Express.Multer.File) =>
        isNotObjOrNull(file) || file.mimetype === undefined,
      (file: Express.Multer.File) =>
        `Неверный тип файла - ${JSON.stringify(file)}`,
    ],

    [
      (file: Express.Multer.File) =>
        isValidFileFormat(photoFileFormats, file.mimetype) === false,
      (file: Express.Multer.File) =>
        `Файл должен быть типа: ${photoFileFormats.join(", ")} | ${file.mimetype}`,
    ],

    [() => true, () => true],
  ]
);  */

export const isValidPhotoFileFrontend = cond<File, string | true>([
  [
    (file: File) =>
      isObject(file) === false ||
      hasProperties(["type", "size"], file) === false,
    (file: File) => `Неверный тип файла - ${JSON.stringify(file)}`,
  ],

  [
    (file: File) => isValidFileFormat(photoFileFormats, file.type) === false,
    (file: File) =>
      `Файл должен быть типа: ${photoFileFormats.join(", ")} | ${file.type}`,
  ],

  [
    (file: File) => file.size === undefined,
    (file: File) => `Неверный тип файла - ${JSON.stringify(file)}`,
  ],
  [
    (file: File) => maxFileSizeMB(maxPhotoFileSize, file.size) === false,
    (file: File) =>
      `Максимальный размер файла ${maxPhotoFileSize} Mb. | ${file.size}`,
  ],
  [() => true, () => true],
]);

/* export const isValidPhotoFileFrontend = compose<File, string | true>(
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
); */

export const isValidDesc = (val: string) => {
  //console.log("VALIDATE", val);
  if (typeof val !== "string") return "Какая-то ошибочка... | -23678- ";
  if (val !== undefined && val.length > 1200) return "Слишком длинно...";
  return true;
};

export const isValidTags = cond<TagsData, string | true>([
  [
    (tags: TagsData) => isObject(tags) === false,
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
