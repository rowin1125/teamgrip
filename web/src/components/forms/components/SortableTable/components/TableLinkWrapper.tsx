import React from "react";

import NextLink from "next/link";

type TableLinkWrapperProps = {
  href: string;
  children: React.ReactNode;
};

const TableLinkWrapper = ({ href, children }: TableLinkWrapperProps) => (
  <NextLink href={href} passHref>
    <a>{children}</a>
  </NextLink>
);

export default TableLinkWrapper;
