import { BlogCalloutFragment } from "@/gql/generated/graphql";

interface Props {
  data: BlogCalloutFragment;
}

const Callout = ({ data: { callout } }: Props) => {
  return <p>{callout}</p>;
};

export default Callout;
