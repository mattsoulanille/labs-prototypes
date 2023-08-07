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
  /**
   * Harm filter setting for Palm.
   */
  HARM_CATEGORY_DEROGATORY: string;
  /**
   * Number of candidates to return with. Defaults to 1.
   */
  candidate_count: number;
};

export default async (inputs: InputValues) => {
  const values = inputs as TextCompletionInputs;
  if (!values.API_KEY)
    throw new Error("Text completion requires `API_KEY` input");
  if (!values.text) throw new Error("Text completion requires `text` input");

  const prompt = new Text().text(values.text);
  if (values.HARM_CATEGORY_DEROGATORY) {
    prompt.addSafetySetting(
      "HARM_CATEGORY_DEROGATORY",
      "BLOCK_MEDIUM_AND_ABOVE"
    );
  }
  if (values.candidate_count) {
    prompt.candidateCount = values.candidate_count;
  }

  const stopSequences = values["stop-sequences"] || [];
  //stopSequences.forEach((stopSequence) => prompt.addStopSequence(stopSequence));
  const request = palm(values.API_KEY).text(prompt);
  const data = await fetch(request);
  const response = (await data.json()) as GenerateTextResponse;
  //const completion = processResponse(response) as string;
  const completion = response?.candidates?.[0]?.output as string;
  const candidates: string[] = [];
  response?.candidates?.forEach((candidate) => {
    candidates.push(candidate.output ? candidate.output : "");
  });
  return { completion, candidates };
};
