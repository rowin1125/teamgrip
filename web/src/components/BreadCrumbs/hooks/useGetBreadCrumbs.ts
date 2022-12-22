import { useEffect, useState } from 'react';

import { useLocation } from '@redwoodjs/router';

import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

type BreadCrumb = {
  breadCrumb: string;
  href: string;
};

export const useGetBreadCrumbs = (homepage = 'Dashboard') => {
  const [breadCrumbs, setBreadCrumbs] = useState<Array<BreadCrumb> | null>(
    null
  );

  const { pathname } = useLocation();
  if (!pathname) return { breadCrumbs, setBreadCrumbs };

  const sliced = pathname.split('/');
  const subTitle =
    pathname === '/'
      ? homepage
      : capitalizeText(sliced[sliced.length - 1].split('?')[0]);

  useEffect(() => {
    if (!pathname) return;

    const linkPath = pathname.split('/');
    linkPath.shift();

    const pathArray = linkPath.map((path, i) => {
      return {
        breadCrumb: path === '' ? homepage : capitalizeText(path.split('?')[0]),
        href: '/' + linkPath.slice(0, i + 1).join('/'),
      };
    });

    setBreadCrumbs(pathArray);
  }, [homepage, pathname]);

  return { breadCrumbs, subTitle };
};
