import Path from "path"
import { promises as FS } from "fs"

export class Manifest {
  constructor(private json: any) {
  }

  get name(): string {
    return this.json.name
  }

  get files(): readonly string[] {
    return this.json.files || []
  }
}

export async function manifestForPath(path: string) {
  const manifestPath = Path.join(path, "package.json")
  return new Manifest(JSON.parse(await FS.readFile(manifestPath, { encoding: "utf-8" })))
}