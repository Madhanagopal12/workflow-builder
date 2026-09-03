"use client";

import { ParamProps } from "@/types/appNode";
import React from "react";

function BrowserInstanceParam({ param }: ParamProps) {
  return <p className="text-xs p-2">{param.name}</p>;
}

export default BrowserInstanceParam;
