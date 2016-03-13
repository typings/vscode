import * as fs from 'fs';
import {ConfigJson} from 'typings-core';

namespace Config {
  export function read(path: string): ConfigJson  {
    return fs.readFileSync(path) as ConfigJson;
  }
}

export default Config;
