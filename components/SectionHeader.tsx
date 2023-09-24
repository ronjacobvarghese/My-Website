type SectionHeaderProps = {
  children: React.ReactNode;
};

export default function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <h2 className="text-3xl mb-8 font-medium capitalize text-center">
      {children}
    </h2>
  );
}
