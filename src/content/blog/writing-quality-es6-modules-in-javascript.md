---
author: Emmanuel O. Eboh
pubDatetime: 2024-08-10T23:07:08.674Z
modDatetime: 2024-08-10T23:07:08.674Z
title: "Writing Quality ES6 JavaScript Modules"
slug: writing-quality-es6-modules-in-javascript
featured: true
draft: false
tags:
  - es6
  - javascript
  - modules
ogImage: "/open-graph/modules-OG.png"
description: ES6 Modules are powerful when used the right way. The flexibility they provide is vital for any production-ready JavaScript application
---

## Table of contents

# Writing Quality ES6 JavaScript Modules

ES6 (or ES2015, if you will) came with many amazing features and a couple of upgraded syntaxes. One feature that stands out is being able to break your JavaScript code into smaller, reusable pieces that perform a focused task or function.

These pieces of code called _Modules_ redefined the programming paradigm in JavaScript by performing small, focused tasks. They encapsulate feature logic into a local scope, enabling you to reuse them across your app’s code base.

They are my favourite feature from ES6 and I will share some of the best practices I have learned while using ES6 Modules.

# Best Practices for Using ES6 Modules

### 1. Use ES6 Syntax

This may seem trivial, but ES6 and above provide syntax improvements that are better in performance and semantic value:

- In ES6 and above, binding keywords such as `const` and `let` provide block-scoping and reduce the chances of accidental reassignments or scope issues.
- **Use `import` and `export` statements** for better readability and native support in most modern browsers.

### 2. Prefer Named Exports Over Default Exports

In the past, I have made the mistake of utilizing default exports for most modules, until I began noticing some side effects that come with using default exports most of the time.

To illustrate these side effects, let’s look at this default-exported class called `Counter` below:

```jsx
// counter.js

export default class Counter {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  increment() {
    this.value += 1;
  }

  decrement() {
    this.value -= 1;
  }

  getValue() {
    return this.value;
  }
}
```

The first issue I faced when I tried to consume default-exported modules was that I had to think of a name for each module when importing it.

This may sound like a non-issue, but hold on a bit!

Imagine you have multiple people on your team who try to consume the `Counter` module; this could potentially lead to naming inconsistencies in the code base.

Consider two developers on a team: John and Martha

John might import the `Counter` module like this:

```jsx
import counter from "./counter";
```

On the contrary, Martha may import hers like this:

```jsx
import counting from "./counter";
```

Notice the difference? This needs to be more consistent and clear at best.

This issue would be eliminated if the `Counter` module were exported as a named export. With named exports, you are required to specify the original name of your import. That way, if you specify the wrong name, you get a clear and early error message:

```jsx
import { Counter } from "./counter";
```

Another potential issue that could arise from default exports is that when you try to change the module name sometime later in the future, you may have to painstakingly change the different names on the consumer side of the module. Most text editors do not even provide _Intellisense_ and autocompletion support for default exports.

Therefore, I recommend using named exports for most modules to enforce consistency and clear code.

### 3. Maintain Module-Scope As Much As Possible

In JavaScript, side effects are not hard to create; ES Modules are no exception. When a module creates unnecessary side effects, such as modifying a global state or variable, it compromises its self-contained feature.

I think modules should contain only locally scoped variables unless they are intended to consume a global state.

Let’s illustrate it still using our `Counter` module, but we will rewrite it as a function:

```jsx
// counter.js
let counter = 0; // Global state

export function increment() {
  counter++;
  console.log(`Counter is now: ${counter}`);
}

export function decrement() {
  counter--;
  console.log(`Counter is now: ${counter}`);
}

export function reset() {
  counter = 0;
  console.log(`Counter has been reset`);
}

export function getCounter() {
  return counter;
}
```

The above set of modules mutates a global variable called `counter` and this can lead to potential problems when consuming the modules in different components as shown in the code below:

```jsx
import { increment, decrement, reset, getCounter } from "./counter.js";

// Component A
increment(); // Counter is now: 1
increment(); // Counter is now: 2

// Component B
decrement(); // Counter is now: 1
reset(); // Counter has been reset.
console.log(getCounter()); // 0

// Component C
increment(); // Counter is now: 1
console.log(getCounter()); // 1
```

When modules share a global state, you may experience unpredictable behaviours across various components since the actions of one component may potentially affect another component. This reduces modularity and makes the problem difficult to debug.

A much better solution is to encapsulate the necessary state and related module features into a single module.

```jsx
// counter.js
export function createCounter() {
  let counter = 0; // Local state within the factory function

  return {
    increment() {
      counter++;
      console.log(`Counter is now: ${counter}`);
    },
    decrement() {
      counter--;
      console.log(`Counter is now: ${counter}`);
    },
    reset() {
      counter = 0;
      console.log(`Counter has been reset.`);
    },
    getCounter() {
      return counter;
    },
  };
}
```

The usage will be something like this:

```jsx
import { createCounter } from "./counter.js";

// Component A
const counterA = createCounter();
counterA.increment(); // Counter is now: 1
counterA.increment(); // Counter is now: 2
console.log(counterA.getCounter()); // 2

// Component B
const counterB = createCounter();
counterB.decrement(); // Counter is now: -1
counterB.reset(); // Counter has been reset.
console.log(counterB.getCounter()); // 0

// Component C
const counterC = createCounter();
counterC.increment(); // Counter is now: 1
console.log(counterC.getCounter()); // 1

// Component A's state remains unaffected
console.log(counterA.getCounter()); // 2
```

In my opinion, when modules avoid global state variables, they are more predictable, easier to test, clearer to debug, and their reusability is improved.

### 4. Avoid Low-Cohesion Modules

In my experience, grouping a set of unrelated modules in a single file is not a good practice. Here are a couple of reasons why I think so:

- The module doesn't have a clear, single responsibility. The functions are scattered in terms of purpose, making it harder to understand what the module is meant to do as a whole.
- The mix of different functions in a single module makes it more difficult to maintain or extend, especially as the module grows with more unrelated functions.

Just like the code block below:

```jsx
// miscUtils.js

// Function to calculate the area of a rectangle
function calculateRectangleArea(width, height) {
  return width * height;
}

// Function to log a message to the console
function logMessage(message) {
  console.log(message);
}

// Function to check if a number is even
function isEven(number) {
  return number % 2 === 0;
}

// Export the module's functions
export { calculateRectangleArea, logMessage, isEven };
```

The degree of relationship between modules is a concept known as <a href="https://en.wikipedia.org/wiki/Cohesion_(computer_science)" target="_blank" class="custom-class">Cohesion</a>
in computer science.

I consider modules focused on a single task to be related. Related modules should be co-located for a variety of reasons:

- Since they focus on related tasks, it is easier to debug them if they are located together.
- Because most of the methods and data focus on a common set of functionalities, it ensures that the code is easier to understand.
- Grouping related modules together reduces the risk of coupled code and improves reusability

The following set of modules possess high cohesion because they are related to managing the user's profile data:

```jsx
// userProfile.js

let userProfile = {
  name: "",
  email: "",
};

function setProfile(name, email) {
  userProfile.name = name;
  userProfile.email = email;
}

function getProfile() {
  return { ...userProfile };
}

function clearProfile() {
  userProfile = { name: "", email: "" };
}

// Export the module's public API
export { setProfile, getProfile, clearProfile };
```

> ❗ High cohesion is best achieved when methods within a module carry out a limited number of closely related activities

### 5. Take Advantage of the Module Objects Pattern

From experience, as modules grow, they tend to get messy and disjointed really quickly! This especially has to do with the export-import management of multiple module APIs.

An effective solution is to unify the API of each module into a single object, and every function and method is accessed via the main object. This is known as <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#creating_a_module_object" target="_blank" class="custom-class">Module Objects</a>.

I will show you guys an example from the MDN <a href="https://github.com/mdn/js-examples/tree/main/module-examples/module-objects" target="_blank" class="custom-class">js-examples</a>
repository. The mechanism of this example of module objects is as follows:

1. A `canvas` module is created
2. The canvas module exports `create` and `createReportList` functions as its public API
3. Import every exported function as a single object using the asterisk keyword (\*)
4. Access any of the exported functions from the object with a dot notation

In code language, this is what I mean:

```jsx
// canvas.js

function create(id, parent, width, height) {
  let divWrapper = document.createElement("div");
  let canvasElem = document.createElement("canvas");
  parent.appendChild(divWrapper);
  divWrapper.appendChild(canvasElem);

  divWrapper.id = id;
  canvasElem.width = width;
  canvasElem.height = height;

  let ctx = canvasElem.getContext("2d");

  return {
    ctx: ctx,
    id: id,
  };
}

function createReportList(wrapperId) {
  let list = document.createElement("ul");
  list.id = wrapperId + "-reporter";

  let canvasWrapper = document.getElementById(wrapperId);
  canvasWrapper.appendChild(list);

  return list.id;
}

// export needed function as the public API
export { create, createReportList };
```

Now, utilizing the module object pattern will look like:

```jsx
// main.js

// import every exported function as an object called Canvas in this case
import * as Canvas from "./modules/canvas.js";

// create the canvas and reporting list
let myCanvas = Canvas.create("myCanvas", document.body, 480, 320);
let reportList = Canvas.createReportList(myCanvas.id);
```

This pattern creates a unified and cleaner API rather than having cloggy and verbose imports from multiple module source files.

# Conclusion

ES Modules are meant to be small, one-task-focused, and reusable pieces of JavaScript logic. They should encapsulate both logic and data while exposing only the necessary functions for consumption. In addition, their interface should be as simple as possible to ensure clear readability and easy debugging.

Thank you for reading till the end, (I hope you did 😉), I write articles and make content for people who want to level up to senior engineers. Follow me on my social platforms, and feel free to check out my other articles on [my blog](https://www.emmanueleboh.com).

Happy building!
