# Native Throttle
Simple, dependency-free throttle function for all JS runtime environments.

Supports both trailing and leading edge calls.

* [Installation](#Installation)
* [Development](#Development)
* [Usage](#Usage)
    * [Basic Usage](#Basic)
    * [Trailing / Leading Edge Calls](#Edges)
    * [React / Hooks](#React)
    * [API](#API)

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

Default is leading edge.

```js
const throttled = throttle(myExpensiveTask, {
  leading: true
});

const throttled = throttle(myExpensiveTask, {
  trailing: true
});
```

#### React
For use with React, pass to `useCallback` or `useMemo` to avoid recreating the throttled function on each render.

```jsx
import { useCallback, useMemo } from 'react';
import throttle from 'native-throttle';

function MyComponent() {
  const throttled = useCallback(throttle(myExpensiveFunc), { limit: 300 });
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

  // Calls functions on the leading edge of time limit
  // Default: true
  leading: Boolean,

  // Calls functions on the trailing of time limit
  // Note: If leading and trailing are true, trailing takes precedence
  // Default: false
  trailing: Boolean,

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
