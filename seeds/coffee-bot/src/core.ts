/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Nodes that are commonly used in Generative Applications.
 */
import apiCall from "./nodes/api-call.js";
import containsStr from "./nodes/contains-str.js";
import notLogic from "./nodes/not-logic.js";
import getField from "./nodes/get-field.js";
import python from "./nodes/python.js";

export const coffeeHandlers = {
  "api-call": apiCall,
  "contains-str": containsStr,
  "not-logic": notLogic,
  "get-field": getField,
  "python": python,
};
