import { ImageFragment } from "@/gql/generated/graphql";
import { cn } from "@/lib/utils";
import { Image as DatoImage } from "react-datocms";

interface Props {
  image: ImageFragment;
  alt: string;
}

const Image = ({ image, alt }: Props) => {
  return (
    <div className="w-full relative">
      <DatoImage
        className={cn("max-h-[90vh]")}
        objectFit="cover"
        data={image}
      />
    </div>
  );
};

export default Image;
