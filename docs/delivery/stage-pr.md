# T12 PR 交付说明

> 说明：`pr` 阶段表示交付物准备与 PR 就绪检查，不等同于 `git commit`；代码提交仍由仓库工作流单独完成。

## 1. 变更摘要

- task_id: personal-site-t12
- 风险等级: LOW
- 业务目标: 参考 ZmoEe 首页与文章详情页的信息结构，优化个人网站首页内容枢纽感和文章阅读布局。
- 变更范围: `.harness`、`docs`、`src/pages`、`src/styles`、`tests`
- PR 证据: https://github.com/slightlee/personal-site/pull/5

## 2. 关键实现

- 首页新增 `notice-strip`，形成轻量内容站入口。
- 首页主体调整为 `home-layout`，主列展示关于、作品和写作，侧栏展示工作方式、能力和联系入口。
- 文章详情页新增 `article-layout`，桌面端使用正文主列和阅读信息侧栏。
- 补充样式契约测试，保护参考风格布局结构和关键 grid 约束。
- 同步最新 harness 路径到 `.harness/task-modeling/task-queue.json`。

## 3. 验证证据

- `pnpm run lint`: PASS
- `pnpm run typecheck`: PASS
- `pnpm run test`: PASS
- `pnpm run coverage`: PASS
- `pnpm run build`: PASS
- `pnpm run smoke`: PASS
- `pnpm run e2e`: PASS
- 浏览器验证: PASS，桌面首页/文章详情双列布局正常，390px 移动端无横向溢出。

## 4. 风险与回滚

- 风险说明: 变更集中在静态页面结构和 CSS，风险等级低；主要风险是移动端布局拥挤或文章侧栏影响阅读宽度。
- 回滚方式: 按 `docs/delivery/rollback-plan.md` 回滚 t12 任务提交，并重新运行质量门禁。
- 触发回滚条件: 构建失败、移动端横向溢出、正文阅读宽度异常或核心内容被侧栏遮挡。

## 5. 审批记录

- 是否需要审批: 否，LOW 风险下 release approval 可由策略跳过或自动通过。
- 审批人: agent
- 审批结论: 当前风险下无需额外 release approval。
