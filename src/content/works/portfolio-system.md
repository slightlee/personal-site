---
title: "个人作品集内容系统"
summary: "一个可维护的个人作品集结构，将个人资料、作品元数据和长案例正文拆分管理。"
date: "2026-05-16"
role: "前端工程"
tags: ["Astro", "TypeScript", "作品集"]
externalUrl: ""
repoUrl: "https://github.com/slightlee/personal-site"
featured: true
---

## 背景

个人网站不能每次更新作品都改页面结构。内容应该稳定维护，页面负责把结构化信息渲染清楚。

## 方案

个人资料放在 TypeScript 数据文件里，作品案例使用 Markdown 和经过校验的 frontmatter 维护。

## 结果

网站可以从同一份内容源生成首页作品摘要和独立详情页，后续扩展博客或更多案例也不会破坏结构。
