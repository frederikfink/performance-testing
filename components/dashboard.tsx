"use client";

import { action, revalidate } from "@/actions/action";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

const Dashboard = () => {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    console.log("click");
    await action(parseFloat(value));
  };

  const handleRevalidateCache = () => async () => {
    await revalidate("api");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleClick}>Test</Button>
      <Button onClick={handleRevalidateCache()}>Revalidate</Button>
    </div>
  );
};

export default Dashboard;
