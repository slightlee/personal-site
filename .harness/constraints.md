# Harness Bootstrap Constraints

> 目的：让新项目从创建目录开始就受企业级 harness 约束。该文件应复制到业务项目 `.harness/constraints.md`，作为 Agent 和人工协作的强约束。

## 1. 创建项目壳前的确认

创建项目壳前必须先和用户确认：

- 项目名称。
- 本地目录名。
- 是否立即关联远程仓库地址；如果关联，必须记录仓库 URL；如果暂不关联，必须记录为 deferred。

未确认以上信息前，不允许创建项目目录。
如果用户提供了远程仓库地址，创建项目壳时必须在项目目录内初始化独立 Git 仓库并绑定 `origin`，但不允许提交或 push。

技术栈不在创建项目壳时强行确定；技术栈应在 PRD 确认后的技术方案阶段讨论并确认。

## 2. Bootstrap 边界

Bootstrap 阶段只允许创建项目壳和治理文件，不允许直接进入业务实现。

允许创建：

- `.harness/project-manifest.yml`
- `.harness/constraints.md`
- `.harness/lifecycle-state.yml`
- `.harness/observability/`
- `.git/`，仅限用户已确认远程仓库地址时初始化项目独立仓库
- `docs/requirements/`
- `docs/design/`
- `docs/testing/`
- `docs/review/`
- `docs/delivery/`
- `task-modeling/`

禁止创建或执行：

- 业务 `src/` 实现代码
- 测试代码
- 安装依赖
- 启动 dev server
- 执行 `run-task-queue.sh`
- 执行 `git commit` / `git push`

## 3. 标准生命周期

项目必须按以下顺序推进：

```text
project_shell_created
-> harness_bootstrapped
-> prd_drafted
-> prd_confirmed
-> design_drafted
-> design_confirmed
-> ui_design_decided
-> ui_design_confirmed_or_skipped
-> task_breakdown_drafted
-> task_breakdown_confirmed
-> task_queue_created
-> planning_baseline_committed
-> planning_baseline_pushed
-> implementation_ready
-> task_execution_started
```

## 4. 阶段准入规则

- 未确认项目名称、本地目录名和远端仓库策略前，不允许创建项目壳。
- 如果项目创建时已提供远端仓库 URL，未在项目目录内完成 `git init` 和 `origin` 绑定前，不允许通过 bootstrap 校验。
- 如果远端仓库策略为 deferred，不允许伪造空 remote；应等用户确认仓库 URL 后再初始化仓库或绑定 remote。
- 未确认项目目标和约束前，不允许生成 PRD。
- 未确认 PRD 前，不允许生成技术方案。
- 未确认技术方案前，不允许决定 UI 设计是否需要。
- 如果 `ui_design.required=true`，未确认 UI 设计前不允许生成任务拆解。
- 如果 `ui_design.required=false`，必须填写跳过原因后才允许生成任务拆解。
- 未确认任务拆解前，不允许生成 `task-modeling/task-queue.json`。
- 未生成并校验 `task-modeling/task-queue.json` 前，不允许创建业务代码。
- `task_queue_created` 后必须先提交规划基线，再进入 `implementation_ready`。
- 规划基线必须至少包含 `.harness/`、PRD、技术方案、UI 设计决策或文档、任务拆解文档和 `task-modeling/task-queue.json`。
- 规划基线 SHA 可通过第二个治理提交写回 `.harness/lifecycle-state.yml`，但第二个提交仍不得包含业务代码。
- 企业级默认要求规划基线 push 到远程基线分支；未完成 `planning_baseline_pushed` 前，不允许进入 `implementation_ready`。
- `baseline.push_policy=required` 时，必须记录 `baseline.planning_pushed=true`、`baseline.remote`、`baseline.remote_branch` 和 `baseline.pushed_at`。
- `baseline.push_policy=deferred` 只允许用于离线、远端未开通或内部审批未完成场景，必须填写 `baseline.push_deferred_reason`。
- 如果项目声明了独立远程仓库，业务项目目录必须是独立 Git 仓库根目录；不允许把业务项目提交到模板仓库或父仓库。
- 未记录 `baseline.planning_committed=true` 和 `baseline.commit_sha` 前，不允许执行 task queue。
- 未确认远程基线分支包含 `baseline.commit_sha` 前，不允许执行 task queue。
- 未保持项目工作区干净前，不允许开始领取任务。
- 未创建任务分支前，不允许执行任务。
- 未配置 `cmd_git_push` 和 `cmd_pr_open` 前，不允许把任务标记为完成交付。

## 5. 确认要求

确认必须写入对应文档或 `.harness/lifecycle-state.yml`：

- 项目名称、本地目录名和远端仓库策略。
- PRD 确认人和确认时间。
- 技术方案确认人和确认时间。
- UI 设计是否需要；需要则记录确认人和确认时间，不需要则记录跳过原因。
- 任务拆解确认人和确认时间。
- 规划基线提交 SHA、提交人和提交时间。
- 规划基线 push 远端、远端分支和 push 时间；如延期 push，必须记录延期原因。
- 允许进入实现阶段的明确结论。

## 6. 执行原则

- 企业级模板是流程控制源，不是建议清单。
- 项目内只保留薄配置、约束文件、任务队列和交付证据。
- runtime、schema、workflow、validator 继续由外置 `harness-enterprise-template/` 提供。
- 任何跳过确认链路的实现都应停止并回滚到上一个已确认阶段。
- 每个业务项目按自己的仓库边界提交、push 和 PR/MR；模板仓库只提交模板自身变更。
