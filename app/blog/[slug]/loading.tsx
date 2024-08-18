const loading = () => {
  return (
    <div>
      <div className="w-screen h-[200px] bg-muted animate-pulse"></div>
      <div className="max-w-prose mx-auto mt-20 prose space-y-3">
        <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
        <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
        <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
        <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
        <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
      </div>
    </div>
  );
};

export default loading;
