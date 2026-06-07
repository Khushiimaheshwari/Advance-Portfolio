interface BadgeProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span className="px-2 py-1 text-xs rounded-full bg-white/10 border border-white/10">
      {children}
    </span>
  );
};

export default Badge;