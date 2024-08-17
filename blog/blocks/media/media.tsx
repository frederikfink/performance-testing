import Image from "@/components/image/image";
import { BlogMediaFragment, ImageFragment } from "@/gql/generated/graphql";

interface Props {
  data: BlogMediaFragment;
}

const Media = ({ data }: Props) => {
  if (!data.image.responsiveImage) return null;

  const image = data.image.responsiveImage as ImageFragment;

  return (
    <Image
      image={image as ImageFragment}
      alt={data.alternativeText || undefined}
      className="max-h-[90vh]"
    />
  );
};

export default Media;
