// import original module declarations
import "styled-components";
import { ThemeProps as MyProps } from "../themes/theme";

declare module "styled-components" {
  export interface DefaultTheme extends MyProps {}
}
