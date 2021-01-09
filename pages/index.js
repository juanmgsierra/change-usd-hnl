import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import DenseAppBar from "../components/appBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  content: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center"
  }
}));

const numbValidation = (e) => {
  var charCode = e.which;
  var sizeEntry = e.target.value.length;
  if (charCode >= 32 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
  }
  if (sizeEntry > 6) {
    e.preventDefault();
  }
};

export default function IndexPage() {
  const classes = useStyles();
  const [lpsUSD, setLpsUSD] = useState("");
  const [lps, setLps] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url:
        "https://free.currconv.com/api/v7/convert?q=USD_HNL&compact=ultra&apiKey=5a49beefa5e7696bc287"
    }).then((response) => {
      setLpsUSD(response.data.USD_HNL);
    });
  }, []);

  return (
    <div className={classes.root}>
      <DenseAppBar />
      <Paper className={classes.paper}>
        <Typography className={classes.content} variant="h4">
          Cambio del Dolar
        </Typography>
        <Typography className={classes.content} variant="h4">
          $1 = L{Number(lpsUSD).toFixed(2)}
        </Typography>
        <br />
        <div className={classes.content}>
          <TextField
            id="outlined-basic"
            label="USD"
            variant="outlined"
            type="number"
            onKeyPress={numbValidation}
            onChange={(e) => {
              setLps(e.target.value * lpsUSD);
            }}
          />
          <Typography className={classes.content} variant="h4">
            <>
              L
              {!lps || lps.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,", null)}
            </>
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
