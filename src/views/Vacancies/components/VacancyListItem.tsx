import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BackupIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import _get from "lodash/get";
import _values from "lodash/values";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#f1f5f5",
    boxShadow: "0 1px 3px 0 rgba(51, 51, 51, 0.2)",
    marginBottom: "1rem",
    borderRadius: "3px",
    padding: "1.5rem",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardInfo: {
    "& > h2": {
      fontWeight: 700,
      marginBottom: "0.5rem",
    },
    "& ul": {
      display: "flex",
      fontSize: 14,
    },
    "& ul > li": {
      display: "flex",
      alignItems: "center",
      "&:not(:first-child)": {
        marginLeft: "1.5rem",
      },
    },
    "& svg": {
      width: "1.25rem",
      height: "1.25rem",
      marginRight: "0.5rem",
    },
  },
  cardActions: {},
}));
interface CompProps {
  data: {
    vacancyId: string;
    sourceName: string;
    createdAt: string;
    title: string;
  };
}

export const VacancyListItem: React.FC<CompProps> = ({ data }) => {
  const classes = useStyles();

  const createdAtParsed = new Date(
    data["createdAt"]
  ).toLocaleDateString();

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <div className={classes.cardInfo}>
          <h2>{data['title']}</h2>
          <ul>
            <li>
              <BackupIcon />
              <span>{data["sourceName"]}</span>
            </li>
            <li>
              <PersonOutlinedIcon />
              <span>{data["recruiterName"]}</span>
            </li>
            <li>
              <EventOutlinedIcon />
              <span>{createdAtParsed}</span>
            </li>
          </ul>
        </div>
        <div className={classes.cardActions}>
          <Button variant="contained" color="primary" size="small">
            Start campaign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VacancyListItem;
