interface Props {
  title: string;
  subtitle?: string | null;
}

const Title = ({ title, subtitle }: Props) => {
  return (
    <div className="my-12 animate-in">
      <h1 className="mb-4 text-3xl font-medium tracking-tighter">{title}</h1>
      <h2 className="text-lg dark:text-muted-foreground text-primary tracking-tight">
        {subtitle}
      </h2>
    </div>
  );
};

export default Title;
