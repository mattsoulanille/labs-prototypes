import sys
agent = sys.argv[1] if len(sys.argv) > 2 else ""
api = sys.argv[2] if len(sys.argv) > 3 else ""
user = sys.argv[3] if len(sys.argv) > 4 else ""
output = 'b'
if agent:
  output = output + agent + '\n'
if api:
  output = output + 'API: ' + api + '\n'
if user:
  output = output + 'Customer: ' + user + '\n'
print(output)

def main(args):
  agent = args[0]
  api = args[1]
  user = args[2]
  context = args[3]
  output = context
  if agent:
    output = output + agent + '\n'
  if api:
    output = output + 'API: ' + api + '\n'
  if user:
    output = output + 'Customer: ' + user + '\n'
  return output
