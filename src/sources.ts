import { NpmDependencyCollector } from "./NpmDependencyCollector";
import { manifestForPath } from "./manifest";
import globby from "globby"
import Path from "path"

export async function generateArtifactList(rootPath: string): Promise<ReadonlySet<string>> {
  const paths = new Set<string>()
  // Add package.json
  paths.add(Path.resolve(rootPath, "package.json"))
  const manifest = await manifestForPath(rootPath)
  for (const file of (await globby(manifest.files))) {
    paths.add(Path.resolve(process.cwd(), file))
  }
  const dependencies = new NpmDependencyCollector().transitiveRuntimeDependencies(rootPath)
  for await (const dependency of dependencies) {
    paths.add(dependency.path)
  }
  return paths
}