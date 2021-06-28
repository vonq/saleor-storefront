import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
export const muiTheme = createMuiTheme({
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
    },
  },
});

export default muiTheme;
