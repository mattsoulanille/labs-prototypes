/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues } from "@google-labs/graph-runner";
import internal from "stream";
import { setTimeout } from "timers/promises";

const substitute = (template: string, values: Record<string, string>) => {
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(`{{${key}}}`, value),
    template
  );
};

const parametersFromTemplate = (template: string): string[] => {
  const matches = template.matchAll(/{{(?<name>\w+)}}/g);
  const parameters = Array.from(matches).map(
    (match) => match.groups?.name || ""
  );
  return parameters;
};

type ApiCallInputs = {
  url: string;
  method: string;
  headers: any;
  body: string;
  num_retries: number;
  retry_delay_ms: number;
  expected_value: string;
};

export default async (inputs: InputValues) => {
  const values = inputs as ApiCallInputs;
  if (!values.url)
    throw new Error("API Call requires `url` input");
  if (!values.method) throw new Error("API Call requires `method` input");
  var body_input = null;
  if (values.method.toUpperCase() !== "GET") {
    body_input = JSON.stringify(values.body);
  }
  const parameters = parametersFromTemplate(values.url);
  const substitutes = parameters.reduce((acc, parameter) => {
    if (inputs[parameter] === undefined)
      throw new Error(`Input is missing parameter "${parameter}"`);
    return { ...acc, [parameter]: inputs[parameter] };
  }, {});
  const url = substitute(values.url, substitutes);

  var num_retries = values.num_retries ? values.num_retries : 1;
  console.log("URL: " + url + " Body input: " + body_input + " Num retries: " + num_retries);

  while (num_retries > 0) {

    const response = await fetch(url, {
      method: values.method,
      body: body_input,
      headers: values.headers
    });
    console.log("Made API request with body: " + values.body as string);
    if (response.body !== null) {
      var body = await response.json();
      console.log(body);
      //const asString = new TextDecoder("utf-8").decode(response.body);
      console.log(JSON.stringify(body));
      console.log("Received API response: " + body + " versus: " + values.expected_value);
      if (values.expected_value === undefined || JSON.stringify(body) === values.expected_value) {
        console.log("Successfully returning?");
        return {success: true, response: body};
      }
      console.log("Did not match expected");
    }
    num_retries = num_retries - 1;
    await setTimeout(values.retry_delay_ms);
  }
  console.log("Failed to connect");
  return {};
};

