const ContentLoadingSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto mt-20 prose space-y-3">
      <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
      <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
      <div className="h-48 rounded bg-muted animate-pulse w-full"></div>
      <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
      <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
      <div className="h-8 rounded bg-muted animate-pulse w-full"></div>
    </div>
  );
};

export default ContentLoadingSkeleton;
