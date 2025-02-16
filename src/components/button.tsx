import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";

const button = cva(["rounded-full px-6 duratin-200 text-[10px] font-bold"], {
  variants: {
    intent: {
      primary: ["bg-main-purple", "text-white", "hover:bg-main-purple-hover"],
      secondary: ["text-main-purple bg-main-purple/10 hover:bg-main-purple/25"],
      destructive: ["text-white bg-red hover:bg-red-hover"],
    },
    size: {
      sm: ["h-7"],
      lg: ["h-8"],
    },
    // `boolean` variants are also supported!
    disabled: {
      false: null,
      true: ["opacity-50", "cursor-not-allowed"],
    },
    width: {
      true: "w-full",
    },
  },

  defaultVariants: {
    intent: "primary",
    size: "lg",
    disabled: false,
  },
});
type ButtonProps = VariantProps<typeof button> & {
  children: ReactNode;
};
export default function Button({
  children,
  intent = "primary",
  size = "sm",
  disabled = false,
  width,
}: ButtonProps) {
  return (
    <>
      <button className={button({ intent, size, disabled, width })}>
        {children}
      </button>
    </>
  );
}
