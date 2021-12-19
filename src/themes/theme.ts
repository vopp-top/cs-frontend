export const theme = {
  rounded: {
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  shadow: {
    sm: "0 0 9px #0000001A",
    md: "",
    lg: "",
  },
  colors: {
    main: "#A970FF",
    sub: "#00000026",
    subHover: "#00000040",
    textSub: "#ffffff80",
    text: "#ffffff",
    background: "#181818",
  },
  // breakpoints: ["40em", "52em", "64em"],
  font: `'Sora', sans-serif`,
  fontSizes: {
    xxs: "0.625rem",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.625rem",
    xxl: "2rem",
    xxxl: "3rem",
  },
};

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export type ThemeProps = typeof theme;
