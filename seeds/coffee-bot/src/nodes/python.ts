/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-nocheck
import type { InputValues } from "@google-labs/graph-runner";

import {exec, execSync} from 'child_process';
import * as fs from 'fs';
import { python } from 'pythonia'


async function runPython(code: string, args: string[]) {
    console.log("KEX: About to exe ute python!");
    fs.writeFileSync('temp_script.py', code);
    var cmd = 'python3 temp_script.py';
    args.forEach((arg) => {cmd = cmd + ' ' + arg;});
    const res = execSync(cmd).toString();
    console.log(res);
    console.log("KEX: Finished executingp ythong!");
    return res;
}
async function runPythonFile(path: string, args: string[]) {
    console.log("KEX: About to execute python script");
    var cmd = "python3 " + path;
    args.forEach((arg) => {cmd = cmd + ' ' + arg;});
  
    /*let shell = new PythonShell('script.py', { mode: 'text'});
    shell.send('hello world!');*/

    //const res = execSync(cmd).toString();

    
    const pythonScript = await python(path)
    console.log("Loaded up python!");
    const output = await pythonScript.main(args);
    // All Python API access must be prefixed with await
    /*
    const root = await pythonScript()
    // A function call with a $ suffix will treat the last argument as a kwarg dict
    const a = await tk.Label$(root, { text: 'Hello World' })
    await a.pack()
    await root.mainloop()*/
    python.exit();
    //console.log(res);
    console.log("KEX: Finished executing python script: " + output);
    return output;
}

export default async (inputs: InputValues) => {
  console.log("KEX: python code: " + inputs.code);
  console.log("KEX: inputs: " + inputs);
  const args = [
    (inputs.agent ?? "") as string,
    (inputs.api ?? "") as string,
    (inputs.user ?? "") as string,
    (inputs.context ?? "") as string,
  ];
  if (inputs.code) {
    const stdout = await runPython(inputs.code as string, args);
    return {output: stdout};
  }
  if (inputs.file) {
    const stdout = await runPythonFile(inputs.file as string, args);
    return {output: stdout};
  }
};
