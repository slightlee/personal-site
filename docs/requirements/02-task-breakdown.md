# Personal Site 任务拆解清单

## 说明

本清单承接：

- `docs/requirements/01-prd.md`
- `docs/design/02-design.md`
- `docs/design/03-ui-design.md`

本文只描述业务与技术增量的任务拆分。企业级阶段、审批、审计、质量门禁和 PR/MR 交付由 harness workflow、manifest 和 validators 统一约束。

## 前置确认

- PRD 状态: 已确认
- 技术方案状态: 已确认
- UI 设计状态: 已确认
- 任务拆解状态: 已确认
- 确认人: user
- 确认时间: 2026-05-15

## 任务总览

| 顺序 | task_id | 标题 | 业务/技术增量 | 验收重点 | 风险 |
|---:|---|---|---|---|---|
| 1 | personal-site-t01 | 搭建 Astro 项目骨架与 README | 建立 Astro 项目、基础脚本、README、harness manifest 实现阶段配置 | 项目可安装、构建、README 清晰、manifest 命令真实 | LOW |
| 2 | personal-site-t02 | 建立个人资料与 Markdown 内容模型 | 建立 profile 数据、works content collection 和示例作品 Markdown | frontmatter 校验、至少 3 个作品条目、内容测试通过 | LOW |
| 3 | personal-site-t03 | 实现首页内容结构 | 实现 Hero、About、Skills、Works、Contact 首页内容 | 首页展示个人信息、作品列表和联系入口 | LOW |
| 4 | personal-site-t04 | 实现作品详情页与 Markdown 渲染 | 增加作品详情路由、Markdown 正文渲染和返回导航 | 作品详情可访问，正文阅读体验稳定 | LOW |
| 5 | personal-site-t05 | 实现 UI 视觉与响应式样式 | 按 UI 设计实现全局样式、卡片、排版、响应式和 focus 状态 | 移动端/桌面端不重叠，视觉符合 UI 设计 | LOW |
| 6 | personal-site-t06 | 内容丰富化、视觉升级与中文统一 | 基于个人网站调研补齐信息密度、统一中文文案、升级整体视觉系统 | 首页内容更完整；可见文案以中文为主；视觉风格统一 | LOW |
| 7 | personal-site-t07 | 补齐 SEO、可访问性与静态资源 | 增加 metadata、Open Graph、favicon、语义化结构和 alt 规则 | SEO 信息存在，基础 a11y 检查通过 | LOW |
| 8 | personal-site-t08 | 补齐 smoke、E2E、覆盖率与交付证据 | 增加 smoke/e2e 脚本、测试报告、交付文档，验证 PR/MR 阶段 | 全门禁通过；有 remote/gh 时创建 PR | LOW |

## T01: 搭建 Astro 项目骨架与 README

### 目标

建立可运行的 Astro 项目基础结构，并把 bootstrap manifest 更新为实现阶段真实配置。

### 业务/技术增量

- 创建 `package.json`、`astro.config.mjs`、`tsconfig.json`。
- 创建 `src/`、`public/`、`tests/`、`scripts/` 基础目录。
- 创建根目录 `README.md`。
- 配置 `lint`、`typecheck`、`test`、`coverage`、`smoke`、`e2e` 脚本占位或基础实现。
- 更新 `.harness/project-manifest.yml` 为 Astro 项目真实命令。

### 验收重点

- 依赖安装可成功。
- `README.md` 说明项目定位、内容维护、命令和 harness 入口。
- `astro build` 可执行。
- manifest 命令不再为空。

## T02: 建立个人资料与 Markdown 内容模型

### 目标

建立个人信息和作品内容模型，让内容可以通过 Markdown 文件维护。

### 业务/技术增量

- 创建 `src/data/profile.ts`。
- 创建 `src/content/config.ts`。
- 创建 `src/content/works/*.md` 示例作品，至少 3 个。
- 定义 works frontmatter schema。
- 增加内容模型单元测试。

### 验收重点

- 至少 3 个作品条目。
- frontmatter 必填字段缺失时能被测试或构建暴露。
- profile 数据包含姓名、定位、简介、联系方式和技能。

## T03: 实现首页内容结构

### 目标

实现首页核心内容结构，让访问者快速理解个人信息和作品概览。

### 业务/技术增量

- 创建 `src/pages/index.astro`。
- 创建基础 layout。
- 展示 Hero、About、Skills、Featured Works、Contact。
- 作品卡片链接到详情页。

### 验收重点

- 首页展示姓名、定位、简介、技能、作品和联系方式。
- 联系入口使用 `mailto:`。
- 作品卡片信息完整。

## T04: 实现作品详情页与 Markdown 渲染

### 目标

访问者可以进入作品详情，阅读 Markdown 维护的项目案例。

### 业务/技术增量

- 创建 `src/pages/work/[slug].astro`。
- 渲染作品 frontmatter 和 Markdown 正文。
- 提供返回首页或作品列表的导航。
- 支持外部链接和仓库链接。

### 验收重点

- 每个作品详情页可访问。
- 标题、摘要、标签、角色、日期展示正确。
- Markdown 正文渲染稳定。

## T05: 实现 UI 视觉与响应式样式

### 目标

按已确认 UI 设计实现简洁、现代、内容优先的视觉风格。

### 业务/技术增量

- 创建 `src/styles/global.css`。
- 实现全局排版、颜色、间距、卡片、标签和按钮样式。
- 实现移动端单列、桌面端多列。
- 实现 hover 和 focus 状态。

### 验收重点

- 移动端不横向滚动。
- 文本和 UI 不重叠。
- 卡片圆角不超过 8px。
- Focus 状态清晰可见。

## T06: 内容丰富化、视觉升级与中文统一

### 目标

根据用户反馈和个人网站调研，提升首页内容密度、统一中文表达，并形成更完整的视觉系统。

### 业务/技术增量

- 补齐 Hero 的价值主张、可信信号和主要内容入口。
- 增加工作方式、成果摘要、写作/观点入口等内容区块。
- 将首页、详情页、作品摘要、按钮和联系文案统一为中文。
- 优化全局视觉风格、间距、卡片层级、标签和响应式表现。
- 增加测试保护中文化、内容密度和视觉规则。

### 验收重点

- 首页不再像临时占位页，信息结构接近成熟个人网站。
- 可见文案以中文为主，英文仅保留技术名词、项目名或外部品牌。
- UI 风格统一，不出现明显割裂的中英文、色彩或卡片层级。
- `lint`、`typecheck`、`test`、`coverage`、`smoke`、`e2e` 通过。

## T07: 补齐 SEO、可访问性与静态资源

### 目标

让网站适合公开访问、分享和基础可访问使用。

### 业务/技术增量

- 在 BaseLayout 中维护 title、description、Open Graph。
- 添加 favicon。
- 检查语义化标题层级。
- 为图片和链接补充可访问信息。

### 验收重点

- 首页和详情页有基础 metadata。
- 每页只有一个 H1。
- 链接文本清晰。
- 图片有 alt 或明确装饰属性。

## T08: 补齐 smoke、E2E、覆盖率与交付证据

### 目标

补齐企业级模板要求的质量门禁，并验证 GitHub PR/MR 阶段。

### 业务/技术增量

- 实现 `scripts/smoke-dev-server.mjs`。
- 实现 `scripts/e2e-personal-site.mjs`。
- 补齐测试报告、review、PR summary、compliance report。
- 确认 `cmd_git_push` 和 `cmd_pr_open` 可用。

### 验收重点

- `pnpm run lint` 通过。
- `pnpm run typecheck` 通过。
- `pnpm run test` 通过。
- `pnpm run coverage` 达到 80%。
- `pnpm run smoke` 能真实启动页面。
- `pnpm run e2e` 覆盖首页、作品详情和联系入口。
- 有 GitHub remote 和 `gh` 时，workflow 创建到 `develop` 的 PR。

## 任务队列生成规则

任务拆解确认后，才能生成 `task-modeling/task-queue.json`。生成队列时应保持：

- 每个任务有唯一 `task_id`。
- `milestone_id` 为 `m1-personal-site`。
- `slice_id` 与任务阶段一致。
- `actor` 为 `agent`。
- `risk_level` 初始为 `LOW`。
- 初始状态为 `todo`。
- 任务顺序与本文件一致。

## 确认记录

- 任务拆解状态: 已确认
- 确认人: user
- 确认时间: 2026-05-15
- 备注: 用户确认任务拆解可用，允许生成 task queue。
