"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Clipboard } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Props {
  code: string;
  className?: string;
}

const CopyCodeButton = ({ code, className }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyCode = async () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button
      size={"sm"}
      variant={"outline"}
      onClick={copyCode}
      className={cn("gap-2", className)}
    >
      {isCopied ? (
        <>
          <Check weight="bold" className="rotate-in" size={14} />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Clipboard weight="bold" className="rotate-in" size={14} />
          <span>Copy</span>
        </>
      )}
    </Button>
  );
};

export default CopyCodeButton;
