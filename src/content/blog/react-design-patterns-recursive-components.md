---
author: Emmanuel O. Eboh
pubDatetime: 2024-07-28T22:18:10.308Z
modDatetime: 2024-07-28T22:18:10.308Z
title: "React Design Patterns: Recursive Components"
slug: react-design-patterns-recursive-components
featured: true
draft: false
tags:
  - design-patterns
  - react
  - frontend
ogImage: "recursion-OG.png"
description: Nested and hierarchical data can be better organized using recursive component design patterns in a React code base.
---

## Table of contents

# React Design Patterns: Recursive Components

## What are design patterns?

While you regularly encounter unique issues as a software engineer, you can also agree that some common issues spring up in your day-to-day code. These issues mostly have to do with software design and structure.

Design patterns can be defined as general, repeatable, and reusable solutions to commonly occurring issues in software design. Think of design patterns as tested, proven and trusted templates that guide you in writing efficient and cleaner code.

Utilizing design patterns introduces a lot of benefits to your codebase as a whole. Here are some examples of such benefits:

- eliminates subtle issues that may arise from poor design or structure of the code
- improves code readability
- ensures code maintainability
- removes unnecessary ambiguity and repetitive code
- enforces a clear and distinct separation between major concerns

etcetera

## Recursion In Programming

You have probably heard or seen the term _“recursion”_ in your software engineering career; maybe you have an idea of what it means, or maybe not at all. If you have no idea what it means, don’t worry; it will be explained briefly in this section.

According to [Wikipedia](<https://en.wikipedia.org/wiki/Recursion_(computer_science)>), recursion is a method of solving a computational programming problem where the solution depends on solutions to smaller instances of the same problem. The application of recursion usually involves calling a function within itself until a base case (or base condition) is met.

Usually, a recursive pattern involves two main components:

- A base case
- A recursive case

### Base Case (or Base Condition)

The base case is the condition under which the recursive function stops calling itself. This component is extremely important in a recursive process because it prevents the function from calling itself infinitely, which could lead to a stack overflow error.

Think of a base case as the endpoint of a recursive call.

**Characteristics of a Base Case:**

- It is the simplest instance of the problem that can be solved directly without further recursion
- There can be one or multiple base cases, depending on the problem
- Without a base case, a recursive function would continue indefinitely, leading to a stack overflow error

### Recursive Case

The recursive case is the part of the recursive function that breaks down the problem into smaller instances. It involves calling the function itself repeatedly using modified conditions, gradually moving towards the base case.

**Characteristics of a Recursive Case:**

- It reduces the problem size or complexity with each recursive call.
- The recursive case must eventually lead to the base case to ensure termination.
- The solution to the problem is built up through the combination of the results of these recursive calls.

That probably didn’t make much sense to you but do not worry. I personally believe the best way to explain and understand recursion is by using real-life analogies. So here is one I’ve prepared:

### Real-Life Scenario

Imagine you are at the top of a staircase and want to get to the bottom. You could approach this task recursively by considering each step as a smaller version of the overall task.

If you get to the last step, you simply step down and you’re done, this represents the base case where the problem or task has been reduced to its simplest form.

If you’re not yet at the last step, you would have to take one step down and consider how to descend the remaining stairs till you reach the last step. This represents the recursive case.

So the overall process will be something like this:

1. Begin at the top of the staircase
2. If there is only one step left, step down to the bottom (base case)
3. If there are multiple steps left:

- Take one step down.
- Now, you are at a new starting point with one fewer step to go. Repeat the process from step 2 with the new staircase (recursive case).

The process continues until you reach the bottom of the staircase. Each time you take a step down, the number of steps needed to reach the bottom reduces, in other words, the problem or task becomes smaller and smaller until it reaches the base case.

The code will look something like this:

```jsx
function descendStairs(stepsLeft) {
  // Base case: no more steps left
  if (stepsLeft === 0) {
    console.log("You have reached the bottom!");
    return;
  }

  // Recursive case: take one step down
  console.log(`Stepping down... ${stepsLeft} steps left to go!`);
  descendStairs(stepsLeft - 1);
}

// Start at the top with a given number of steps
descendStairs(10);
```

## Recursive Component Pattern in React

A simple definition of recursion in React context would be:

> calling a function or component repeatedly within itself until a base condition (base case) is met

This is a very powerful pattern for dealing with data structures that possess nested children. Recursive components are unique in the sense that they can be called within themselves while they traverse through nested data until the *base case* is reached.

### Mechanism

This design pattern consists of a base case that serves as a stop for the recursive loop, as well as a recursive case that calls the function in smaller versions of itself.

Let’s take a look at a React component that is meant to display a mega menu containing several sub-menus that display when clicked.

Breaking it down, we first define our array of data with the necessary properties according to the desired configuration.

For menus with children, the `subMenu` property is defined with the necessary properties. The same goes for the sub-menus of sub-menus. For the menus without children, the `subMenu` property is left blank as an empty array.

```jsx
const megaMenu = [
  {
    id: 1,
    isPregnant: false,
    title: "Home",
    url: "/home",
    subMenu: [],
  },
  {
    id: 2,
    isPregnant: true,
    title: "Products",
    url: "/products",
    subMenu: [
      {
        id: 3,
        isPregnant: true,
        title: "Electronics",
        url: "/products/electronics",
        subMenu: [
          {
            id: 4,
            isPregnant: false,
            title: "Mobile Phones",
            url: "/products/electronics/mobile-phones",
            subMenu: [],
          },
          {
            id: 5,
            isPregnant: false,
            title: "Laptops",
            url: "/products/electronics/laptops",
            subMenu: [],
          },
        ],
      },
      {
        id: 6,
        isPregnant: true,
        title: "Clothing",
        url: "/products/clothing",
        subMenu: [
          {
            id: 7,
            isPregnant: false,
            title: "Men's Clothing",
            url: "/products/clothing/mens",
            subMenu: [],
          },
          {
            id: 8,
            isPregnant: false,
            title: "Women's Clothing",
            url: "/products/clothing/womens",
            subMenu: [],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    isPregnant: false,
    title: "About Us",
    url: "/about-us",
    subMenu: [],
  },
  {
    id: 10,
    isPregnant: false,
    title: "Contact",
    url: "/contact",
    subMenu: [],
  },
];
```

Afterwards, we will define the recursive component for this mega menu. Here there are a few things it needs to have:

- A `data` prop which will be the `megaMenu` array of objects that will be passed later
- A Boolean state called `showNested` that shows if a nested sub-menu is opened or not
- A function called `toggleNested` for toggling each menu containing sub-menu children

The next thing is to map through our earlier defined array of data and utilize the properties within it. The Boolean `isPregnant` property tells whether a menu has a sub-menu or not.

Within the code, both the base case and recursive case are applied through the `isPregnant` property conditions. If true, the function calls itself with each `subMenu` data until it reaches a point where the `isPregnant` property is false.

```jsx
const RecursiveComponent = ({ data = [] }) => {
  const [showNested, setShowNested] = useState(false);

  // handle show/hide
  const toggleNested = title => {
    setShowNested({ ...showNested, [title]: !showNested[title] });
  };

  return (
    <div className="pl-5">
      {data.map(parent => {
        return (
          <div key={parent.id}>
            <div>
              {parent.isPregnant && (
                <button
                  className="text-white"
                  onClick={() => toggleNested(parent.title)}
                >
                  {parent.title}
                </button>
              )}

              <span>{parent.title}</span>
            </div>

            <div style={{ display: !showNested[parent.title] && "none" }}>
              {parent.isPregnant && (
                <RecursiveComponent data={parent.subMenu} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
```

Lastly, we utilize our recursive component on the UI by passing the `megaMenu` array of data we defined earlier:

```jsx
const HomePage = () => {
  return <RecursiveComponent data={megaMenu} />;
};

export default HomePage;
```

It is important to note that each recursive call is accompanied by the creation of a new stack frame to store the data of each call until the base case is met. This may not be a problem for small datasets, but for larger ones, it could lead to resource-intensive memory consumption. Therefore, use recursive solutions with caution.

### Use Cases

A good reason to apply the recursion design pattern would be when you have a reasonable amount of data that contains several levels of nesting, or is hierarchical in nature. Some examples include:

- A mega menu with several sub-links nested in some of the main links
- A complex accordion
- Nested comments feature
- Breadcrumb navigation
- Data display with hierarchical relationships

and so on.

### Benefits

The major benefit of the recursive component approach is the simplicity it provides. An alternative to recursive design patterns would be iterative solutions but as opposed to recursive patterns, iterative approaches are usually faster but more cumbersome to write.

Additionally, recursive patterns are easier to scale because they can handle data at any arbitrary depth.

Here are some benefits worth considering:

- Less verbose code
- Easy maintainability
- Easy scalability
- Consistency in UI rendering

My rule of thumb would be to use recursive design patterns only if other solutions would provide more unnecessary complexity.

### Cons

Recursive design patterns could come with some concerns such as:

- Range error or stack overflow as a result of poorly written base cases
- Intensive memory consumption due to the heaping stack on each function call
- Potential reduced readability, since this is not a pattern most developers are used to on a day-to-day basis
- Increased risk of fragile code especially if the base case is poorly written.

## Conclusion

Recursive React components come with several benefits, especially in code organization, scalability and flexibility with relational data.

Take advantage of them when it is appropriate, usually after considering the performance impact on the application.

Thank you for reading till the end, (I hope you did 😉), I write articles and make content for people who want to level up to senior engineers. Follow me on my social platforms, and feel free to check out my other articles on [my blog](https://www.emmanueleboh.com).

Happy building!
