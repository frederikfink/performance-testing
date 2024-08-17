import { BlogCalloutBlockRecord } from "@/gql/generated/graphql";

interface Props {
  data: BlogCalloutBlockRecord;
}

const Callout = ({ data: { callout } }: Props) => {
  return <p>{callout}</p>;
};

export default Callout;
