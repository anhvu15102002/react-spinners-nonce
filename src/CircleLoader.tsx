"use client";

import * as React from "react";

import { cssValue, parseLengthAndUnit } from "./helpers/unitConverter";
import { LoaderSizeProps } from "./helpers/props";
import { createAnimation } from "./helpers/animation";

const circle = createAnimation(
  "CircleLoader",
  "0% {transform: rotate(0deg)} 50% {transform: rotate(180deg)} 100% {transform: rotate(360deg)}",
  "circle"
);

function CircleLoader({
  loading = true,
  color = "#000000",
  speedMultiplier = 1,
  cssOverride = {},
  size = 50,
  ...additionalprops
}: LoaderSizeProps) {
  const wrapper: React.CSSProperties = {
    display: "inherit",
    position: "relative",
    width: cssValue(size),
    height: cssValue(size),
    ...cssOverride,
  };

  const style = (i: number): React.CSSProperties => {
    const { value, unit } = parseLengthAndUnit(size);

    return {
      position: "absolute",
      height: `${value * (1 - i / 10)}${unit}`,
      width: `${value * (1 - i / 10)}${unit}`,
      borderTop: `1px solid ${color}`,
      borderBottom: "none",
      borderLeft: `1px solid ${color}`,
      borderRight: "none",
      borderRadius: "100%",
      transition: "2s",
      top: `${i * 0.7 * 2.5}%`,
      left: `${i * 0.35 * 2.5}%`,
      animation: `${circle} ${1 / speedMultiplier}s ${(i * 0.2) / speedMultiplier}s infinite linear`,
    };
  };

  if (!loading) {
    return null;
  }

  return (
    <span style={wrapper} {...additionalprops}>
      <span style={style(0)} />
      <span style={style(1)} />
      <span style={style(2)} />
      <span style={style(3)} />
      <span style={style(4)} />
    </span>
  );
}

export default CircleLoader;
