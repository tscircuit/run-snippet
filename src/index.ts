import { createCircuitWebWorker } from "@tscircuit/eval-webworker"

export interface RunSnippetOptions {
  code: string
  files?: Record<string, string>
  snippetsApiBaseUrl?: string
  verbose?: boolean
}

export async function runSnippet(options: RunSnippetOptions) {
  const { code, files = {}, snippetsApiBaseUrl = "https://api.tscircuit.com", verbose = false } = options

  const worker = await createCircuitWebWorker({
    snippetsApiBaseUrl,
    verbose
  })

  if (Object.keys(files).length > 0) {
    await worker.executeWithFsMap({
      entrypoint: "index.ts",
      fsMap: {
        "index.ts": code,
        ...files
      }
    })
  } else {
    await worker.execute(code)
  }

  await worker.renderUntilSettled()
  return worker.getCircuitJson()
}

export default runSnippet
