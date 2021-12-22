
export interface BlogPostProps {
  title: string;
  date: string;
  html: string
}

function publishDateToMachineFriendlyDate(date: string) {
  return new Date(date).toISOString()
}

function BlogPost(props: BlogPostProps) {
    const { title, html, date } = props;
    const machineFriendlyDate = publishDateToMachineFriendlyDate(date)

    return (
        <article style={{
            margin: "0 auto",
            padding: "1rem",
            maxWidth: "960px"
        }}>
            <h1>{title}</h1>
            <p>Last updated: <time dateTime={machineFriendlyDate}>{date}</time></p>
            <div dangerouslySetInnerHTML={{__html: html}} />
        </article>
    )
}

export default BlogPost
