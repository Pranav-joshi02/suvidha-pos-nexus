"use client";

import NextLink from "next/link";
import { usePathname, useRouter, useParams as useNextParams } from "next/navigation";
import { useEffect } from "react";

type LinkProps = React.ComponentProps<typeof NextLink> & { to?: string };

export function Link({ to, href, ...props }: LinkProps) {
  const finalHref = href ?? to ?? "#";
  // @ts-expect-error NextLink accepts string href
  return <NextLink href={finalHref} {...props} />;
}

export function useNavigate() {
  const router = useRouter();
  return (to: string) => router.push(to);
}

export function useLocation() {
  const pathname = usePathname();
  return { pathname } as { pathname: string };
}

export function useParams<T extends Record<string, string>>() {
  return useNextParams() as unknown as T;
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [router, to, replace]);
  return null;
}

