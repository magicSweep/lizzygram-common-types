import {
  isValidDate,
  isValidTags,
  isValidPhotoFileBackend,
  isValidDesc,
  isValidPhotoFileFrontend,
} from ".";
import wait from "waait";

//const wait = () => new Promise(resolve => setTimeout(resolve, 0));

/* test.only("test", async () => {
  const f = (one: any, two: any) => {
    throw new Error("Hello");
    return one + two;
  };

  const withAsync = async (res: any) => {
    return res;
  };

  let res;

  withAsync(f(1, 2))
    .then((r) => {
      res = r;
    })
    .catch((err) => "Error");

  await wait(100);

  expect(res).toEqual(3);
}); */

describe("isValidDate", () => {
  const possibilities = [
    { count: 0, date: undefined, expected: "Неверный формат даты | undefined" },
    {
      count: 1,
      date: new Date().toUTCString(),
      expected: true,
    },

    { count: 2, date: "hello", expected: "Некорректная дата | hello" },
    { count: 3, date: "", expected: "Некорректная дата | " },

    { count: 4, date: null as any, expected: "Неверный формат даты | null" },

    { count: 5, date: 13 as any, expected: "Неверный формат даты | 13" },

    {
      count: 6,
      date: new Date("2016-07-08").toUTCString(),
      expected: "До дня рождения? | Fri, 08 Jul 2016 00:00:00 GMT",
    },
    {
      count: 7,
      date: new Date("2034-07-08").toUTCString(),
      expected: "Фотка сделана в будущем? | Sat, 08 Jul 2034 00:00:00 GMT",
    },
  ];

  test.each(possibilities)(" - ${count}", ({ date, expected }) => {
    expect(isValidDate(date)).toBe(expected);
  });
});

describe("isValidTags", () => {
  const possibilities = [
    {
      count: 0,
      tags: undefined,
      expected: "Какая-то ошибочка... | -2342- | undefined",
    },
    {
      count: 1,
      tags: { hello: false, bye: false },
      expected: 'Добавьте хотя бы один тэг. | {"hello":false,"bye":false}',
    },
    {
      count: 2,
      tags: { hello: true, bye: false },
      expected: true,
    },
    {
      count: 3,
      tags: 13 as any,
      expected: "Какая-то ошибочка... | -2342- | 13",
    },
    {
      count: 4,
      tags: null as any,
      expected: "Какая-то ошибочка... | -2342- | null",
    },
    {
      count: 5,
      tags: {},
      expected: "Добавьте хотя бы один тэг. | {}",
    },
  ];

  test.each(possibilities)(" - ${count}", ({ count, tags, expected }) => {
    expect(isValidTags(tags)).toBe(expected);
  });
});

describe("isValidPhotoFileBackend", () => {
  const possibilities = [
    {
      count: 0,
      photoFile: undefined as any,
      expected: "Неверный тип файла - undefined",
    },
    // mimetype, size
    {
      count: 1,
      photoFile: {
        mimetype: "application/json",
        size: 123,
      },
      expected: "Файл должен быть типа: jpeg, png, jpg | application/json",
    },
    /*  {
        count: 2,
        photoFile: {
          mimetype: "image/png",
          size: 120001024,
        },
        expected: "Максимальный размер файла 21 Mb. | 120001024",
      }, */

    {
      count: 3,
      photoFile: null,
      expected: "Неверный тип файла - null",
    },

    {
      count: 4,
      photoFile: {},
      expected: "Неверный тип файла - {}",
    },

    {
      count: 5,
      photoFile: 13,
      expected: "Неверный тип файла - 13",
    },

    {
      count: 6,
      photoFile: {
        mimetype: "image/png",
        size: 12001024,
      },
      expected: true,
    },
  ];

  test.each(possibilities)(" - ${count}", ({ count, photoFile, expected }) => {
    expect(isValidPhotoFileBackend(photoFile)).toBe(expected);
  });
});

describe("isValidPhotoFileFrontend", () => {
  const possibilities = [
    {
      count: 0,
      photoFile: undefined as any,
      expected: "Неверный тип файла - undefined",
    },
    // mimetype, size
    {
      count: 1,
      photoFile: {
        mimetype: "application/json",
        size: 123,
      },
      expected:
        'Неверный тип файла - {"mimetype":"application/json","size":123}',
    },
    {
      count: 1,
      photoFile: {
        type: "application/json",
        size: 123,
      },
      expected: "Файл должен быть типа: jpeg, png, jpg | application/json",
    },
    {
      count: 2,
      photoFile: {
        type: "image/png",
        size: 120001024,
      },
      expected: "Максимальный размер файла 21 Mb. | 120001024",
    },

    {
      count: 3,
      photoFile: null,
      expected: "Неверный тип файла - null",
    },

    {
      count: 4,
      photoFile: {},
      expected: "Неверный тип файла - {}",
    },

    {
      count: 5,
      photoFile: 13,
      expected: "Неверный тип файла - 13",
    },

    {
      count: 6,
      photoFile: {
        type: "image/png",
        size: 12024,
      },
      expected: true,
    },
  ];

  test.each(possibilities)(" - ${count}", ({ count, photoFile, expected }) => {
    expect(isValidPhotoFileFrontend(photoFile)).toBe(expected);
  });
});

describe("isValidDesc", () => {
  const possibilities = [
    {
      count: 0,
      desc: 123,
      expected: "Какая-то ошибочка... | -23678- ",
    },

    {
      count: 1,
      desc: "super desc",
      expected: true,
    },
  ];

  test.each(possibilities)(" - ${count}", ({ desc, expected }) => {
    expect(isValidDesc(desc as any)).toBe(expected);
  });
});
