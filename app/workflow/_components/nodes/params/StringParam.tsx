"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import { useEffect, useId, useState } from "react";

function StringParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInternalValue(value);
  }, [value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: any = Input;
  if (param.variants === "textarea") {
    Component = Textarea;
  }
  return (
    <div className="space-y p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Component
        className="text-xs"
        id={id}
        disabled={disabled}
        value={internalValue}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e: any) => setInternalValue(e.target.value)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

export default StringParam;
