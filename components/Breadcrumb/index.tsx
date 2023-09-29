import React from "react";
import { useRouter } from "next/router";

import { breadcrumbTitleAdjustment, getLastItem } from "functions";

import styles from "styles/components/Breadcrumb.module.css";

interface IBreadcrumb {
  description?: string;
}

export const Breadcrumb = ({ description }: IBreadcrumb) => {
  const { pathname } = useRouter();

  const splitedPathname = pathname.split("/");

  return (
    <section className={styles.container}>
      <div className={styles.breadcrumb}>
        {splitedPathname.map((path: string, idx: number) =>
          path === "" ? (
            <div key={`Breadcrumb-Home`}>
              <span title="home">Home</span>
              <span>{`>`}</span>
            </div>
          ) : (
            <div key={`Breadcrumb-${breadcrumbTitleAdjustment(path)}`}>
              <span title={breadcrumbTitleAdjustment(path)}>
                {breadcrumbTitleAdjustment(path)}
              </span>
              {splitedPathname.length === idx && <span>{`>`}</span>}
            </div>
          )
        )}
      </div>

      <h1>
        {breadcrumbTitleAdjustment(getLastItem(splitedPathname).toString())}
      </h1>
      <p>{description}</p>
    </section>
  );
};
