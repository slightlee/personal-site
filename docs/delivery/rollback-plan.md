# T12 回滚方案

## 基本信息

- task_id: personal-site-t12
- 目标环境: staging
- 负责人: agent

## 回滚触发条件

- 首页或文章详情页在移动端出现文本重叠、横向溢出或关键内容不可读。
- 文章详情侧栏遮挡正文或导致正文阅读宽度异常。
- `pnpm run build`、`pnpm run smoke` 或 `pnpm run e2e` 失败。
- 用户评审认为参考风格偏离个人网站定位，需要恢复到 t10/t11 之前的布局状态。

## 回滚步骤

1. 回滚 t12 任务提交中涉及的 `.harness`、`docs`、`src/pages`、`src/styles/global.css` 和 `tests/ui-styles.test.mjs` 变更。
2. 重新运行 `pnpm run lint`、`pnpm run typecheck`、`pnpm run test`、`pnpm run coverage`、`pnpm run build`、`pnpm run smoke` 和 `pnpm run e2e`。
3. 使用浏览器复查首页和文章详情页，确认回滚后无横向溢出或文本重叠。

## 验证方式

- 回滚后质量门禁全部通过。
- `.harness/task-modeling/task-queue.json`、`.harness/project-manifest.yml` 和交付文档恢复到回滚后的任务状态。
