import { PropsWithChildren } from 'react';

type NavItemProps = PropsWithChildren<{
  href: string;
  handleClick?: () => void;
}>;

export function NavItem(props: NavItemProps) {
  return (
    <a
      onClick={(ev) => {
        ev.preventDefault();
        props.handleClick?.();
      }}
      className={`
        transition-[brightness, scale]
        rounded-lg
        bg-white
        p-4
        text-2xl
        font-bold
        text-black
        duration-200
        hover:brightness-90
        active:scale-90
      `}
      href={props.href}
    >
      {props.children}
    </a>
  );
}
