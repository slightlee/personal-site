export const siteMetadata = {
  title: "personal-site",
  description:
    "personal-site 项目骨架，后续将承载个人介绍、作品集与 Markdown 案例内容。",
  contactEmail: "hello@example.com",
} as const;

export function contactHref(email = siteMetadata.contactEmail): string {
  return `mailto:${email}`;
}
