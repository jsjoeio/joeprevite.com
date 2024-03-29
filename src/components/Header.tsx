import site from "../data/site";

type Props = {
  isBlog?: boolean;
};

function Header({ isBlog }: Props) {
  return (
    <header className="flex flex-row justify-between items-center pt-4 pb-2">
      <a href="/" className="flex items-center py-6 hover:no-underline">
        <svg
          className="mr-3"
          width="50"
          height="65"
          viewBox="0 0 50 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{site.name}</title>
          <path
            d="M10.1695 19.9333L0 23.4L6.06061 49.8837L21.3148 45.9434L20.339 58.9333L35.5932 65V45.0667L50 39L42.3729 15.6L29.5455 17.3837L31.8182 3.02326L11.8644 0L10.1695 19.9333Z"
            fill="#B63D3D"
          />
          <path
            d="M24.2424 18.1396L24.9999 9.82561L17.4242 7.55817V32.5L13.6363 33.2558L12.1212 24.9419L6.06055 26.4535L8.33327 34.7675L9.84843 42.3256L15.909 40.814L23.4848 39.3024V30.9884L24.2424 18.1396Z"
            fill="black"
            stroke="black"
          />
          <path
            d="M49.9998 38.7454L42.2076 15.1163L22.2942 17.7417L19.6968 43.1212V58.8739L35.2812 65V44.8715L49.9998 38.7454Z"
            fill="#C67171"
          />
          <path
            d="M24.2424 18.1396L24.9999 9.82561L17.4242 7.55817V32.5L13.6363 33.2558L12.1212 24.9419L6.06055 26.4535L8.33327 34.7675L9.84843 42.3256L15.909 40.814L23.4848 39.3024V30.9884L24.2424 18.1396Z"
            fill="black"
            stroke="black"
          />
          <path
            d="M25.3428 45.3607L24.3156 53.6458L31.8137 56.157L32.3369 40.0582L37.6787 38.9539L43.7852 37.639L41.7837 29.2559L40.5149 21.6528L34.4083 22.9676L26.7875 24.2335L26.5174 32.5431L25.3428 45.3607Z"
            fill="black"
            stroke="black"
          />
          <path
            d="M25.3428 45.3607L24.3156 53.6458L31.8137 56.157L32.3369 40.0582L37.6787 38.9539L43.7852 37.639L41.7837 29.2559L40.5149 21.6528L34.4083 22.9676L26.7875 24.2335L26.5174 32.5431L25.3428 45.3607Z"
            fill="black"
            stroke="black"
          />
          <path
            d="M39.3941 34.4651L36.8689 27.2093L31.8184 29.0232V36.2791L39.3941 34.4651Z"
            fill="#C67171"
            stroke="black"
          />
        </svg>
        <span className="text-default hover:text-lg transition-all hover:text-link">
          {site.name}
        </span>
      </a>
      {isBlog && <a href="/blog">See all posts</a>}
    </header>
  );
}

export default Header;
