import {Board, Node, LogProbe, DebugProbe, RunResult} from '@google-labs/breadboard';
import {Starter} from '@google-labs/llm-starter';

(window as any)['breadboard'] = {
  Board,
  Node,
  LogProbe,
  DebugProbe,
  RunResult,
  Starter,
}
