"use client";

// import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Price() {
  // const params = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <div>Price ID: {id}</div>;
}
