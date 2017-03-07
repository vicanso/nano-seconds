# nano-seconds

Get the nano seconds of now

## Installation

```bash
$ npm install nano-seconds
```

## API

### now

Get the nano seconds of current time, it will return [seconds, nanos]

```js
const nano = require('nano-seconds');
// [ 1488895112, 951851969 ]
console.info(nano.now());
```

### toString

Format the nano seconds to string

- `ns` if not set the param, it will be `nano.now()`

```js
const nano = require('nano-seconds');
const ns = nano.now();
// [ 1488895353, 21164240 ]
console.info(ns);
// 1488895353021164240
console.info(nano.toString(ns));
// 1488895353025439741
console.info(nano.toString());
```
### difference

Get the difference of two nano seconds, ns2 - ns1

- `ns1` The start nano seconds

- `ns2` The end nano seconds, default is `nano.now()`

```js
const ns = nano.now();
setTimeout(() => {
  const diff = nano.difference(ns);
  // 102661874
  console.info(diff);
}, 100);
```


## License

MIT
