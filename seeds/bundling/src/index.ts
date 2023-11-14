import {Board, Node, LogProbe, DebugProbe, RunResult} from '@google-labs/breadboard';
import {Starter} from '@google-labs/llm-starter';

export * from '@google-labs/breadboard';
export * from '@google-labs/llm-starter';

export type Foo = string;

export const breadboard = {
  Board,
  Node,
  LogProbe,
  DebugProbe,
  RunResult,
  Starter,
};

(window as any)['breadboard'] = breadboard;
