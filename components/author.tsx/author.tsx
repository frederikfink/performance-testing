import { AuthorFragment, ImageFragment } from "@/gql/generated/graphql";
import Image from "../image/image";

interface Props {
  author: AuthorFragment;
}

const Author = ({ author }: Props) => {
  const image = author?.image?.responsiveImage as ImageFragment | undefined;

  return (
    <div className="flex items-center gap-4">
      {image && (
        <Image
          className="rounded-full w-14 h-14"
          sizes="24px"
          alt={`${author.fullName}'s profile picture`}
          image={image}
        />
      )}
      <div>
        <h3 className="text-xl font-medium tracking-tight">
          {author.fullName}
        </h3>
        <p className="text-sm text-muted-foreground">
          {author.company} | {author.title}
        </p>
      </div>
    </div>
  );
};

export default Author;
