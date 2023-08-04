/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues } from "@google-labs/graph-runner";

type ContainsStrInputs = {
  texts: string[];
  pattern: string;
};

export default async (inputs: InputValues) => {
  const values = inputs as ContainsStrInputs;
  var blah = values.texts.find((text) => {return text === values.pattern;});

  console.log("KEX: Containts?: " + blah);
  return blah ? { result: true} : {};
};

