/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { InputValues } from "@google-labs/graph-runner";

import jsonata from "jsonata";

type JsonataInput = {
  expression: string;
  json: unknown;
  raw: boolean;
};

export default async (inputs: InputValues) => {
  const { expression, json, raw } = inputs as JsonataInput;
  if (!expression) throw new Error("Jsonata node requires `expression` input");
  if (!json) throw new Error("Jsonata node requires `json` input");
  const express = jsonata(expression);

  const moves : string[] = [];
  var parsedJson = json;
  if (typeof parsedJson === 'string') {
    parsedJson = JSON.parse(parsedJson);

    for (var key in parsedJson as Map<string, string>) {
      if (key.includes("move")) {
        moves.push(parsedJson[key as keyof typeof parsedJson]);
      }
    }
  }
  parsedJson = parsedJson as Object;
  
  const result = await express.evaluate(parsedJson);
  console.log(json);
  console.log(expression);
  var res = raw ? result : {result: result};
  if (moves) {
    res = {result: result, moves: moves};
  }
  console.log(res);
  return res;
};
