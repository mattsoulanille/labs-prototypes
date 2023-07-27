/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-nocheck

import type { InputValues } from "@google-labs/graph-runner";
import { GenerateTextResponse, Text, palm } from "@google-labs/palm-lite";

export default async (inputs: InputValues) => {
  var something = inputs.data;
  return { value: something["key"]};
};

