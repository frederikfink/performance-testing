import Image from "@/components/image/image";
import { BlogMediaFragment, ImageFragment } from "@/gql/generated/graphql";

interface Props {
  data: BlogMediaFragment;
}

const Media = ({ data }: Props) => {
  if (!data.image.responsiveImage) return null;

  const image = data.image.responsiveImage as ImageFragment;

  return (
    <div>
      <div className="flex items-center text-sm justify-between">
        <p className="text-muted-foreground">{data.title}</p>
      </div>
      <div>
        <Image
          image={image as ImageFragment}
          alt={data.alternativeText || undefined}
          className="max-h-[90vh]"
          sizes={`(max-width: 1024px) 100vw, (min-width: 1024px) 896px`}
        />
      </div>
    </div>
  );
};

export default Media;
