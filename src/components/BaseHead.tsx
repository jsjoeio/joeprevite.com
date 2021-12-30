import getShareImageModule from "@jlengstorf/get-share-image";
import ArticleSchema from "./ArticleSchema";
import site from "../data/site";

export interface BaseHeadProps {
  title: string;
  tagline?: string;
  description: string;
  date: string;
  canonicalURL?: string;
  articleSchema?: boolean;
  astroResolve: any;
}

function BaseHead(props: BaseHeadProps) {
  const {
    title,
    tagline = "Read more",
    description,
    date,
    canonicalURL,
    articleSchema,
    astroResolve,
  } = props;

  // @ts-ignore This is a workaround
  // See: https://github.com/jlengstorf/get-share-image/issues/17#issue-736531977
  const getShareImage = getShareImageModule.default;
  const openGraphImageURL = getShareImage({
    title,
    tagline,
    titleExtraConfig: "_bold",
    titleFont: "Roboto",
    taglineFont: "Roboto",
    textColor: 'ebcdcd',
    cloudName: site.cloudinaryCloudName,
    imagePublicID: site.cloudinaryImagePublicID,
  });

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />

      {/* Favicon for all browsers */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={astroResolve(`../../assets/favicon-32x32.png`)}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={astroResolve(`../../assets/favicon-16x16.png`)}
      />

      {/* For Google and Android */}
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href={astroResolve(`../../assets/favicon-48x48.png`)}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={astroResolve(`../../assets/favicon-192x192.png`)}
      />

      {/* For iPad */}
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="167x167"
        href={astroResolve(`../../assets/favicon-167x167.png`)}
      />
      {/* For iPhone */}
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href={astroResolve(`../../assets/favicon-180x180.png`)}
      />

      {/* Global CSS */}
      <link rel="stylesheet" href={astroResolve(`../styles/global.css`)} />
      {/* Syntax highlighting */}
      {/* <link rel="stylesheet" href={`/src/styles/prism-dracula.css`} /> */}
      {/* Primary Meta Tags */}
      <title>{title || site.title}</title>
      <meta name="title" content={title || site.title} />
      <meta name="description" content={description || site.description} />
      {/* Sitemap */}
      <link rel="sitemap" href="/sitemap.xml" />
      {/* RSS */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${site.name}'s Blog`}
        href={`${site.url}/rss.xml`}
      />
      {/* Canonical */}
      <link rel="canonical" href={canonicalURL} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalURL || site.url} />
      <meta property="og:title" content={title || site.title} />
      <meta
        property="og:description"
        content={description || site.description}
      />
      <meta property="og:image" content={openGraphImageURL} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalURL || site.url} />
      <meta property="twitter:title" content={title || site.title} />
      <meta
        property="twitter:description"
        content={description || site.description}
      />
      <meta property="twitter:image" content={openGraphImageURL} />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
        as="style"
        onLoad={() => {
          this.onload = null;
          this.rel = "stylesheet";
        }}
      />
      <noscript>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
          type="text/css"
        />
      </noscript>
      {articleSchema && (
        <ArticleSchema
          title={title}
          description={description}
          canonicalURL={canonicalURL || site.url}
          date={date}
          ogImageUrl={openGraphImageURL}
        />
      )}
    </>
  );
}

export default BaseHead;
