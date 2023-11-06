import { default as matter } from "gray-matter";
import Markdown from "react-markdown";
import fs from "fs";

import "./blogs.css";

interface Props {
  params: {
    slug: string;
  };
}

const getBlogContent = (slug: string) => {
  const filePath = "lib/blogs/" + slug + ".md";
  const file = fs.readFileSync(filePath);
  const { data: metadata, content: blogContent } = matter(file);
  return {
    metadata,
    blogContent,
  };
};

export default function BlogPage({ params }: Props) {
  const { metadata, blogContent: content } = getBlogContent(params.slug);

  return (
    <>
      <header className="pb-10 text-center w-full text-2xl font-bold">
        <h1>{metadata.title}</h1>
      </header>
      <Markdown>{content}</Markdown>;
    </>
  );
}
