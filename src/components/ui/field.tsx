import * as React from "react";
import { cn } from "@/lib/utils";
import type { FieldError as HookFormFieldError } from "react-hook-form";

const Field = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />
  )
);
Field.displayName = "Field";

const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props} />
  )
);
FieldGroup.displayName = "FieldGroup";

const FieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
);
FieldLabel.displayName = "FieldLabel";

interface FieldErrorProps {
  errors?: (HookFormFieldError | undefined)[];
}

const FieldError = ({ errors }: FieldErrorProps) => {
  const error = errors?.find(Boolean);
  if (!error?.message) return null;
  return <p className="text-xs text-destructive">{error.message}</p>;
};

export { Field, FieldGroup, FieldLabel, FieldError };
