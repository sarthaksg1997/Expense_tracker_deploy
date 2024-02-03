import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";
import Form from "./form/Form";
import List from "./list/List";
import { ExpenseTrackerContext } from "../../context/context";

const Main = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);

  return (
    <Card>
      <CardHeader title="Expense Tracker" />
      <CardContent>
        <Typography align="center" variant="h6">
          Total balance ₹{balance}
        </Typography>
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
