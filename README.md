# personal-site

`personal-site` 是一个基于 Astro 的个人网站，用于展示个人介绍、能力标签、代表作品和联系方式。首版采用 Git + Markdown 的内容维护方式，避免引入后台、数据库或登录体系。

## 技术栈

- Astro 静态站点。
- TypeScript 严格配置。
- Astro Content Collections 负责作品 Markdown frontmatter 校验。
- Vitest 用于基础测试和覆盖率。

## 本地命令

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run coverage
pnpm run smoke
pnpm run e2e
```

## 内容维护

- 个人资料维护在 `src/data/profile.ts`。
- 站点基础元数据维护在 `src/lib/site-metadata.ts`。
- 作品内容维护在 `src/content/works/*.md`。
- 作品详情页由 `src/pages/work/[slug].astro` 从 Markdown 生成。
- 全局样式维护在 `src/styles/global.css`。
- 静态资源维护在 `public/`。

## Harness 入口

- 项目约束: `.harness/constraints.md`
- 生命周期状态: `.harness/lifecycle-state.yml`
- 项目 manifest: `.harness/project-manifest.yml`
- 任务队列: `task-modeling/task-queue.json`

实现任务应在 `feature-` 前缀分支上执行，并通过 lint、typecheck、test、coverage、smoke、e2e 后再进入 PR/MR。
