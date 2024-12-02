import { HTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import React from "react";

const classes = cva("border rounded-lg py-4 px-6 font-medium", {
    variants: {
        variant: {
            primary: "bg-lime-400 text-neutral-950 border-lime-400",
            secondary: "border-white text-white bg-transparent"
        }
    }
})

const Button = ( props: { variant: "primary" | "secondary" } & HTMLAttributes<HTMLButtonElement>) => {
    const { variant, className, ...otherProps } = props;

    return (
        <button className={classes({variant, className})} {...otherProps} />
    );
}
 
export default Button;