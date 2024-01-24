# debounce.lodash

[![NPM](https://img.shields.io/npm/v/debounce.lodash.svg)](https://www.npmjs.com/package/debounce.lodash)
![Tests](https://github.com/sekoyo/debounce.lodash/actions/workflows/main.yml/badge.svg)
![Size](https://img.badgesize.io/sekoyo/debounce.lodash/master/dist/index.min.js)
![GZip Size](https://img.badgesize.io/sekoyo/debounce.lodash/master/dist/index.min.js?compression=gzip)

For when you only need Lodash's debounce and throttle but existing Typescript alternatives are poor imitations.

Only 609 bytes gzipped.

```ts
import { debounce, throttle } from 'debounce.lodash'
```

Or without a bundler:

```ts
import { debounce, throttle } from 'https://www.unpkg.com/debounce.lodash@1.0.0/dist/index.min.js'
```

- [lodash debounce docs](https://lodash.com/docs/#debounce)
- [lodash throttle docs](https://lodash.com/docs/#throttle)

The functions are almost identical to the lodash ones and the same tests pass.
