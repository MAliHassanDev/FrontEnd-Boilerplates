import React, { type FunctionComponent, type SVGProps } from "react";

type SvgIconProp = {
  color?: string;
  size?: string;
};

function createSvgIcon(
  svg: React.ReactElement<SVGProps<SVGSVGElement>>,
): FunctionComponent<{ color?: string }> {
  return function SvgIcon({ color = "#000000", size = "1em" }: SvgIconProp) {
    return React.cloneElement<React.SVGProps<SVGSVGElement>>(svg, {
      fill: color,
      width: size,
      height: size,
    });
  };
}

export default createSvgIcon;
