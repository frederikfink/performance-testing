import { Button } from "@/components/ui/button";
import { getAllArticles } from "@/lib/datoCMS/helpers";
import Link from "next/link";

const Page = async () => {
  const allArticles = await getAllArticles();

  return (
    <div className="container">
      {allArticles.length === 0 ? (
        <p>No blogposts yet</p>
      ) : (
        <ul>
          {allArticles.map((article) => (
            <li key={article.slug}>
              <Button asChild variant="link">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
