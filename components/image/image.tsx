import { ImageFragment } from "@/gql/generated/graphql";
import { cn } from "@/lib/utils";
import { Image as DatoImage } from "react-datocms";

interface Props {
  image: ImageFragment;
  priority?: boolean;
  alt?: string;
  className?: string;
  sizes?: string;
  focalPoint?: { x: number; y: number };
  objectPosition?: string;
}

const Image = ({
  image,
  priority,
  className,
  sizes,
  alt,
  objectPosition,
  focalPoint,
}: Props) => {
  const getPosition = () =>
    objectPosition
      ? objectPosition
      : focalPoint
      ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
      : "";

  return (
    <div className={cn("w-full relative", className)}>
      <DatoImage
        priority={priority}
        className={cn(className)}
        sizes={sizes}
        objectFit="cover"
        objectPosition={getPosition()}
        data={{ ...image, ...(alt && { alt }) }}
      />
    </div>
  );
};

export default Image;
