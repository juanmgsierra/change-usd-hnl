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
  }
}));

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
        <Typography variant="h3">Cambio del dolar </Typography>
        <Typography variant="h3">$1 = L{lpsUSD} </Typography>
        <br />
        <Grid item xs={12} sm container>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="USD"
              variant="outlined"
              type="number"
              onChange={(e) => {
                setLps(e.target.value * lpsUSD);
              }}
            />
            <Typography variant="h3">
              <>
                {!lps ||
                  lps.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,", null)}
              </>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
