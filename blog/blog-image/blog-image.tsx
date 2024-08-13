import { Image } from "react-datocms";

interface Props {
  data: any;
}

const BlogImage = ({ data }: Props) => {
  return (
    <div className="h-[400px]">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        className="absolute"
        data={data.image.responsiveImage}
        objectPosition={"center"}
        objectFit="cover"
      />
    </div>
  );
};

export default BlogImage;
