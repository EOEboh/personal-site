---
author: Emmanuel O. Eboh
pubDatetime: 2024-10-23T18:14:26.516Z
modDatetime: 2024-10-23T18:14:26.516Z
title: "Using the Clamp Function for Definite Boundaries in JavaScript"
slug: using-the-clamp-function-for-definite-boundaries-in-javascript
featured: true
draft: false
tags:
  - clamp function
  - javascript
  - typescript
  - algorithms
ogImage: "/open-graph/clamp-OG.png"
description: Learn the utility function for dealing with numerically bounded data
---

## Table of contents

# Using the Clamp Function for Definite Boundaries in JavaScript

Some UI features require numeric limits (or bounds); for example, imagine you are working on a particular screen containing a graphical user interface like a progress bar. The progress bar shows the percentage of progress within a list of data.

This progress bar needs to operate within a certain range of numbers, which is 0 - 100 in this case; this would mean you have to implement a set of limits on the upper and lower sides, right?

Also, consider another scenario where you are building a form to collect age inputs from users within a certain age range. This would require that particular input to have a lower limit (minimum age acceptable) and a higher limit (maximum age acceptable). As a frontend engineer, you could proceed to add a check, making sure any input outside of this range will automatically throw a validation error.

## The Clamp Function (Math.min() method)

These two example scenarios can be represented in their raw and simple form as a _Clamp_ function in JavaScript. Let’s quickly take a look:

```tsx
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

The function above takes 3 parameters:

- `value` : the actual number that was supplied by the user
- `min` : the lower limit of the range
- `max` : the higher limit of the range

The `Math.min()` static method ensures the value is not more than the upper limit, while the `Math.max()` method is passed into the `Math.min()` method to ensure the value is not less than the lower limit.

In a nutshell, we are combining the power of 2 opposite methods to check against the value crossing the upper or lower limit.

## The Clamp Function (Sequential Bound Checks method)

Another preferred and more readable method is done by using the _Sequential Bound Check_ approach:

```tsx
function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}
```

This method explicitly breaks down its algorithm by doing the following steps:

1. it first checks if the provided value is less than the lower limit, if true, it returns the lower limit value instead
2. it proceeds to check if the provided value is greater than the upper limit, if true, it returns the upper limit value instead
3. If the first 2 checks both return false, then it means the value is within the acceptable range and it is returned.

<aside>
❗

You could use ternaries for this as well to get the same result

</aside>

## Edge Cases?

Of course, a few surprises could pop up in real-world usage of this function. Typically, in an interview setting, I would assume no edge cases unless I am given a particular case.

### `Min` greater than `max`

If the upper limit is smaller than the lower limit, then the logic is compromised as it no longer resembles a proper range. Imagine calling the `clamp` function like this:

```tsx
clamp(10, 15, 5); // Output: Unintended behavior
```

As a frontend engineer, you may want to throw an error if this case comes up:

```tsx
if (min > max) {
  throw new Error("Lower limit cannot be greater than upper limit");
}
```

### Non-numeric Inputs (NaN)

If any of the inputs (`value`, `min`, or `max`) is not a number type, or is `NaN` (Not-a-Number), the logic will break, resulting in unexpected behaviour.

```tsx
clamp(NaN, 0, 10); // Output: NaN (incorrect)
clamp(5, "a", 10); // Output: NaN (incorrect)
```

A simple fix might involve using the built-in `isNaN()` function to guard against this case:

```tsx
if (isNaN(value) || isNaN(min) || isNaN(max)) {
  throw new Error("All inputs must be numbers");
}
```

### Equal Value of `Min` and `Max`

This particular case might not cause an error since the function will just return the same value anyway, but it may require specific use cases for proper handling.

```tsx
clamp(5, 10, 10); // Output: 10 (clamped to a fixed number)
```

For example, you might want to throw an error or warning when this happens. On the other hand, you could just allow it.

### The Infinity Problem

If `Infinity` or `-Infinity` is passed as any of the inputs, the result might not behave as intended. For example, a `clamp` call with infinite bounds might not produce useful results.

```tsx
clamp(50, -Infinity, Infinity); // Output: 50 (as expected?)
```

A great fix will be utilizing the `isFinite()` or `Number.isFinite()` methods:

```tsx
if (!isFinite(value) || !isFinite(min) || !isFinite(max)) {
  throw new Error("Inputs cannot be infinite");
}
```

### The Floating Point Precision Problem

JavaScript inherently cannot handle very large or very small numbers with proper precision and this could pose an edge-case problem for our clamp function:

```tsx
clamp(0.1 + 0.2, 0, 0.3); // Output may not be 0.3
```

This can be handled by utilizing methods like `Math.round()` to round up the result to the nearest integer.

## Conclusion

The clamp function has several real-world applications, particularly when working with numerical values that should stay within a range or set.

Thank you for reading till the end, (I hope you did 😉), I write articles and make content for people who want to level up to senior engineers. Follow me on my social platforms and feel free to check out my other articles on [my blog](https://www.emmanueleboh.com).
