import DenseAppBar from "../components/appBar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useState } from "react";
import numbValidation from "../utils";

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
  },
  bottomPush: {
    textAlign: "right"
  }
}));

const fetchData = async () =>
  await axios
    .get(
      "https://free.currconv.com/api/v7/convert?q=USD_HNL&compact=ultra&apiKey=5a49beefa5e7696bc287"
    )
    .then((res) => ({
      currency: res.data.USD_HNL
    }));

const IndexPage = ({ currency }) => {
  const [lps, setLps] = useState("");
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <DenseAppBar />
        <Paper className={classes.paper} elevation={3}>
          <Typography className={classes.content} variant="h4">
            Cambio del Dolar
          </Typography>
          <Typography className={classes.content} variant="h4">
            $1 = L{currency.toFixed(4)}
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
                setLps(e.target.value * currency);
              }}
            />
            <Typography className={classes.content} variant="h4">
              <>
                L
                {!lps ||
                  lps.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,", null)}
              </>
            </Typography>
          </div>
          <div className={classes.bottomPush}>
            <Typography>Powered by JMGS v1.1</Typography>
          </div>
        </Paper>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const data = await fetchData();
  return {
    props: data // will be passed to the page component as props
  };
};

export default IndexPage;
