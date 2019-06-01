import { EOL } from "os";
import chalk from "chalk"
import { Writable as WritableStream } from "stream";
import { Deferred } from "@esfx/async";

chalk.enabled = true
chalk.level = 3

export namespace fmt {
  export const red = chalk.red
  export const green = chalk.green
}

function printLine(message: string) {
  process.stderr.write(message + EOL)
}

export function debug(message: string) {
  printLine(message)
}

export function warn(message: string) {
  printLine(fmt.red(message))
}

export function success(message: string) {
  printLine(chalk.green(message))
}

export async function drain(stream: WritableStream): Promise<void> {
  const deferred = new Deferred<void>()
  stream.on("finish", deferred.callback)
  return deferred.promise
}