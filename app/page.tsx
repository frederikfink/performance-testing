import {
  AllPagesDocument,
  AllPagesQuery,
  AllPagesQueryVariables,
} from "@/gql/generated/graphql";
import { request } from "@/lib/datoCMS/client";

const Page = async () => {
  const { allPages } = await request<AllPagesQuery, AllPagesQueryVariables>(
    AllPagesDocument,
    {},
    { tags: [`pages`] }
  );

  return (
    <main>
      {allPages.length === 0 ? (
        <p>No pages found</p>
      ) : (
        <ul>
          {allPages.map((page) => (
            <li key={page.slug}>
              <a href={`/${page.slug}`}>{page.title}</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Page;
