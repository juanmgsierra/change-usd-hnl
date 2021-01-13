import DenseAppBar from "../components/appBar";
import CurrencyChange from "../components/currencyChange";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

export default function IndexPage() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <DenseAppBar />
        <CurrencyChange />
      </div>
    </>
  );
}
