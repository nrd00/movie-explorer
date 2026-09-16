import { HeartPlus } from "lucide-react";

const WishButton = () => {
  return (
    <>
      <button
        type="button"
        className="rounded-full px-4 py-2 bg-white/10 text-white cursor-pointer transition duration-200 hover:bg-white/20 hover:text-red-500"
      >
        <HeartPlus size={22} />
      </button>
    </>
  );
};

export default WishButton;
