import Spacer from "./Spacer";
import publishDateToMachineFriendlyDate from "../utils/publishDateToMachineFriendlyDate";

export interface BlogPostProps {
  title: string;
  date: string;
  html: string;
}

function BlogPost(props: BlogPostProps) {
  const { title, html, date } = props;
  const machineFriendlyDate = publishDateToMachineFriendlyDate(date);
  // Source: https://stackoverflow.com/a/60121079/3015595
  const friendlyDate = new Date(date)
    .toLocaleString()
    .split(/\D/)
    .slice(0, 3)
    .map((num) => num.padStart(2, "0"))
    .join("/");

  return (
    <article id="post" className="mx-auto my-8">
      <h1 className="mb-4">{title}</h1>
      <p className="font-xs">
        Last updated:{" "}
        <time className="font-light" dateTime={machineFriendlyDate}>
          {friendlyDate}
        </time>
      </p>
      <Spacer />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

export default BlogPost;
