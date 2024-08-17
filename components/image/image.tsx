import { ImageFragment } from "@/gql/generated/graphql";
import { cn } from "@/lib/utils";
import { Image as DatoImage } from "react-datocms";

interface Props {
  image: ImageFragment;
  priority?: boolean;
  alt?: string;
  className?: string;
  sizes?: string;
}

const Image = ({ image, priority, className, sizes, alt }: Props) => {
  return (
    <div className="w-full relative">
      <DatoImage
        priority={priority}
        className={cn(className)}
        sizes={sizes}
        objectFit="cover"
        data={{ ...image, ...(alt && { alt }) }}
      />
    </div>
  );
};

export default Image;
