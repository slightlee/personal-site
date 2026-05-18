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
| 7 | personal-site-t07 | 建立中文写作 / 博客模块 | 增加 writing collection、文章列表页、文章详情页和首页精选文章入口 | 至少 3 篇中文文章；首页、列表页、详情页可访问；测试覆盖 frontmatter | LOW |
| 8 | personal-site-t08 | 补齐 SEO、可访问性与静态资源 | 增加 metadata、Open Graph、favicon、语义化结构和 alt 规则 | SEO 信息存在，基础 a11y 检查通过 | LOW |
| 9 | personal-site-t09 | 补齐 smoke、E2E、覆盖率与交付证据 | 增加 smoke/e2e 脚本、测试报告、交付文档，验证 PR/MR 阶段 | 全门禁通过；有 remote/gh 时创建 PR | LOW |
| 10 | personal-site-t10 | 个人网站视觉精致化改版 | 基于调研方案升级视觉令牌、Hero、作品 preview、写作列表和响应式细节 | 页面更精致统一；首屏有记忆点；作品和文章视觉区分清晰 | LOW |
| 11 | personal-site-t11 | 优化网站头部导航 UI 样式 | 统一 Header、brand、nav 容器和导航链接状态的色彩层级，降低当前导航区域色差割裂 | 头部导航与 t10 设计令牌一致；hover/focus 清晰；移动端不拥挤 | LOW |
| 12 | personal-site-t12 | 参考 ZmoEe 优化首页与文章详情布局 | 参考 `zmoee.com/home` 和文章详情页的信息结构，优化首页公告条、主内容/侧栏和文章详情双列阅读布局 | 首页更像内容枢纽；文章详情有阅读信息侧栏；移动端不溢出 | LOW |

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

## T07: 建立中文写作 / 博客模块

### 目标

把博客作为个人网站的一等模块，形成“个人品牌首页 + 中文写作内容中枢”的首版结构。

### 业务/技术增量

- 新增 `src/content/writing/*.md`，至少 3 篇中文文章。
- 在 content config 中增加 writing collection 和 frontmatter schema。
- 新增 `/writing` 文章列表页。
- 新增 `/writing/[slug]` 文章详情页。
- 首页展示精选文章入口。
- 导航从“观点”调整为“写作”，并链接到 `/writing`。
- 增加测试覆盖文章数量、frontmatter、首页入口、列表页和详情页生成。

### 验收重点

- 首页有精选文章入口。
- `/writing` 能看到全部文章列表。
- `/writing/[slug]` 能渲染 Markdown 正文。
- 可见文案以中文为主。
- `lint`、`typecheck`、`test`、`coverage`、`smoke`、`e2e` 通过。

## T08: 补齐 SEO、可访问性与静态资源

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

## T09: 补齐 smoke、E2E、覆盖率与交付证据

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

## T10: 个人网站视觉精致化改版

### 目标

基于 `docs/design/04-visual-refresh-plan.md`，将当前个人网站从基础可读页面升级为更精致、可信、适合长期经营的个人品牌与技术博客入口。

### 业务/技术增量

- 建立 CSS 设计令牌，统一主色、强调色、背景、边框、阴影和交互状态。
- 重构首页 Hero 的视觉层级，增加右侧视觉模块或作品拼贴式信息面板。
- 优化 Header、按钮、链接、标签、focus 和 hover 状态。
- 为作品卡片增加稳定 preview 区域，优先使用可维护 CSS 结构或现有静态资源。
- 将写作区调整为编辑部/专栏式列表，与作品区形成视觉区分。
- 优化作品详情和文章详情的排版一致性。
- 更新 `tests/ui-styles.test.mjs`，保护关键视觉约束。

### 验收重点

- 首屏有明确视觉记忆点，不再只有文本和普通状态卡片。
- 作品卡片具备固定比例 preview，移动端和桌面端都不跳动。
- 写作区具备专栏式阅读节奏，不与作品卡片完全同构。
- 色彩系统采用深青绿主色、琥珀橙强调色、纸感背景和冷灰蓝辅助色。
- 卡片圆角不超过 8px，页面不出现卡片套卡片。
- 文本不重叠、不横向溢出，按钮和标签内容不挤压。
- `lint`、`typecheck`、`test`、`build` 通过。

## T11: 优化网站头部导航 UI 样式

### 目标

修正头部导航区域与页面整体视觉系统之间的色差割裂，让 Header、品牌入口、导航容器和导航 hover 状态使用同一套低对比纸感色彩层级。

### 业务/技术增量

- 调整 `.site-header` 的背景、边框、阴影和 sticky 容器样式。
- 统一 `.brand`、`.site-header nav` 和 `.site-header nav a` 的 hover 色彩，避免深色块突兀跳变。
- 优化移动端导航宽度和文本居中，避免小屏下挤压。
- 更新 `tests/ui-styles.test.mjs`，保护头部导航低色差与设计令牌约束。

### 验收重点

- 导航默认态和 hover 态不再出现明显色差割裂。
- Header 与 t10 的 `paper`、`surface`、`border`、`primary-dark` 色彩体系一致。
- 卡片和导航圆角仍不超过 8px。
- `lint`、`typecheck`、`test`、`build` 通过。

## T12: 参考 ZmoEe 优化首页与文章详情布局

### 目标

参考 `https://www.zmoee.com/home` 的轻顶栏、公告条、主内容与侧栏节奏，以及 `https://www.zmoee.com/articles/douyinhh` 的文章详情阅读布局，调整当前个人网站的信息结构与阅读体验。

### 业务/技术增量

- 首页新增轻量公告条，强化内容型站点入口感。
- 首页下半部分调整为主内容列和侧栏列，作品、写作、工作方式、能力与联系入口更易扫描。
- 文章详情页调整为标题元信息、正文主列和右侧阅读信息栏。
- 更新样式契约测试，保护参考风格相关布局类名与关键 grid 约束。
- 保持 Astro 静态实现，不引入新依赖和客户端交互。

### 验收重点

- 首页具备参考站点式内容枢纽层级，但不复制品牌资产或具体内容。
- 文章详情在桌面端有主列 + 侧栏阅读结构，移动端自然单列。
- 卡片圆角不超过 8px，不出现横向溢出或文本重叠。
- `lint`、`typecheck`、`test`、`coverage`、`build`、`smoke`、`e2e` 通过。

## 任务队列生成规则

任务拆解确认后，才能生成 `.harness/task-modeling/task-queue.json`。生成队列时应保持：

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
