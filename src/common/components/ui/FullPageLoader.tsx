export const FullPageLoader = () => {
  return (
    <div className="absolute flex h-screen w-full items-center justify-center bg-white">
      <span className="loading loading-spinner text-info w-14 h-14"></span>
    </div>
  );
};
