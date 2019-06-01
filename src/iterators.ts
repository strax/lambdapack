type Generator<A> = IterableIterator<A>

export function* eachLine(input: string): Generator<string> {
  for (const line of input.split("\n")) {
    if (line !== "") {
      yield line
    }
  }
}