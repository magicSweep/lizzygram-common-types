import { BuildFor } from "../types";

let BUILD_FOR: BuildFor | "" = "";

export const getBuildFor = () => {
  if (BUILD_FOR === "") BUILD_FOR = process.env.BUILD_FOR as BuildFor;

  if (BUILD_FOR === undefined) {
    console.error("Do you forgot to initialize BUILD_FOR env variable?!");
  }

  return BUILD_FOR;
};
