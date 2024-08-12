const { loadSchema } = require("@graphql-tools/load");
const { mergeTypeDefs } = require("@graphql-tools/merge");

module.exports = async (schemaString, config) => {
  const schema = await loadSchema(schemaString, config);

  return mergeTypeDefs(
    [
      `
        scalar StructuredTextDocument
        type BlogpostModelContentField {
          value: StructuredTextDocument!
        }
      `,
      schema,
    ],
    {
      // if conflict is detected, use custom definition
      onFieldTypeConflict: (customField, _schemaField) => {
        return customField;
      },
    }
  );
};
