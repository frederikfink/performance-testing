require("dotenv").config({ path: ".env" });

/** @type {import('graphql-config').IGraphQLConfig} */

module.exports = {
  schema: [
    {
      "https://graphql.datocms.com": {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PRIVATE_DATOCMS_FULL_ACCESS_TOKEN}`,
          "X-Exclude-Invalid": "true",
        },
        loader: "./schema-loader.js",
      },
    },
  ],
  documents: ["./**/*.graphql"],
  extensions: {
    codegen: {
      plugins: [
        {
          add: {
            content:
              "import { type Document as StructuredTextDocument } from 'datocms-structured-text-utils';",
          },
        },
        "typescript",
        "typescript-operations",
      ],
      generates: {
        "./gql/generated/": {
          preset: "client",
          // String documentMode (https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#when-to-use-a-string-documentmode) does not work with nested fragments
          // config: { documentMode: "string" },
          presetConfig: {
            plugins: ["typescript"],
            fragmentMasking: { unmaskFunctionName: "getFragmentData" },
            strictScalars: true,
            scalars: {
              BooleanType: "boolean",
              CustomData: "Record<string, unknown>",
              Date: "string",
              DateTime: "string",
              FloatType: "number",
              IntType: "number",
              ItemId: "string",
              JsonField: "unknown",
              MetaTagAttributes: "Record<string, string>",
              UploadId: "string",
              StructuredTextDocument: "StructuredTextDocument",
            },
          },
        },
      },
    },
  },
};
