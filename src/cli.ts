import { EOL } from "os";
import { generateArtifactList } from "./sources";
import Path from "path"
import { pack } from "./pack";
import { debug, success, drain, warn } from "./utils";

function abort(message: string): never {
  process.stderr.write(message + EOL)
  return process.exit(1)
}

async function main(args: string[]) {
  if (!args[2]) {
    return abort(`Usage: lambdapack <path>`)
  }
  const sourcePath = Path.resolve(process.cwd(), args[2])
  debug(`source path: ${sourcePath}`)
  const artifacts = await generateArtifactList(sourcePath)
  const output = await pack(artifacts)
  output.pipe(process.stdout)
  await drain(output)
}

process.on("unhandledRejection", err => {
  warn(String(err))
  process.exit(1)
})

main(process.argv)