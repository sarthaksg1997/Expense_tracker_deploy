import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      height: "50%",
      width: "94%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: "50%",
      width: "70%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      height: "50%",
      width: "55%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      height: "70%",
      width: "35%",
    },
    [theme.breakpoints.up("xl")]: {
      height: "53%",
      width: "22%",
    },
    borderBottom: "5px solid #3f51b5",
    borderTop: "5px solid #3f51b5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "900",
    fontFamily: "Verdana",
    paddingBottom: "8px",
  },
  textField: {
    margin: theme.spacing(1),
    width: "300px",
  },
  button: {
    margin: theme.spacing(2),
    width: "300px",
  },
}));
