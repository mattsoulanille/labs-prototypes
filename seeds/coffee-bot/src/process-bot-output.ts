/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenerateTextResponse } from "@google-labs/palm-lite";

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
  