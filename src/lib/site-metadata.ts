export const siteMetadata = {
  title: "李明的个人网站",
  description:
    "李明的个人网站，展示产品工程、前端架构、内容系统和自动化交付实践。",
  siteUrl: "https://slightlee.github.io/personal-site",
  locale: "zh_CN",
  ogImage: "/og-image.svg",
  ogImageAlt: "李明个人网站的分享封面",
  contactEmail: "hello@example.com",
} as const;

export function contactHref(email = siteMetadata.contactEmail): string {
  return `mailto:${email}`;
}

export function absoluteSiteUrl(path = "/"): string {
  const baseUrl = siteMetadata.siteUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
