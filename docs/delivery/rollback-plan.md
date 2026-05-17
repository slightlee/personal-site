# T10 回滚方案

## 基本信息

- task_id: personal-site-t10
- 目标环境: staging
- 负责人: agent

## 回滚触发条件

- 首页、写作页或作品详情页在移动端出现文本重叠、横向溢出或关键内容不可读。
- 视觉刷新导致 `pnpm run build`、`pnpm run smoke` 或 `pnpm run e2e` 失败。
- 用户评审认为视觉方向偏离 Editorial Engineer Portfolio 定位，需要恢复到 t09 状态。

## 回滚步骤

1. 回滚 t10 任务提交中涉及的 `src/pages`、`src/styles`、`tests` 和交付文档变更。
2. 重新运行 `pnpm run lint`、`pnpm run typecheck`、`pnpm run test`、`pnpm run build`、`pnpm run smoke` 和 `pnpm run e2e`。
3. 使用浏览器复查首页、写作页和作品详情页，确认回滚后无横向溢出或文本重叠。

## 验证方式

- 回滚后质量门禁全部通过。
- `task-modeling/task-queue.json`、`.harness/project-manifest.yml` 和交付文档恢复到回滚后的任务状态。
