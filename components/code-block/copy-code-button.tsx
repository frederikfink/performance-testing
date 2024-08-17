"use client";

import { Button } from "../ui/button";

interface Props {
  code: string;
}

const CopyCodeButton = ({ code }: Props) => {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Button size={"sm"} variant={"outline"} onClick={copyCode}>
      Copy
    </Button>
  );
};

export default CopyCodeButton;
