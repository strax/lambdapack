import Archiver from "archiver";
import { promises as FS } from "fs";
import Path from "path";
import { PassThrough, Writable as WritableStream } from "stream";
import { debug, success } from "./utils";

const MEGABYTE = 1_000_000 // bytes
const KILOBYTE = 1_000 // bytes

function formatSize(bytes: number) {
  if (bytes > MEGABYTE) {
    const mb = Math.round(bytes / MEGABYTE)
    return `${mb}M`
  } else if (bytes > KILOBYTE) {
    const kb = Math.round(bytes / KILOBYTE)
    return `${kb}K`
  } else {
    return `${bytes}B`
  }
}

export async function pack(paths: ReadonlySet<string>): Promise<WritableStream> {
  const output = new PassThrough()
  const archive = Archiver.create("zip", { zlib: { level: 9 } })

  output.on("end", () => {
    success(`package size: ${formatSize(archive.pointer())}`)
  })

  archive.on("warning", (err) => {
    if (err.code === "ENOENT") {
      console.warn("ENOENT: %s", err.message)
    } else {
      throw err
    }
  })
  
  archive.on("error", err => {
    throw err
  })

  archive.pipe(output)

  for (const path of paths) {
    const relativePath = Path.relative(process.cwd(), path)
    debug(`pack: ${path} -> ${relativePath}`)
    const info = await FS.stat(path)
    if (info.isDirectory()) {
      archive.directory(path, relativePath)
    } else {
      archive.file(path, { name: relativePath })
    }
  }

  await archive.finalize()
  return output
}