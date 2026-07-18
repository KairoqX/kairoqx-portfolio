import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-secondary to-primary text-white shadow-[0_8px_30px_-8px_rgba(225,29,72,0.55)] hover:shadow-[0_14px_40px_-8px_rgba(225,29,72,0.75)]",
        ghost:
          "glass border border-white/10 text-white hover:bg-white/[.06] hover:border-secondary/50",
        outline:
          "border border-white/15 text-white hover:border-primary/60 hover:bg-white/5",
        link: "text-secondary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-7 py-3.5",
        sm: "px-5 py-2.5 text-xs",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
