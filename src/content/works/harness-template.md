---
title: "企业级 Agent Harness 模板"
summary: "一个 repo-native 的软件交付流程模板，用文档确认、任务队列、质量门禁和审计证据串起完整交付链路。"
date: "2026-05-15"
role: "系统设计"
tags: ["自动化", "治理", "Shell"]
externalUrl: ""
repoUrl: "https://github.com/slightlee/personal-site"
featured: true
---

## 背景

团队在引入 Agent 协作时，常见问题不是不会写代码，而是需求确认、权限边界、质量门禁和交付证据散落在不同地方。

## 方案

这个模板把生命周期状态、任务建模、校验脚本和交付模板都放进仓库，让人和 Agent 使用同一套约束推进项目。

## 结果

流程可以从已确认规划进入任务执行，并在每个任务后留下可复查的测试结果、提交记录和 PR 入口。
