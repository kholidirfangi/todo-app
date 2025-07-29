interface HeaderProps {
  isDark: boolean;
  setIsDark: (active: boolean) => void;
}

const Header = ({ isDark, setIsDark }: HeaderProps) => {
  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <div className="flex justify-between mb-7">
      <h1 className="text-white font-bold text-3xl tracking-[0.7rem]">TODO</h1>
      <button onClick={toggleDark} className="cursor-pointer">
        <img src={`./images/${isDark ? "icon-moon" : "icon-sun"}.svg`} alt="" />
      </button>
    </div>
  );
};

export default Header;
