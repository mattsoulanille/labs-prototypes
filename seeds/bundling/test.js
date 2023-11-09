const graph = {
  "edges": [
    {
      "from": "input_3n333n",
      "to": "compute",
      "out": "code",
      "in": "code"
    },
    {
      "from": "compute",
      "to": "output_p5p6l8",
      "out": "result",
      "in": "value"
    }
  ],
  "nodes": [
    {
      "id": "compute",
      "type": "runJavascript",
      "raw": false
    },
    {
      "id": "output_p5p6l8",
      "type": "output",
    },
    {
      "id": "input_3n333n",
      "type": "input",
    }
  ]
};



const board = await breadboard.Board.fromGraphDescriptor(graph);
board.kits.push(new breadboard.Starter());

const code = `
function run() {
  throw new Error('Oh no!');
}
`;

try {
  for await (const result of board.run()) {
    if (result.type === 'input') {
      result.inputs = {code};
    }
  }
} catch (err) {
  console.log('Error caught');
  console.log(err);
}
