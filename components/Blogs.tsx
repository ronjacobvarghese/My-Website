"use client";

import React, { useRef } from "react";

import SectionHeader from "./SectionHeader";
import useSectionInView from "@/hooks/use-section-in-view";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  blogs: {
    slug: string;
    metadata: {
      [key: string]: string;
    };
  }[];
}

export default function Blogs({ blogs }: Props) {
  const { ref } = useSectionInView("Blogs");
  const blogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      },
    }),
  };

  return (
    <section
      className="mb-28 max-w-[52rem] leading-8 sm:mb-40 scroll-mt-28"
      ref={ref}
      id="blogs"
    >
      <SectionHeader> My Blogs</SectionHeader>
      <div className="flex flex-col gap-4">
        {blogs.map((blog, index) => (
          <motion.div
            variants={fadeInAnimationVariants}
            onClick={() => router.replace(`/blogs/${blog.slug}`, {})}
            initial="initial"
            whileInView="animate"
            ref={blogRef}
            className="flex gap-4 border-b-2 border-gray-400/60 pl-4 py-4 hover:bg-gray-200/40 dark:hover:bg-slate-600/10 cursor-pointer"
            key={index}
            custom={index}
          >
            <div>
              <h2 className="text-left font-bold">{blog.metadata.title}</h2>
              <p className="pl-4 line-clamp-2 text-gray-600">
                {blog.metadata.excerpt}
              </p>
            </div>
            <img src={blog.metadata.cover_image} width={200} height={120} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
