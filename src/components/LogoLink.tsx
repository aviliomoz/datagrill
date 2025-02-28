import { Link } from "react-router-dom";
// import logo from "/logo3.svg";

type Props = {
  showTitle?: boolean;
  width?: "md" | "xl"
};

export function LogoLink({ showTitle = true, width = "md" }: Props) {
  return (
    <Link to={"/"} className={`flex items-center gap-2 ${width === "md" ? "text-xl" : "text-2xl"} font-bold`}>
      {/* <img src={logo} width={24} height={24} /> */}
      <span className="bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md size-5 relative">
        <span className="absolute bg-stone-50 rounded-[2.7px] size-2 top-1 right-1"></span>
      </span>
      <span className={`${showTitle && "hidden sm:flex tracking-wider font-furai items-center gap-2"}`}>Garlink</span>
    </Link>
  );
}
