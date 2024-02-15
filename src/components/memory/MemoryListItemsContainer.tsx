import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function MemoryListItemsContainer({ children }: { children: React.ReactNode }) {
  return (
    <Stack direction="column" sx={{ width: "100%" }}>
      <Stack
        pl={{ xs: 1, sm: 2.2 }}
        pr={{ xs: 2, sm: 3 }}
        pb={0.5}
        width="100%"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography flex={1} fontWeight="bold">
          Title
        </Typography>
        <Typography flex={1} fontWeight="bold">
          City
        </Typography>
        <Typography flex={1} fontWeight="bold">
          Start Date
        </Typography>
        <Typography flex={1} fontWeight="bold">
          End Date
        </Typography>
      </Stack>
      {children}
    </Stack>
  );
}

export default MemoryListItemsContainer;
