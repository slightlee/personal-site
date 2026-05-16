export const profile = {
  name: "李明",
  headline: "面向内容型产品和工程自动化的全栈工程师",
  intro:
    "我把产品想法落成可维护的软件系统，关注清晰架构、稳定交付、内容体验和自动化质量门禁。",
  location: "上海 / 远程协作",
  email: "hello@example.com",
  availability: "开放产品工程、个人网站、内容系统和工程流程自动化相关合作。",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/slightlee",
    },
    {
      label: "邮箱",
      href: "mailto:hello@example.com",
    },
  ],
  stats: [
    {
      value: "7+",
      label: "端到端交付阶段",
    },
    {
      value: "100%",
      label: "当前质量门禁覆盖",
    },
    {
      value: "Markdown",
      label: "内容维护方式",
    },
  ],
  skills: [
    "前端架构",
    "Astro",
    "TypeScript",
    "工作流自动化",
    "测试策略",
    "技术写作",
  ],
  principles: [
    {
      title: "先把问题说清楚",
      description: "用 PRD、设计文档和任务拆解统一上下文，避免一边实现一边猜需求。",
    },
    {
      title: "让质量门禁自动运行",
      description: "把 lint、typecheck、测试、覆盖率和交付证据放进流程，而不是靠记忆执行。",
    },
    {
      title: "内容和代码同等可维护",
      description: "作品、说明和案例使用 Markdown 管理，结构化数据由测试保护。",
    },
  ],
} as const;
