"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@phosphor-icons/react";
import { useState } from "react";

const Page = () => {
  const [itemId, setItemId] = useState("aNvg1BeqQQOMuNEHW7F2PQ");
  const [locale, setLocale] = useState("da");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dublicate-content", {
        method: "POST",
        body: JSON.stringify({ itemId, fromLocale: "en", toLocale: locale }),
      });

      if (!response.ok) {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-screen grid place-content-center">
      <div className="space-y-4">
        <Select value={locale} onValueChange={(value) => setLocale(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select locale" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="da">Danish</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Item ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <Button disabled={loading} onClick={handleClick}>
          {loading && <Spinner className="mr-2 animate-spin" size={16} />}
          Dublicate and translate page
        </Button>
      </div>
    </section>
  );
};

export default Page;
