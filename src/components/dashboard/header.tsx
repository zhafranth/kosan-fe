const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg border-b border-border/50">
      <div className="px-4 h-14 flex items-center justify-between">
        <h1 className="text-lg font-bold">Dashboard Kosan</h1>
        <button className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
