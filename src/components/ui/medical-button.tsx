import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const medicalButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-medical",
        emergency: "bg-emergency text-emergency-foreground hover:bg-emergency/90 shadow-emergency animate-pulse-soft",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-soft",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-soft",
        medical: "bg-gradient-medical text-white hover:opacity-90 shadow-medical",
        outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MedicalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof medicalButtonVariants> {
  asChild?: boolean
}

const MedicalButton = React.forwardRef<HTMLButtonElement, MedicalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(medicalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
MedicalButton.displayName = "MedicalButton"

export { MedicalButton, medicalButtonVariants }