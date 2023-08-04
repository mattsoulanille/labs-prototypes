/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues } from "@google-labs/graph-runner";

type RegexInputs = {
  texts: string[];
  text: string;
  pattern: string;
};

export default async (inputs: InputValues) => {
  const values = inputs as RegexInputs;
  const regex = new RegExp(values.pattern);
  const output = regex.exec(values.text);
  if (output) return {match: output[0], groups: output.slice(1), match1: output[1]};
  return { output};
};

