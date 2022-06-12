import clsx from "clsx";
import { Link as ReactRouterLink, LinkProps } from "react-router-dom";

type Props = LinkProps & {
  to: string;
  children?: React.ReactNode;
  className?: string;
};

const Link = ({ to, children, className, ...props }: Props) => {
  return (
    <ReactRouterLink
      to={to}
      className={clsx("text-blue-500", "dark:text-white", "className")}
      {...props}
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;
