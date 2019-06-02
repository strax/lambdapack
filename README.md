# `lambdapack`

`lambdapack` is an unopinionated tool to package Node.js applications for [AWS Lambda][1] deployment. It packages the files specified in the `files` field of `package.json` and production dependencies into a single zip file which can then be provided to AWS Lambda.

Note that this tool does not, by design, perform any compilation, minification or processing to the source files. You can however use `lambdapack` as a part of a more complex build pipeline.

## Usage

```
npx -p @strax/lambdapack lambdapack <path>
```

Lambdapack will output the zip file to stdout, so a typical use-case would be to write the generated archive to a file:

```
npx -p @strax/lambdapack lambdapack . > artifact.zip
```

[1]: https://aws.amazon.com/lambda/