---
date: 2025-09-08
title: Title of homepage in yaml part
---

# Title of homepage in markdown part

content of my home.

<!-- CSS -->
<link href="https://artalk.zeabur.app/dist/Artalk.css" rel="stylesheet" />

<!-- JS -->
<script src="https://artalk.zeabur.app/dist/Artalk.js"></script>

<!-- Artalk -->
<div id="Comments"></div>
<script>
Artalk.init({
  el:        '#Comments',                       // 绑定元素的 Selector
  pageKey:   '/post/1',                         // 固定链接
  pageTitle: '关于引入 Artalk 的这档子事',         // 页面标题 (留空自动获取)
  server:    'https://artalk.zeabur.app/',  // 后端地址
  site:      'Artalk 的博客',                    // 你的站点名
})
</script>
