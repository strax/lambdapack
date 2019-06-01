import { Deferred } from "@esfx/async"
import { exec as execF } from "child_process"

export async function exec(command: string): Promise<string> {
  const deferred = new Deferred<string>()
  execF(command, (error, stdout, stderr) => {
    if (error) {
      process.stderr.write(stderr)
      deferred.reject(error)
    } else {
      deferred.resolve(stdout)
    }
  })
  return deferred.promise
}