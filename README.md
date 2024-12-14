# @tscircuit/run-snippet

Run tscircuit snippets using the eval-webworker.

## Installation

```bash
bun add @tscircuit/run-snippet
# or
npm install @tscircuit/run-snippet
# or
yarn add @tscircuit/run-snippet
```

## Usage

```typescript
import { runSnippet } from "@tscircuit/run-snippet"

// Run a simple circuit snippet
const circuit = await runSnippet({
  code: `
    import { Circuit } from "@tscircuit/builder"

    const circuit = new Circuit()
    circuit.addResistor({ value: "1kΩ" })

    export default circuit
  `
})

// Run a circuit with multiple files
const multiFileCircuit = await runSnippet({
  code: `
    import { myResistor } from "./resistor"
    import { Circuit } from "@tscircuit/builder"

    const circuit = new Circuit()
    circuit.add(myResistor)

    export default circuit
  `,
  files: {
    "./resistor.ts": `
      export const myResistor = {
        type: "resistor",
        value: "1kΩ"
      }
    `
  }
})

// Configure the snippets API and verbosity
const customConfigCircuit = await runSnippet({
  code: "...",
  snippetsApiBaseUrl: "https://custom-api.example.com",
  verbose: true
})
```

## API

### `runSnippet(options: RunSnippetOptions)`

Runs a tscircuit snippet using the eval-webworker and returns the circuit JSON.

#### Options

- `code` (string): The main circuit code to evaluate
- `files` (Record<string, string>): Optional additional files that can be imported by the main code
- `snippetsApiBaseUrl` (string): Optional URL for the snippets API (defaults to "https://api.tscircuit.com")
- `verbose` (boolean): Optional flag to enable verbose logging (defaults to false)

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Type check
bun run typecheck

# Format code
bun run format
```

## License

MIT
