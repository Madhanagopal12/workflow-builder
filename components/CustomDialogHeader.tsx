"use client";

import { LucideIcon } from "lucide-react";
import React from "react";
import { Dialog, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  title: string;
  subTitle: string;

  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
};

function CustomDialogHeader(props: Props) {
  return (
    <DialogTitle asChild>
      <div className="flex flex-col items-center gap-2 mb-2">
        {props.icon && (
          <props.icon
            size={30}
            className={cn("stroke-primary", props.iconClassName)}
          />
        )}
        {props.title && (
          <p className={cn("text-xl text-primary", props.titleClassName)}>
            {props.title}
          </p>
        )}
        {props.subTitle && (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              props.subTitleClassName,
            )}
          >
            {props.subTitle}
          </p>
        )}
      </div>
    </DialogTitle>
  );
}

export default CustomDialogHeader;
