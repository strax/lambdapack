export interface PackageLocator {
  name: string
  path: string
}

export interface DependencyCollector {
  transitiveRuntimeDependencies(rootPath: string): AsyncIterable<PackageLocator>
}
