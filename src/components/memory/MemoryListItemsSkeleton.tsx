import Skeleton from "@mui/material/Skeleton";

function MemoryListItemsSkeleton() {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={40}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={40}
        animation="wave"
      />
    </>
  );
}

export default MemoryListItemsSkeleton;
