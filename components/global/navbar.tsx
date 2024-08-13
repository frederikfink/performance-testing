import { NavbarQuery } from "@/gql/generated/graphql";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  data: NavbarQuery["navbar"] | null | undefined;
}

const Navbar = ({ data }: Props) => {
  if (!data) return null;

  return (
    <nav className="w-full fixed">
      <div className="flex items-center justify-between mx-auto container">
        <Button variant={"link"} asChild>
          <Link href="/">{data.title}</Link>
        </Button>
        <ul className="flex gap-2 items-center">
          {data?.links.map((link) => (
            <li key={link.url}>
              <Button asChild variant={"link"}>
                <Link href={link.url}>{link.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
