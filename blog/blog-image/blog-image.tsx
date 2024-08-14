import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  data: any;
}

const BlogImage = ({ data }: Props) => {
  if (!data.image.responsiveImage) return null;

  return (
    <Image
      alt={data.alternativeText}
      className={cn(
        "w-full absolute object-contain transition-all duration-1000 ease-in-out"
      )}
      src={data.image.responsiveImage.src}
      sizes={`(max-width: 1024px) 100vw, (min-width: 1024px) max-w-4xl`}
      width={data.image.responsiveImage.width}
      height={data.image.responsiveImage.height}
      blurDataURL={data.image.responsiveImage.base64}
      placeholder="blur"
    />
  );
};

export default BlogImage;
