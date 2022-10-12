import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTranslation } from "next-i18next";

interface Breadcrumb {
  breadcrumb: string;
  href: string;
}

export default function Breadcrumbs() {
  const { t } = useTranslation();
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[] | null>(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => ({
        breadcrumb: path,
        href: "/" + linkPath.slice(0, i + 1).join("/"),
      }));

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return (
      <MuiBreadcrumbs separator={<NavigateNextIcon />}>
        <NextLink href="/" passHref>
          <Link>{t("/")}</Link>
        </NextLink>
      </MuiBreadcrumbs>
    );
  }

  return (
    <MuiBreadcrumbs separator={<NavigateNextIcon />}>
      <NextLink href="/" passHref>
        <Link>{t("/")}</Link>
      </NextLink>
      {breadcrumbs.map((breadcrumb) => {
        return (
          <NextLink href={breadcrumb.href} passHref key={breadcrumb.href}>
            <Link>{t(breadcrumb.href)}</Link>
          </NextLink>
        );
      })}
    </MuiBreadcrumbs>
  );
}
