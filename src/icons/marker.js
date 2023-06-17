import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const CircleRoot = styled("div")(({ theme, ownerState }) => {
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
    borderRadius: "50%",
    color,
    cursor: "default",
    display: "flex",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
    justifyContent: "center",
    height: ownerState.size,
    width: ownerState.size,
  };
});

export const Circle = (props) => {
  const { color = "primary", children, ...other } = props;

  const ownerState = { color };

  return (
    <CircleRoot ownerState={ownerState} {...other}>
      {children}
    </CircleRoot>
  );
};

Circle.propTypes = {
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
  size: PropTypes.number,
};
