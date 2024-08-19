export const prettyDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (secondsAgo < 60) {
    return "just now";
  } else if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo <= 7) {
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric", // e.g., 17
      month: "short", // e.g., Aug
      year: "numeric", // e.g., 2024
    };
    return date.toLocaleDateString("en-US", options);
  }
};
