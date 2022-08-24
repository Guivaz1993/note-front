import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: "1.4rem",
  borderRadius: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "var(--colour-grey)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 12,
    backgroundColor: "var(--colour-orange)",
  },
}));

export default function ProgressBar({ progress }) {
  return (
    <Box sx={{ width: "100%" }}>
      <BorderLinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
