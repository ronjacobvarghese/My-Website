import Intro from "@/components/Intro";
import About from "@/components/About";
import SectionDivider from "@/components/section-divider";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Blogs from "@/components/Blogs";
// import Contact from "@/components/Contact";
import fs from "fs";
import matter from "gray-matter";

const getBlogsMetadata = () => {
  const folder = "lib/blogs";
  const files = fs.readdirSync(folder);
  const blogs = files.map((file) => {
    const slug = file.replace(".md", "");

    const mdFile = fs.readFileSync(`${folder}/${file}`, "utf-8");

    const { data: metadata } = matter(mdFile);

    return {
      slug,
      metadata,
    };
  });

  return blogs;
};

export default function Home() {
  const blogsData = getBlogsMetadata();
  return (
    <>
      <div className="bg-[#fbe2e3] absolute top-[-6rem] right-[11rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#346263]" />
      <div className="bg-[#dbd7fb] absolute top-[-6rem] right-[11rem] -z-10 h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:[#676394]" />
      <main className="flex flex-col items-center px-4">
        <Intro />
        <SectionDivider />
        <About />
        <Blogs blogs={blogsData} />
        <Projects />
        <Skills />
        <Experience />
        {/* <Contact /> */}
      </main>
    </>
  );
}
