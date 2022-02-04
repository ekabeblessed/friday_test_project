import React from 'react';
import { Alert } from '@mui/material';

const ResponseMessage = ({
  children,
  severity,
  icon,
  variant,
  style,
  className,
}) => {
  return (
    <Alert
      icon={icon}
      variant={variant}
      severity={severity}
      className={className}
      style={style}
    >
      {children}
    </Alert>
  );
};

export default ResponseMessage;
