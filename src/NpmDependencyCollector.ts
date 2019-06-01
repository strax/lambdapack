import { DependencyCollector, PackageLocator } from "./dependencies"
import { exec } from "./exec";
import { eachLine } from "./iterators";
import { manifestForPath } from "./manifest";


export class NpmDependencyCollector implements DependencyCollector {
  async* transitiveRuntimeDependencies(rootPath: string): AsyncIterable<PackageLocator> {
    const paths = eachLine(await exec("npm list --production --parseable"))
    for (const path of paths) {
      if (path !== rootPath) {
        const manifest = await manifestForPath(path)
        yield { name: manifest.name, path }
      }
    }
  }
}