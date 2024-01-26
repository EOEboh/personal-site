---
author: Emmanuel O. Eboh
pubDatetime: 2024-01-24T11:39:30.573Z
modDatetime: 2024-01-24T11:39:30.573Z
title: The Key To Faster Teams is Stacked, Commit-Based PRs
slug: the-key-to-faster-teams-is-stacked-feature-based-prs
featured: true
draft: false
tags:
  - pull-request
  - git
  - software development
ogImage: "new-og.jpg"
description: Teams can move fast without the bottlenecks provided by code reviews. Everything from feature development to reviews can happen concurrently by using stacked pull requests.
---

## Table of contents

# The Key To Faster Teams is Stacked, Commit-Based PRs

Imagine this scenario— You work at a fast-moving healthcare startup as a developer, and you are tasked to implement three high-priority features on the healthcare app that are interconnected. The features include:

1. The user can send _chat complaints_ to a chosen consultant doctor.
2. Consultant doctors can request the user to _schedule a meeting_ at a certain date.
3. The user can then make a _one-time payment_ and confirm a scheduled meeting.

You quickly get to work by, of course, working on the first feature on the list, but after some time, you complete the first feature and request a teammate or colleague to review a pull request (PR) you just opened, containing about a hundred lines of code. This is _huge_! It contains many changes.

Additionally, because the code review will potentially take some time, you cannot move on to the next high-priority feature— adding the ability to _schedule a meeting,_ until this huge PR is reviewed and merged, in other words, you’re blocked!

Aside from the fact that you are blocked from moving on, there are a bunch of other issues we can infer from this situation:

- This PR changed and added _a lot_ of files; making it overwhelming for anyone to review
- Because of the size of this PR, there is more potential for errors to be detected during reviews. Blocking you further!
- The review process will take time, and this distracts your teammates from focusing on other tasks
- There is also a potential decrease in code review quality

![stacked-workflow.png](@assets/images/blockage-problem.png)

_Wheew!_ I could go on and on but the issues highlighted above are a serious cause for concern.

## The Solution Is Not Smaller Pull Requests

You probably already guessed the solution to this stumbling block, a no-brainer at that.

> Okay then just make sure you submit smaller pull requests at a time

Yeah, no doubt, that sounds right, but this does not exactly quicken the code review process as many would think.

Breaking the first feature into smaller PRs could still take a lot of time to review and you would still need to wait for the preceding PR to be merged into _main_ (or whatever your parent branch is) before hopping on to the next feature.

Not ideal enough!

## We Do Not Have To Branch Off The Main Branch Every Time!

Okay, what if there was a way to branch off and build on top of the preceding PR? That is exactly what the idea of _stacking_ PRs is.

Think of stacking PRs like the structure of an onion, it has one core foundation— the bulb, which is the **_main_** branch and several layers built on top of it.

You start with the first feature branch (**_feature-one_**) by branching it off the **_main_** or **_develop_** branch. After the first feature is completed, you add the second feature branch (**_feature-two_**) by branching off the first child branch and so on. Here’s a visual illustration:

![stacked-workflow.png](@assets/images/stacked-workflow.png)

This is known as _[Trunk Based Development](https://trunkbaseddevelopment.com/)_.

Based on the illustration above, we have solved the blockage problem by breaking each feature as a child branch of the preceding branch:

1. PR #1: _Chat Complaints_
2. PR #2: _Schedule Meeting_
3. PR #3: _One-Time Payment_

> ❗ These branches are independent of each other, and the preceding branches must be merged first in the order in which they are stacked!

## Implementing The Stacked PR Workflow

First and foremost, I’d advise some certain team-wide actions to ensure satisfactory output and faster deployments:

- Briefing the team on the benefits of the stacked PR approach
- Ensuring that **no merge** is done until after review of each PR has been completed
- Enforcing standardized practices such as review timelines, test passes and rollback solutions

Let’s refer back to the initial scenario and how you can technically enforce the stacked PR approach.

1. Create our first feature branch off the **_main(trunk) branch_**

```bash
// Created off the main branch
git checkout -b feature-one
```

2. Commit the completed feature and push to GitHub (or any code hosting platform)

```bash
// Stage the feature
git add [file name]

// Commit feature
git commit -m "Feature: added chat complains feature"

// Creates PR #1 - the Parent
git push -u origin feature-one
```

3. Continue stacking the subsequent features off their direct parent

```bash
// Checkout the parent PR
git checkout feature-one

// Create the child PR
git checkout -b feature-two

// Creates PR #2 - the first child PR
git add [file name]
git commit -m "Feature: Schedule Meeting Feature added"
git push origin feature-two

// Create second child PR
// on first child branch
git checkout -b feature-three

// Creates PR #3 - the second child PR
git add [file name]
git commit -m "Feature: One-Time Payment Feature added"
git push origin feature-three
```

The idea is simple, create branches off the previous branch and build upon them like onion layers or _stacks._

## Benefits Of The Stacked PR Workflow

### Free flow development workflows

This is obviously the main benefit of this approach; the interrupting bottlenecks of code reviews are eliminated leading to a smoother experience for the team.

### Faster Shipment And Releases

Since blockers are eliminated during the development process, this almost guarantees faster shipment of features and bug fixes.

### Faster and More Quality Reviews

The smaller and more granular the PRs, the faster and more quality the reviews will be. Most developers are not willing to thoroughly review a large PR with several hundreds of diffs. It distracts them from their own tasks, it is draining, and there could be excess back and forth. Granular PRs are a way to ensure a quality code review process.

### Easier Debugging Process

When changes are more granular and isolated, testing and debugging become easy. There are fewer risks of conflicts with other features being developed; this is one of the biggest perks the stack PR approach provides.

### Developer **Flexibility**

Developers maintain the freedom and flexibility of ensuring granular and precise changes to commits using _Git_ features like interactive rebase and preliminary branch merge before the final merge.

### Better Structured Pull Requests

The stacked PR approach gives us better immunity against things like merging PRs in the wrong order, misapplied changes and so on. Most likely arising from human error which is inevitable in every work process we do.

## Here’s Some Little Drawbacks Though

Every workflow has its drawbacks, which is fine. The stacked PR workflow best suits teams that need to move fast— fast code reviews, fast feature deployments, lower learning curve. However, let’s highlight a few drawbacks:

- **Keeping Branches in Sync**: A good example is when a reviewer drops a comment on **_feature-one_** PR requesting you to make changes, when the change is made, it means the children branches (**_feature-two_** and **_feature-three_**) are now stale and need rebasing to keep the commits in sync. This usually requires manual effort.
- **More Risk of Breaking Production:** Since development branches are closer to the main branch _aka_ Trunk, there’s a higher risk of accidentally shipping breaking features. Proper integration and unit tests, as well as a rollback alternative, should mitigate this risk.

## Final Thoughts

I believe every workflow is suited for certain kinds of teams and cultures. For example, the _Gitflow_ workflow favours a more junior team because the risk of breaking the production version is much smaller, and the review process is probably much longer. The stacked PR approach, however, should still take precedence when the issue of fast reviews and deployments becomes apparent, even though the team might be mainly junior.

In summary, there is no hard and fast rule, but it’s generally better to move hard and fast (no pun intended 😁).

Happy building!
