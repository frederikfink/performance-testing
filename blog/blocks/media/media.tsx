import Image from "@/components/image/image";
import { BlogMediaFragment, ImageFragment } from "@/gql/generated/graphql";

interface Props {
  data: BlogMediaFragment;
}

const Media = ({ data: { image, alternativeText } }: Props) => {
  if (!image.responsiveImage) return null;

  return (
    <Image
      image={image.responsiveImage as ImageFragment}
      alt={alternativeText}
    />
  );
};

export default Media;
