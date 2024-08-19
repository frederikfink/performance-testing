import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string | null;
  className?: string;
}

const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={cn(className)}>
      <h1 className="mb-4 text-3xl font-medium tracking-tighter">{title}</h1>
      <h2 className="text-lg dark:text-muted-foreground text-primary tracking-tight">
        {subtitle}
      </h2>
    </div>
  );
};

export default Title;
