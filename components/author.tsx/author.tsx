"use client";

import { AuthorFragment, ImageFragment } from "@/gql/generated/graphql";
import Image from "../image/image";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

interface Props {
  author: AuthorFragment;
}

const Author = ({ author }: Props) => {
  const image = author?.image?.responsiveImage as ImageFragment | undefined;

  return (
    <>
      <div className="flex lg:items-center gap-4 lg:flex-row flex-col">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 relative">
            {image && (
              <Image
                objectPosition="center"
                className="border rounded-full"
                sizes="24px"
                alt={`${author.fullName}'s profile picture`}
                image={image}
              />
            )}
          </div>
          <div>
            <h3 className="font-medium tracking-tight">{author.fullName}</h3>
            <p className="text-sm text-muted-foreground">
              {author.company} | {author.title}
            </p>
          </div>
        </div>
        <div className="lg:ml-auto flex items-center gap-1 -ml-2 lg:-mr-2">
          {author.linkedin && (
            <Button
              size={"sm"}
              className="rounded-full"
              variant={"ghost"}
              asChild
            >
              <Link href={author.linkedin}>
                <LinkedinLogo className="mr-1" size={16} />
                <span>LinkedIn</span>
              </Link>
            </Button>
          )}
          {author.instagram && (
            <Button
              size={"sm"}
              className="rounded-full"
              variant={"ghost"}
              asChild
            >
              <Link href={author.instagram}>
                <InstagramLogo className="mr-1" size={16} />
                <span>Instagram</span>
              </Link>
            </Button>
          )}
          {author.github && (
            <Button
              size={"sm"}
              className="rounded-full"
              variant={"ghost"}
              asChild
            >
              <Link href={author.github}>
                <GithubLogo className="mr-1" size={16} />
                <span>GitHub</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Author;
