export const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-500 p-3 text-center text-sm">
      {message || 'Something went wrong!'}
    </div>
  );
};
