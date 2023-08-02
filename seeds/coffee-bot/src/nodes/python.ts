/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues } from "@google-labs/graph-runner";

import {exec, execSync} from 'child_process';
import * as fs from 'fs';


async function runPython(code: string, args: string[]) {
    console.log("KEX: About to exe ute python!");
    fs.writeFileSync('temp_script.py', code);
    var cmd = 'temp_script.py';
    args.forEach((arg) => {cmd = cmd + ' ' + arg;});
    
    /*
    await exec('python3 temp_script.py', (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
        }
        else if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        else {
          console.log(stdout);
        }
      });
    */
    const res = execSync(cmd).toString();
    console.log(res);
    console.log("KEX: Finished executingp ythong!");
    return res;
}

export default async (inputs: InputValues) => {
  console.log("KEX: python code: " + inputs.code);
  const args = [
    inputs.agent as string,
    inputs.api as string,
    inputs.user as string,
  ];
  const stdout = await runPython(inputs.code as string, args);
  return {output: stdout};
};
