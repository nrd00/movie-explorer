const Footer = () => {
  return (
    <footer className="border-t border-gray-800 mt-10 bg-[#111622] pb-2">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <h2 className="text-xl font-bold text-white">
          Movie<span className="text-red-500">Land</span>
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Your favorite movies, all in one place.
        </p>

        <p className="text-xs text-gray-600 mt-4">
          © {new Date().getFullYear()} MovieLand. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
