import { Box, Grid, Paper, Typography, styled } from "@mui/material";

export const RowDirectionFormGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  columnGap: theme.spacing(0.2),
  flexWrap: "wrap",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5),
  padding: theme.spacing(1),
  minWidth: theme.spacing(4),
}));

export const ParentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

export const CategoryTypography = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  textAlign: "center",
  marginTop: 1,
}));

export const SpaceBetweenGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const KPITitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Nunito Sans",sans-serif',
  fontSize: 18,
  fontWeight: 600,
  lineHeight: "25px",
  marginBottom: theme.spacing(0.5),
}));

export const TypographyHealthKitAndDate = styled(Typography)(() => ({
  fontFamily: '"Nunito Sans",sans-serif',
  fontWeight: 400,
  fontSize: 13,
  lineHeight: "18px",
  color: "#a2a8af",
  textAlign: "right",
}));

export const KPITypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Nunito Sans",sans-serif',
  fontWeight: 400,
  fontSize: 16,
}));

export const BoxAuthAndPasswordForm = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginTop: theme.spacing(1),
}));

export const DivContent = styled("div")({
  backgroundColor: "background.default",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const DivContentBody = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 900,
}));

export const RootSidebarBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

export const SidebarSectionBox = styled(Box)(({ theme }) => ({
  alignItems: "center",
  backgroundColor: "#1c2030",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
}));
