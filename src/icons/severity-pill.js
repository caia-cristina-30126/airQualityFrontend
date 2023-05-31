import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const SeverityPillRoot = styled("span")(({ theme, ownerState }) => {
  let backgroundColor;
  let color = "#000000";

  if (ownerState.color === "Good") {
    backgroundColor = "#50f0e6";
  } else if (ownerState.color === "Fair") {
    backgroundColor = "#50ccaa";
  } else if (ownerState.color === "Moderate") {
    backgroundColor = "#f0e641";
  } else if (ownerState.color === "Poor") {
    backgroundColor = "#ff5050";
  } else if (ownerState.color === "Very poor") {
    backgroundColor = "#960032";
  } else if (ownerState.color === "Extremely poor") {
    backgroundColor = "#7d2181";
  } else {
    backgroundColor = "#6f6f6f";
  }

  return {
    alignItems: "center",
    backgroundColor,
    borderRadius: 12,
    color,
    cursor: "default",
    display: "inline-flex",
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: "center",
    letterSpacing: 0.5,
    minWidth: 20,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  };
});

export const SeverityPill = (props) => {
  const { color = "primary", children, ...other } = props;

  const ownerState = { color };

  return (
    <SeverityPillRoot ownerState={ownerState} {...other}>
      {children}
    </SeverityPillRoot>
  );
};

SeverityPill.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "warning",
    "success",
    "Good",
    "Fair",
    "Moderate",
    "Poor",
    "Very poor",
    "Extremely poor",
  ]),
};
