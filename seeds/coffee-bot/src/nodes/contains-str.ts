/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues } from "@google-labs/graph-runner";
import { GenerateTextResponse, Text, palm } from "@google-labs/palm-lite";

type ContainsStrInputs = {
  texts: string[];
  pattern: string;
};

export default async (inputs: InputValues) => {
  const values = inputs as ContainsStrInputs;
  var blah = false;
  blah = values.texts.find((text) => {return text === values.pattern;}) === undefined;

  return blah ? { result: blah} : {};
};

