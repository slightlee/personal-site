# T11 回滚方案

## 基本信息

- task_id: personal-site-t11
- 目标环境: staging
- 负责人: agent

## 回滚触发条件

- Header 遮挡首屏内容或 sticky 行为影响阅读。
- 移动端导航出现挤压、换行异常或横向溢出。
- 头部导航色差仍明显割裂，未达到低对比统一目标。
- `pnpm run lint`、`pnpm run typecheck`、`pnpm run test`、`pnpm run coverage`、`pnpm run build`、`pnpm run smoke` 或 `pnpm run e2e` 失败。

## 回滚步骤

1. 回滚 t11 任务提交中涉及的 `src/styles/global.css`、`tests/ui-styles.test.mjs` 和交付文档变更。
2. 重新运行 `pnpm run lint`、`pnpm run typecheck`、`pnpm run test`、`pnpm run coverage`、`pnpm run build`、`pnpm run smoke` 和 `pnpm run e2e`。
3. 复查首页和写作页头部导航，确认恢复到 t10 状态。

## 验证方式

- 回滚后质量门禁全部通过。
- `.harness/task-modeling/task-queue.json`、`.harness/project-manifest.yml` 和交付文档恢复到回滚后的任务状态。
