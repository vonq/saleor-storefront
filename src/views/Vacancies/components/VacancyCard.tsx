import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import { useIntl } from "react-intl";
import _get from "lodash/get";
import _values from "lodash/values";

import { VacancyItem } from "@temp/core/apiLayer/vacancyService";
import messages from "../messages";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    padding: theme.spacing(2.5),
  },
  tagList: {
    display: "flex",
  },
  tag: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

interface CompProps {
  details: VacancyItem;
}

export const VacancyCard: React.FC<CompProps> = ({ details }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" justify="space-between">
          <Box>
            <Typography variant="h6" gutterBottom>
              {details.title}
            </Typography>
            <ul className={classes.tagList}>
              <li className={classes.tag}>
                <BackupIcon color="secondary" className={classes.icon} />
                <Typography variant="subtitle2">
                  {details.sourceName}
                </Typography>
              </li>
              <li className={classes.tag}>
                <PersonOutlinedIcon color="secondary" className={classes.icon} />
                <Typography variant="subtitle2">
                  {details.recruiterName}
                </Typography>
              </li>
              <li className={classes.tag}>
                <EventOutlinedIcon color="secondary" className={classes.icon} />
                <Typography variant="subtitle2">
                  {new Date(details.createdAt).toLocaleDateString()}
                </Typography>
              </li>
            </ul>
          </Box>

          <CardActions>
            <Button variant="outlined" color="primary">
              <Typography variant="button">{intl.formatMessage(messages.startCampaign)}</Typography>
            </Button>
          </CardActions>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VacancyCard;
