import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/utils";

/**
 * Brand buttons.
 *
 * Every interactive variant carries a `::before` layer that sweeps a
 * color fill in on hover (`--btn-fill`, defaults to the brand orange
 * `--primary`). To recolor a specific button (e.g. a destructive
 * "Cancel booking" action) without losing the slide animation, pass a
 * class like `[--btn-fill:theme(colors.red.600)]`.
 */
const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-out overflow-hidden [--btn-fill:hsl(var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:before:hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Solid brand-orange button: subtle lift + a light diagonal shine sweeps across on hover.
        default:
          "bg-primary text-primary-foreground shadow-sm hover:shadow-lg hover:-translate-y-0.5 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-[150%] before:skew-x-12 before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[150%]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:shadow-lg hover:-translate-y-0.5 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-[150%] before:skew-x-12 before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[150%]",
        // "White layer" buttons: fill slides in from the left in brand orange (or --btn-fill override) and text flips to white.
        outline:
          "border-2 border-primary/30 bg-background text-foreground shadow-sm before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-[--btn-fill] before:transition-transform before:duration-300 before:ease-out hover:border-transparent hover:text-primary-foreground hover:shadow-md hover:before:scale-x-100",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-[--btn-fill] before:transition-transform before:duration-300 before:ease-out hover:text-primary-foreground hover:shadow-md hover:before:scale-x-100",
        ghost:
          "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-200 before:ease-out hover:text-accent-foreground hover:before:scale-x-100",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
