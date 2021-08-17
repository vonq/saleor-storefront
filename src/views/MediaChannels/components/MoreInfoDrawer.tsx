import {
  Box,
  Button,
  Chip,
  Drawer,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CloseIcon from "@material-ui/icons/Close";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import DateRangeIcon from "@material-ui/icons/DateRange";
import InfoIcon from "@material-ui/icons/Info";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { messages } from "@temp/views/MediaChannels/messages";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: "min(500px, 100vw)",
  },
  content: {
    padding: theme.spacing(6, 2, 2, 2),
    overflowX: "hidden",
    overflowY: "auto",
  },
  paragraph: {
    marginBottom: theme.spacing(4),
  },
  chips: {
    margin: theme.spacing(-0.5, -0.5, 3.5, -0.5),
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  close: {
    position: "absolute",
    textAlign: "end",
    top: 0,
    width: "100%",
    background:
      "linear-gradient(180deg, white 0%, white 75%, transparent 100%)",
  },
  deliveryTime: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(4),
    "& > span": {
      marginLeft: theme.spacing(0.5),
    },
  },
  media: {
    paddingBottom: "33.333%",
    margin: theme.spacing(2, 0),
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  duration: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    "& > svg": {
      marginRight: "0.25rem",
    },
  },
  price: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    justifyContent: "flex-end",
    "& > svg": {
      marginRight: "0.25rem",
    },
  },
}));

interface MoreInfoDrawerProps {
  product: any;
  open: boolean;
  onClose: () => void;
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export const MoreInfoDrawer: React.FC<MoreInfoDrawerProps> = ({
  open,
  product,
  onClose,
}) => {
  const intl = useIntl();
  const classes = useStyles();

  if (!product) {
    return null;
  }

  const {
    logo_rectangle_url,
    title,
    audience_group,
    homepage,
    vonq_price,
    duration,
    description,
    time_to_process,
    time_to_setup,
    cross_postings,
    job_functions,
    locations,
    industries,
  } = product || {};

  const timeToProcess = Math.ceil(time_to_process.period / 24);
  const maxTimeToProcess = Math.ceil(
    (time_to_process.period + time_to_setup.period) / 24
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{ paper: classes.root }}
    >
      <div className={classes.close}>
        <IconButton
          aria-label={intl.formatMessage(messages.closeButton)}
          component="span"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.content}>
        <Grid container>
          {!!duration?.period && (
            <Grid item xs={6} className={classes.duration}>
              <DateRangeIcon />
              <Box>{` ${duration?.period} days`}</Box>
            </Grid>
          )}
          <Grid item xs className={classes.price}>
            <CreditCardIcon />
            <Box>{` ${vonq_price?.[0].amount} ${vonq_price?.[0].currency}`}</Box>
          </Grid>
        </Grid>

        <hr />

        <div
          className={classes.media}
          style={{ backgroundImage: `url("${logo_rectangle_url?.[0]?.url}")` }}
          title={title}
        />
        <Typography gutterBottom component="div">
          <Chip size="small" label={audience_group} />
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        {homepage && (
          <Typography gutterBottom>
            <Link
              href={homepage}
              target="_blank"
              onClick={e => e.stopPropagation()}
            >
              {homepage}
            </Link>
          </Typography>
        )}
        <Typography className={classes.paragraph}>{description}</Typography>

        <Typography variant="h6" component="h2">
          <FormattedMessage {...messages.deliveryTime} />
        </Typography>
        <Typography className={classes.deliveryTime}>
          <AccessTimeIcon fontSize="small" />
          <span>
            <FormattedMessage
              {...messages.workingDays}
              values={{ days: timeToProcess }}
            />
          </span>
        </Typography>
        {maxTimeToProcess > timeToProcess && (
          <Typography className={classes.deliveryTime}>
            <span>
              <FormattedMessage
                {...messages.maxDeliveryTime}
                values={{ maxTimeToProcess }}
              />{" "}
              <Link
                href={intl.formatMessage(messages.learnWhyLink)}
                target="_blank"
              >
                <FormattedMessage {...messages.learnWhy} />
              </Link>
            </span>
          </Typography>
        )}

        {Array.isArray(cross_postings) && cross_postings.length > 0 && (
          <>
            <Typography variant="h6" component="h2">
              <FormattedMessage {...messages.crossPostings} />{" "}
              <Tooltip
                title={intl.formatMessage(messages.crossPostingsHint, {
                  channelName: title,
                })}
                arrow
              >
                <InfoIcon fontSize="small" />
              </Tooltip>
            </Typography>
            <Typography className={classes.paragraph}>
              {cross_postings.filter(isValidHttpUrl).map((url, i) => (
                <span key={url}>
                  {isValidHttpUrl ? (
                    <Link
                      href={url}
                      target="_blank"
                      onClick={e => e.stopPropagation()}
                    >
                      {url}
                    </Link>
                  ) : (
                    <span key={url}>{url}</span>
                  )}
                  {i + 1 !== cross_postings.length && ", "}
                </span>
              ))}
            </Typography>
          </>
        )}

        {Array.isArray(job_functions) && job_functions.length > 0 && (
          <>
            <Typography variant="h6" component="h2">
              <FormattedMessage {...messages.jobFunctions} />
            </Typography>
            <Typography className={classes.chips} component="div">
              {job_functions.map(({ id, name: label }) => (
                <Chip key={id} size="small" label={label} />
              ))}
            </Typography>
          </>
        )}

        {Array.isArray(locations) && locations.length > 0 && (
          <>
            <Typography variant="h6" component="h2">
              <FormattedMessage {...messages.locations} />
            </Typography>
            <Typography className={classes.chips} component="div">
              {locations.map(({ id, canonical_name: label }) => (
                <Chip key={id} size="small" label={label} />
              ))}
            </Typography>
          </>
        )}

        {Array.isArray(industries) && industries.length > 0 && (
          <>
            <Typography variant="h6" component="h2">
              <FormattedMessage {...messages.industries} />
            </Typography>
            <Typography className={classes.chips} component="div">
              {industries.map(({ id, name: label }) => (
                <Chip key={id} size="small" label={label} />
              ))}
            </Typography>
          </>
        )}

        <Button size="small" fullWidth color="primary" onClick={onClose}>
          <FormattedMessage {...messages.closeButton} />
        </Button>
      </div>
    </Drawer>
  );
};

export default MoreInfoDrawer;
