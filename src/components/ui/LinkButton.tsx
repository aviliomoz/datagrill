import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  children: string;
  url: string;
  icon?: LucideIcon;
  style?: "primary" | "secundary"
};

export const LinkButton = ({ children, url, icon: Icon, style = "primary" }: Props) => {
  return (
    <Link
      to={url}
      className={`bg-gradient-to-br ${style === "primary" ? "from-orange-500 to-orange-600 border-orange-600" : "from-white to-stone-50 border"} rounded-md px-2.5 sm:px-4 py-1 flex items-center gap-2 min-w-max shadow-sm`}
    >
      {Icon && <Icon className={`w-4 ${style === "primary" && "stroke-white"} stroke-[3px]`} />}
      <span className={`${style === "primary" && "text-white"} text-sm font-medium hidden sm:block`}>
        {children}
      </span>
    </Link>
  );
};
