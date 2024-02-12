import { Link, Typography } from "@mui/material";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      {new Date().getFullYear()}{" "}
      <Link
        color="inherit"
        href="https://github.com/CarlosMartinezAGV/travelknightsrtq"
      >
        TravelKnights
      </Link>
      {"."}
    </Typography>
  );
}
