import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./src/fake-loader/fake-loader.js", pathToFileURL("./"));
