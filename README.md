# Native Throttle
Simple, dependency-free throttle function with support for trailing- and leading-edge calls.

Includes a hook for use with React.

* [Installation](#Installation)
* [Usage](#Usage)
    * [Basic Usage](#Basic)
    * [React Hook](#React)
    * [Trailing / Leading Edge Calls](#Edges)
    * [API](#API)
* [Development](#Development)

## Installation
```bash
yarn add native-throttle
```

## Usage
#### Import
```js
import throttle from 'native-throttle'; // ESM
const throttle = require('native-throttle'); // CJS
```

#### Basic
Default time limit is 300ms.

```js
function myExpensiveTask() { /*...*/ }
const throttled = throttle(myExpensiveTask);
```

#### Edges
Can invoke the function on the trailing or leading edge of the given time period.

Setting `leading: false` will trigger trailing edge calls.

Default is leading edge.

```js
const throttled = throttle(myExpensiveTask, {
  leading: true
});

const throttled = throttle(myExpensiveTask, {
  leading: false
});
```

#### React
For simple usage with React a `useThrottle` hook is exposed via the `/react` path.

Note: React is listed as a peer dependency.

```jsx
import useThrottle from 'native-throttle/react';

function MyComponent() {
  const throttled = useThrottle(myExpensiveFunc, { limit: 300 });
  return <button onClick={throttled}>Click me!</button>;
}
```

#### API
Function signature:
```
(func, options) => throttledFunc
```

Options:
```js
const options = {
  // Time limit (milliseconds) in which calls should be throttled
  // Default: 300
  limit: Number,

  // Calls functions on the leading edge of time limit if `true`, trailing edge if `false`
  // Default: true
  leading: Boolean,

  // Advanced: Context in which the throttled function should be called
  // Note: This should be unnecessary in most cases but exists to handle edge cases
  // Default: this
  context: Object
};
```

## Development
Install dependencies:
```bash
yarn
```

Run tests:
```bash
yarn test
```

Publish:
```bash
yarn publish
```
