import { HTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import React from "react";

const classes = cva("py-2 px-3 font-medium w-full flex", {
    variants: {
        variant: {
            primary: "hover:bg-[#2C2C30] transition rounded-md",
            secondary: "bg-[#2C2C30] transition rounded-md"
        }
    }
})

const Span = ( props: { variant: "primary" | "secondary" } & HTMLAttributes<HTMLSpanElement>) => {
    const { variant, className, ...otherProps } = props;

    return (
        <span className={classes({variant, className})} {...otherProps} />
    );
}
 
export default Span;