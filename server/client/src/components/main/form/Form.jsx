import React, { useState, useContext } from "react";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import useStyles from "./styles";
import { ExpenseTrackerContext } from "../../../context/context";
import {
  expenseCategories,
  incomeCategories,
} from "../../../constants/constants";
import { formatDate } from "../../../utils/formatDate";
import CustomizedSnackbar from "../../snackbar/SnackBar";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(),
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const { addTransaction } = useContext(ExpenseTrackerContext);

  const createTransaction = () => {
    addTransaction({
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    });
    setFormData(initialState);
    setOpen(true);
  };

  const selectedMenuCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  function isFormDataEmpty(formData) {
    return Object.values(formData).some((value) => value.length === 0);
  }

  const isDisabled = isFormDataEmpty(formData);

  return (
    <Grid container spacing={2}>
      <CustomizedSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={6}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value={"Income"}>Income</MenuItem>
            <MenuItem value={"Expense"}>Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedMenuCategories.map((category) => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={createTransaction}
        disabled={isDisabled}
      >
        CREATE
      </Button>
    </Grid>
  );
};

export default Form;
