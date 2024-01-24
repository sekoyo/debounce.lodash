# debounce-and-throttle

[![NPM](https://img.shields.io/npm/v/debounce-and-throttle.svg)](https://www.npmjs.com/package/debounce-and-throttle)
![Tests](https://github.com/sekoyo/debounce-and-throttle/actions/workflows/main.yml/badge.svg)
![Size](https://img.badgesize.io/sekoyo/debounce-and-throttle/master/dist/index.min.js)
![GZip Size](https://img.badgesize.io/sekoyo/debounce-and-throttle/master/dist/index.min.js?compression=gzip)

For when you only need Lodash's debounce and throttle but existing Typescript alternatives are poor imitations.

Only 609 bytes gzipped.

```ts
import { debounce, throttle } from 'debounce-and-throttle'
```

The functions are almost identical to the lodash ones and the same tests pass.
