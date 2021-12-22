import site from '../data/site';

type ArticleSchemaConfig = {
    title: string
    permalink: string
    date: string
    ogImageUrl: string
    description: string
}
function ArticleSchema({title, permalink, date, ogImageUrl, description}: ArticleSchemaConfig) {
    const ldData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": {
            "@type": "Organization",
            "name": `${site.name}`,
            "url": `${site.blogPath}`,
        },
        "author": {
            "@type": "Person",
            "name": `${site.name}`,
            "image": {
                "@type": "ImageObject",
                "url": `${site.url}/assets/img/favicon.png`,
                "width": 512,
                "height": 512
            },
            "url": `${site.url}${site.aboutPath}`,
            "sameAs": [
                `${site.url}`,
                `${site.twitterURL}`,
            ]
        },
        "headline": `${title}`,
        "url": `${permalink}`,
        "datePublished": `${date}`,
        "image": {
            "@type": "ImageObject",
            "url": `${site.url}${ogImageUrl}`,
            "width": 3600,
            "height": 1890
        },
        "description": `${description}`,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${site.url}${site.blogPath}`
            }
        }
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ldData, null, 4)}} />
        </>
    );
}

export default ArticleSchema;