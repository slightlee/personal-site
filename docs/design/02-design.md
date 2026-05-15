# Technical Design: personal-site

## 1. 关联文档

- PRD: `docs/requirements/01-prd.md`
- 项目约束: `.harness/constraints.md`
- 生命周期状态: `.harness/lifecycle-state.yml`

## 2. 方案目标

构建一个面向公开访问的个人网站，支持个人信息、作品集、作品详情和 Markdown 内容维护，同时符合企业级 harness 的文档确认、任务队列、质量门禁和 PR/MR 流程。

## 3. 技术栈候选

### 3.1 Astro 推荐

适合本项目的原因：

- 内容驱动网站的一等公民，天然适合 Markdown / MDX。
- 默认输出静态页面，性能好，部署简单。
- 可以按需引入交互组件，避免个人网站过度前端化。
- 适合后续扩展博客、作品详情、SEO、RSS、站点地图。

代价：

- 团队如果更熟悉 Vue/React，需要接受 Astro 的页面与内容集合模式。
- 复杂交互需要通过 islands 或框架组件补充。

### 3.2 Nuxt

适合场景：

- 需要更完整的 Vue SSR/SSG 应用能力。
- 未来可能扩展复杂交互、接口层或多语言路由。

代价：

- 对个人静态网站而言偏重。
- Markdown 内容维护需要额外内容模块或约定。

### 3.3 Next.js

适合场景：

- 偏 React 技术栈。
- 需要 Vercel 生态、MDX、复杂页面能力。

代价：

- 对当前个人网站目标偏重。
- 当前项目没有明确 React 偏好。

### 3.4 Vue + Vite

适合场景：

- 最小前端应用。
- UI 交互简单，构建直接。

代价：

- Markdown 内容集合、路由、SEO、静态生成都要自己补更多工程约定。
- 长期维护内容型网站不如 Astro 顺手。

## 4. 推荐方案

推荐使用 **Astro + Markdown Content Collections + 少量 TypeScript**。

理由：

- PRD 明确要求 Markdown 内容维护，Astro 与内容型站点匹配度最高。
- 个人网站以静态内容展示为主，不需要重型 SPA。
- 首版可以保持简单，后续仍能扩展 MDX、博客、RSS、站点地图和少量交互。
- 更符合 KISS / YAGNI：把复杂度放在内容结构和质量门禁，而不是应用框架状态管理。

## 5. 项目结构

建议结构：

```text
personal-site/
├── README.md
├── .harness/
│   ├── project-manifest.yml
│   ├── constraints.md
│   ├── lifecycle-state.yml
│   └── observability/
├── docs/
├── task-modeling/
├── public/
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   └── works/
│   │       ├── notes-pilot.md
│   │       ├── portfolio-system.md
│   │       └── harness-template.md
│   ├── data/
│   │   └── profile.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── work/
│   │       └── [slug].astro
│   └── styles/
│       └── global.css
├── tests/
│   └── content.test.mjs
├── scripts/
│   ├── lint.mjs
│   ├── smoke-dev-server.mjs
│   └── e2e-personal-site.mjs
├── package.json
└── astro.config.mjs
```

根目录 `README.md` 应在项目骨架任务中生成，用于说明：

- 项目定位和访问目标。
- 技术栈和内容维护方式。
- 本地开发、构建、测试、smoke、e2e 命令。
- Markdown 作品内容新增规则。
- 企业 harness 流程入口、约束文件和生命周期状态。
- 分支、远端仓库和 PR/MR 规则。

## 6. 内容模型

### 6.1 Profile

`src/data/profile.ts` 维护结构化个人信息：

- `name`
- `headline`
- `intro`
- `location`
- `email`
- `socialLinks`
- `skills`

### 6.2 Works

`src/content/works/*.md` 使用 frontmatter：

```yaml
title: "Project title"
summary: "Short summary"
date: "2026-05-15"
role: "Frontend Engineer"
tags: ["Astro", "Content", "Testing"]
externalUrl: ""
repoUrl: ""
featured: true
```

正文建议包含：

- 背景
- 问题
- 方案
- 结果
- 反思

## 7. 内容维护方案

### 7.1 首版决策

首版采用 **Git + Markdown** 维护内容，不提供站内管理入口，不提供登录，不建设独立后台。

理由：

- 个人网站首版内容维护频率有限，Git + Markdown 足够简单可靠。
- 内容变更可以天然纳入企业级流程：分支、PR、测试、审计和发布。
- 不引入数据库、鉴权、后台和在线编辑器，降低安全风险和维护成本。
- 与 Astro Content Collections 匹配度高。

### 7.2 维护入口

- 作品内容：`src/content/works/*.md`
- 个人信息：`src/data/profile.ts`
- 全局样式：`src/styles/global.css`
- 静态资源：`public/`
- 项目说明：`README.md`

### 7.3 内容更新流程

```text
创建内容分支
-> 新增或修改 Markdown
-> 本地预览
-> 执行 lint / test / smoke / e2e
-> 提交 PR 到 develop
-> 合并后发布
```

内容更新也必须经过 harness task queue 或至少经过同等质量门禁，不允许绕过 PR/MR 直接修改 `develop/main`。

### 7.4 暂不建设

- `/admin` 路由。
- 登录入口。
- 站内在线编辑器。
- 独立管理端。
- 数据库。
- 内容审核流。

### 7.5 后续演进

如果后续出现以下情况，再评估 Headless CMS 或独立管理端：

- 内容维护频率显著提升。
- 需要非技术用户维护内容。
- 需要草稿、预览、审核、定时发布。
- 需要多人协作和权限管理。

## 8. 页面设计

### 8.1 首页

- Hero：姓名、定位、简介、联系方式。
- About：更完整的个人介绍。
- Skills：核心能力标签。
- Works：精选作品列表。
- Contact：Email、GitHub、LinkedIn 等链接。

### 8.2 作品详情页

- 标题、摘要、角色、标签、日期。
- Markdown 正文渲染。
- 外部链接和代码仓库链接。
- 返回作品列表入口。

## 9. 视觉原则

- 简洁现代，内容优先。
- 使用高质量排版、清晰层级和足够留白。
- 避免重装饰、过量动效和复杂背景。
- 保证移动端阅读体验，不让文字或卡片重叠。
- 首版不引入设计系统库，使用原生 CSS 保持轻量。

## 10. 质量门禁

Manifest 进入实现阶段后建议配置：

- `cmd_lint`: `pnpm run lint`
- `cmd_typecheck`: `pnpm run typecheck`
- `cmd_smoke`: `pnpm run smoke`
- `cmd_test`: `pnpm run test`
- `cmd_coverage`: `pnpm run coverage`
- `cmd_e2e`: `pnpm run e2e`
- `cmd_security`: `pnpm audit --audit-level=high --prod`

测试覆盖：

- 内容模型 frontmatter 校验。
- 作品排序和筛选逻辑。
- 首页关键内容可见。
- 作品详情页可访问。
- smoke 启动 dev server 并验证页面和关键资源。
- e2e 覆盖首页、作品列表、详情跳转、联系入口。

## 11. GitHub 与交付

- 远程仓库: `git@github.com:slightlee/personal-site.git`
- 目标分支: `develop`
- 任务分支前缀: `feature-`
- PR 命令: `gh pr create --base develop --head $(git branch --show-current) --fill`

实现前需要确认：

- 本机 SSH key 可访问该仓库。
- 已安装并登录 `gh`，或将 `cmd_pr_open` 替换为团队可用的 PR 创建命令。
- 远端存在 `develop` 分支，或先按仓库规范创建。

## 12. 风险与应对

- **PR CLI 缺失**：workflow 会在 PR 阶段失败。实现前确认 `gh` 或替换命令。
- **Markdown frontmatter 错误**：通过内容 schema 和单元测试提前暴露。
- **内容维护入口过重**：首版不建设登录和后台，避免把静态个人网站变成 CMS 系统。
- **过度设计**：首版聚焦个人信息、作品列表和详情，不做 CMS、不做复杂动画。
- **SEO 遗漏**：BaseLayout 统一维护 title、description 和 Open Graph。

## 13. 确认记录

- 技术方案状态: 已确认
- 确认人: user
- 确认时间: 2026-05-15
- 备注: 用户确认技术方案可用，进入 UI 设计阶段。
