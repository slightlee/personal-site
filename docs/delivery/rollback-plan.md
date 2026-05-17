# T09 回滚方案

## 基本信息

- task_id: personal-site-t09
- 目标环境: staging
- 负责人: agent

## 回滚触发条件

- smoke 或 E2E 脚本在已知正常静态产物上持续误报，影响后续任务交付判断。
- 覆盖率、交付证据或 harness 门禁配置导致 PR 检查无法稳定复现。
- t09 文档证据与实际门禁结果不一致，影响审计链路可信度。

## 回滚步骤

1. 回滚 t09 任务提交中涉及的质量脚本、测试证据和交付文档变更。
2. 重新运行 `pnpm run build`、`pnpm run smoke` 和 `pnpm run e2e`，确认静态产物检查恢复到回滚后的预期状态。
3. 更新 `docs/testing/03-test-report.md`、`docs/review/04-review.md` 和 `.harness/observability` 中对应恢复说明，保持审计记录可追溯。

## 验证方式

- 回滚后执行 `pnpm run lint`、`pnpm run typecheck`、`pnpm run test`、`pnpm run coverage`、`pnpm run smoke` 和 `pnpm run e2e`。
- 确认 `docs/delivery/stage-pr.md`、`docs/delivery/05-pr-summary.md`、`docs/delivery/compliance-report.md` 与实际验证结果一致。
