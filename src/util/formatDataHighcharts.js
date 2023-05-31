import { lighten } from "@mui/material/styles";

export const formatData = (data, color) =>
  data.map((item, index) => {
    if (item === null) {
      return null;
    }
    return {
      y: item,
      color: index === data.length - 1 ? color : lighten(color, 0.4),
    };
  });
