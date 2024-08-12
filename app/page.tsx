import { Button } from "@/components/ui/button";
import {
  AllPagesDocument,
  AllPagesQuery,
  AllPagesQueryVariables,
} from "@/gql/generated/graphql";
import { request } from "@/lib/datoCMS/client";
import Link from "next/link";

const Page = async () => {
  const { allPages } = await request<AllPagesQuery, AllPagesQueryVariables>(
    AllPagesDocument,
    {},
    { tags: [`pages`] }
  );

  return (
    <div className="container">
      {allPages.length === 0 ? (
        <p>No blogposts yet</p>
      ) : (
        <ul>
          {allPages.map((page) => (
            <li key={page.slug}>
              <Button asChild variant="link">
                <Link href={`/${page.slug}`}>{page.title}</Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
