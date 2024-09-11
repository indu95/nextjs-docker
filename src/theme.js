import { blue, grey, indigo, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const PRIMARY_MAIN_COLOR = "#606c38";
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_MAIN_COLOR,
      contrastText: "#fefae0",
      dark: "#252412",
      light: "#f7f6ec",
    },
    secondary: {
      main: "#dda15e",
    },
    error: {
      main: red[500],
    },
  },
});

theme.palette.text = {
  ...theme.palette.text,
  ...{ primary: "#222", secondary: "#999999" },
};

for (let typographyType in theme.typography) {
  if (
    typeof theme.typography[typographyType] === "object" &&
    "fontFamily" in theme.typography[typographyType]
  ) {
    theme.typography[typographyType] = {
      ...theme.typography[typographyType],
      ...{
        fontFamily: ["SUSE", "sans-serif"].join(","),
      },
    };
  }
}
theme.components.MuiButton = {
  ...theme.components.MuiButton,
  styleOverrides: {
    root: {
      fontWeight: 700,
    },
    contained: {
      backgroundColor: PRIMARY_MAIN_COLOR,
      color: "#FFF",
      "&:hover": {
        backgroundColor: `${theme.palette.primary.dark}`,
      },
    },
    outlined: {
      border: `1px solid ${PRIMARY_MAIN_COLOR}`,
    },
  },
};

export default theme;
