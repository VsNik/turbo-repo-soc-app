import { cn } from "@shared/libs/utils";
import { User } from "@shared/types";
import { Link } from "react-router-dom";
import stc from "string-to-color";

type Props = {
  user: User;
  size?: number;
  isLink?: boolean;
  className?: string;
};

export function Avatar({ user, size = 48, isLink, className }: Props) {
  const letterSize = `${Math.floor(size * 0.6)}px`;

  return (
    <div
      className={cn(
        `relative flex items-center justify-center rounded-full`,
        {
          "bg-white": !user.avatar,
        },
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `${stc(user.displayName)}`,
      }}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.displayName}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className={`text-white`} style={{ fontSize: letterSize }}>
          {user.displayName[0].toUpperCase()}
        </span>
      )}
      {isLink && (
        <Link
          to={`/user/${user.username}`}
          className="absolute w-full h-full rounded-full bg-gray-500 opacity-0 hover:opacity-30 transition-all duration-300"
        />
      )}
    </div>
  );
}
