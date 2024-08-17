import { BlogCodeBlockFragment } from "@/gql/generated/graphql";
import DataCodeBlock from "@/components/code-block/code-block";

interface Props {
  data: BlogCodeBlockFragment;
}

const CodeBlock = ({ data }: Props) => {
  if (!data.code) return null;

  return (
    <DataCodeBlock
      code={data.code}
      language={data.language}
      title={data.title || undefined}
    />
  );
};
export default CodeBlock;
