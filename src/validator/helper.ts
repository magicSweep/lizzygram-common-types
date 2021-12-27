// @type - MIME type like image/jpeg or application/json
export const isValidFileFormat = (formats: string[], type: string) => {
  const format = type.split("/")[1];

  return formats.includes(format);
};

export const isObject = (type: any) => {
  if (type === null) return false;
  if (typeof type !== "object") return false;

  return true;
};

export const hasProperties = (properties: string[], obj: any) => {
  for (let prop of properties) {
    if (obj[prop] === undefined) return false;
  }

  return true;
};

export const hasTrueValue = (obj: any) => {
  for (let prop in obj) {
    if (obj[prop] === true) return true;
  }

  return false;
};

// max - file size in MB, value - file size in bytes
export const maxFileSizeMB = (max: number, val: number) =>
  fromBytesToMB(val) <= max;

export const fromBytesToMB = (bytes: number) => {
  if (bytes === 0) return 0;

  return bytes / (1024 * 1024);
};
