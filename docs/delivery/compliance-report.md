# T09 合规报告

## 基本信息

- 项目: personal-site
- task_id: personal-site-t09
- 日期: 2026-05-16
- 报告人: agent

## 合规检查项

| 项目 | 结果 | 证据 |
|---|---|---|
| 权限边界合规 | PASS | `.harness/project-manifest.yml` 与任务分支校验通过 |
| 安全门禁合规 | PASS | workflow 基础 secret 扫描和 pnpm audit high-level 检查通过 |
| 审计日志完整 | PASS | `.harness/observability/agent-runs.jsonl` |
| 人工审批符合策略 | PASS | LOW 风险任务，release approval 可按策略跳过或自动通过 |
| 敏感信息处理合规 | PASS | 未新增密钥、凭据或生产数据 |
| 回滚与发布证据完整 | PASS | `docs/delivery/rollback-plan.md`、`docs/delivery/release-evidence.md` |

## 例外说明

- `gitleaks` 未安装，workflow 跳过深度 secret 扫描；基础 secret 扫描通过。
- `pnpm audit` 报告 low/moderate 风险，未达到当前阻断阈值。
- 生产发布不在 t09 范围内；当前发布证据限定为 staging 交付就绪判断。

## 结论

- 可交付。
