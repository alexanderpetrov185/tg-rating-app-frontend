import React from "react";

export interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  filled?: boolean;
  highlight?: "full" | "partial" | "none";
  ref?: React.Ref<SVGSVGElement>;
}

export default function StarIcon({
  filled = false,
  highlight = "none",
  ref,
  ...props
}: StarIconProps) {
  const polygonPoints =
    "12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26";

  return (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "#FFD700" : "none"}
      stroke={filled ? "none" : "#000"}
      strokeWidth={filled ? undefined : 1.5}
      strokeLinecap={filled ? undefined : "round"}
      strokeLinejoin={filled ? undefined : "round"}
    >
      <polygon points={polygonPoints} />
    </svg>
  );
}
