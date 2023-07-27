/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues } from "@google-labs/graph-runner";
import { GenerateTextResponse, Text, palm } from "@google-labs/palm-lite";

type TextCompletionInputs = {
  /**
   * Prompt for text completion.
   */
  text: string;
  /**
   * The Google Cloud Platform API key
   */
  API_KEY: string;
  /**
   * Stop sequences
   */
  "stop-sequences": string[];
};

/**
 * Prompt response.
 */
export interface LlmResponse {
  thought: string;
  move1: string;
  move2: string;
  move3: string;
  move4: string;
  orderType: string;
  response: string;
  currentOrder: Array<{drink: string, modifiers: Array<{mod: string}>}>;
}


function _convertOrderToPrint(llmResponse: LlmResponse): string[] {
  const orderToPrint: string[] = [];
  if (!llmResponse.currentOrder) return orderToPrint;
  orderToPrint.push('Name: ' + "kevxiao" + '@');
  if (llmResponse.orderType) {
    orderToPrint.push(llmResponse.orderType.toUpperCase());
  } else {
    orderToPrint.push('for here');
  }
  for (const currentOrder of llmResponse.currentOrder) {
    orderToPrint.push('x1 ' + currentOrder.drink);
    if (currentOrder.modifiers) {
      for (const modifier of currentOrder.modifiers) {
        if (modifier.mod) {
          orderToPrint.push('   - ' + modifier.mod);
        }
      }
    }
  }
  return orderToPrint;
}

function processResponse(generateResponse: GenerateTextResponse): string | undefined {
  if (!generateResponse.candidates) {
    console.log("no candidates?");
    return;
  }
  for (const message of generateResponse.candidates!) {
    let rawResponse = message.output;
    if (!rawResponse) {
      console.log("KEX: No rawresponse. Skipping.");
      continue;
    }
    // Remove anything before the first '{' since this will fail parsing.
    rawResponse = rawResponse.substring(rawResponse.indexOf('{'));
    try {
      const llmResponse = JSON.parse(rawResponse) as LlmResponse;
      if (!llmResponse.thought) continue;
      console.log(rawResponse);
      return rawResponse;
      break;
    } catch (err) {
      console.log('Parse error: ', rawResponse, err);
      continue;
    }
  }
  console.log('No valid messages returned');
}

export default async (inputs: InputValues) => {
  const values = inputs as TextCompletionInputs;
  if (!values.API_KEY)
    throw new Error("Text completion requires `API_KEY` input");
  if (!values.text) throw new Error("Text completion requires `text` input");

  const prompt = new Text().text(values.text);
  if (inputs.HARM_CATEGORY_DEROGATORY) {
    prompt.addSafetySetting("HARM_CATEGORY_DEROGATORY", "BLOCK_MEDIUM_AND_ABOVE");
  }
  prompt.candidateCount = 8;
  const stopSequences = values["stop-sequences"] || [];
  //stopSequences.forEach((stopSequence) => prompt.addStopSequence(stopSequence));
  const request = palm(values.API_KEY).text(prompt);
  const data = await fetch(request);
  const response = (await data.json()) as GenerateTextResponse;
  const completion = processResponse(response) as string;
  //const candidates: string[] = [];
  //response?.candidates?.forEach((candidate) => {candidates.push(candidate.output ? candidate.output : "");});
  return { completion };
};

