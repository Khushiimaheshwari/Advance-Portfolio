interface SectionHeaderProps {
  kicker?: string;
  title: string;
  center?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ kicker, title, center }) => {
  return (
    <div className={`${center ? "text-center" : ""} mb-10`}>
      {kicker && (
        <p className="uppercase tracking-widest text-xs text-indigo-300/80">{kicker}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-400">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;