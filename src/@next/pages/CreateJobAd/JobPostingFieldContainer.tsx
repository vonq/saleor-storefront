import { Box, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";

interface IProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const JobPostingFieldContainer = ({ title, description, children }: IProps) => (
  <Box display="flex" flexDirection="column">
    <Typography variant="h6" component="h3">
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" component="p">
        {description}
      </Typography>
    )}
    {children}
  </Box>
);

JobPostingFieldContainer.defaultProps = {
  description: "",
};

export default JobPostingFieldContainer;
