import {
  color as ssColor,
  ColorProps as SSColorProps,
  TextColorProps,
  compose,
  system,
} from "styled-system";

// Styled-system patch for the color prop fixing "Types of property 'color' are incompatible"
// when applying props to component that extend ColorProps.
export interface ColorProps extends Omit<SSColorProps, "color"> {
  textColor?: TextColorProps["color"];
}

export const color = compose(
  ssColor,
  system({
    // Alias color as textColor
    textColor: {
      property: "color",
      scale: "colors",
    },
  })
);
