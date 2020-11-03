---
name: "post-entry"
description: "Post Entry"
message: "Enter a post name"
root: "content/blog"
output: "."
---

# `{{ date "YYYY-MM-DD" }}_{{ input }}/index.md`

```markdown
---
title: "{{ input }}"
date: "{{ date "YYYY-MM-DD" }}"
tags: []
---
```
