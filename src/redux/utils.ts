// Dummy user data
export const USER = {
  id: 1,
  name: "John Doe",
};

// Keyboard functions

export const handleNoWhiteSpace = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};
