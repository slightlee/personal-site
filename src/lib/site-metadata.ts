export const siteMetadata = {
  title: "李明的个人网站",
  description:
    "李明的个人网站，展示产品工程、前端架构、内容系统和自动化交付实践。",
  contactEmail: "hello@example.com",
} as const;

export function contactHref(email = siteMetadata.contactEmail): string {
  return `mailto:${email}`;
}
