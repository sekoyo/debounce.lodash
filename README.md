# ts-debounce-throttle

For when you only need Lodash's debounce and throttle but existing Typescript alternatives are poor imitations.

```ts
import { debounce, throttle } from 'ts-debounce-throttle'
```

All credits go to [lodash](https://lodash.com/). The functions are taken from there and Typescript'ed up and very slightly modified to reduce bundle size.