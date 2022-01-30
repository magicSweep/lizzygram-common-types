import { BuildFor } from "../types";

let GATSBY_BUILD_FOR: BuildFor | "" = "";

export const getBuildFor = () => {
  if (GATSBY_BUILD_FOR === "")
    GATSBY_BUILD_FOR = process.env.GATSBY_BUILD_FOR as BuildFor;

  if (GATSBY_BUILD_FOR === undefined) {
    console.error(
      "Do you forgot to initialize GATSBY_BUILD_FOR env variable?!"
    );
  }

  return GATSBY_BUILD_FOR;
};
