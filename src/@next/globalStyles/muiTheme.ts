import { grey, red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface TypeBackground {
    sidebar: string;
  }
}

// Create a theme instance.
export const muiTheme = createTheme({
  palette: {
    primary: {
      // main: "#556cd6",
      main: "#0a87f8",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
      sidebar: grey[100],
    },
  },
});

export default muiTheme;
