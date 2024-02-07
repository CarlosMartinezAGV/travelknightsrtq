import CircularProgress from "@mui/material/CircularProgress";
import { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";

type MyCustomButtonProps = ButtonProps & {
  isLoading: boolean;
};

const LoadingProgressButton: React.FC<MyCustomButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <CircularProgress size={24} /> : children}
    </Button>
  );
};

export default LoadingProgressButton;
