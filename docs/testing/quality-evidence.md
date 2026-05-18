# T12 质量证据

## 范围

- task_id: personal-site-t12
- 目标: 参考 ZmoEe 信息结构优化首页与文章详情页展示布局。

## 命令证据

| 命令 | 结果 | 说明 |
|---|---|---|
| `pnpm run lint` | PASS | 检查项目必需文件和脚本配置 |
| `pnpm run typecheck` | PASS | Astro 类型检查无错误 |
| `pnpm run test` | PASS | 4 个测试文件，14 个测试通过 |
| `pnpm run coverage` | PASS | lines 100%，达到 80% 门槛 |
| `pnpm run build` | PASS | 生成 8 个静态页面 |
| `pnpm run smoke` | PASS | 检查核心页面、metadata 和静态资源产物 |
| `pnpm run e2e` | PASS | 检查首页、作品详情、写作列表、文章详情和联系入口 |
| `check-release-readiness.sh` | PASS | LOW 风险 staging 发布就绪校验通过 |
| `check-delivery-artifacts.sh` | PASS | LOW 风险下交付物强制校验关闭，脚本返回通过 |
| 浏览器验证 | PASS | 桌面首页/文章详情双列布局正常，390px 移动端无横向溢出 |

## 交付证据

- 测试报告: `docs/testing/03-test-report.md`
- 评审记录: `docs/review/04-review.md`
- PR 交付说明: `docs/delivery/stage-pr.md`
- PR 摘要: `docs/delivery/05-pr-summary.md`
- 合规报告: `docs/delivery/compliance-report.md`
- 回滚方案: `docs/delivery/rollback-plan.md`
- 发布证据: `docs/delivery/release-evidence.md`
