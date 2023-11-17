import React from "react";
import { allBlogs } from "../../../.contentlayer/generated";
import RenderMdx from "@/components/RenderMdx";

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath }));
}

export default function BlogPage({ params }: { params: any }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);

  return (
    <>
      <article>
        <div className="mb-8 text-center relative w-full h-[15vh] bg-dark">
          <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6">
            {blog?.title}
          </h1>
          <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
        </div>

        <div className="lg:flex gap-y-8 lg:gap-8 sxl:gap-16 px-5 md:px-10">
          <div className="max-w-[43rem]">
            <details
              className="border-[1px] border-solid border-black dark:border-light text-dark dark:text-light rounded-lg p-4 sticky top-6 max-h-full overflow-hidden overflow-y-auto"
              open
            >
              <summary className="text-lg font-semibold capitalize cursor-pointer">
                Table Of Content
              </summary>
              <ul className="mt-4 font-in text-base">
                {blog?.toc.map((heading: any) => {
                  return (
                    <li key={`#${heading.slug}`} className="py-1">
                      <a
                        href={`#${heading.slug}`}
                        data-level={heading.level}
                        className="data-[level=two]:pl-0  data-[level=two]:pt-2
                                       data-[level=two]:border-t border-solid border-black/40
                                       dark:border-slate-400/40
                                       data-[level=three]:pl-4
                                       sm:data-[level=three]:pl-6
                                       flex items-center justify-start
                                       "
                      >
                        {heading.level === "three" ? (
                          <span className="flex w-1 h-1 rounded-full bg-dark mr-2">
                            &nbsp;
                          </span>
                        ) : null}

                        <span className="hover:underline">{heading.text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </div>
          <div className="lg:w-3/4 blog">
            <RenderMdx blog={blog!} />
          </div>
        </div>
      </article>
    </>
  );
}
