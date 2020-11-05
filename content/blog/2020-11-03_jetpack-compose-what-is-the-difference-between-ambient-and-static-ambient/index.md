---
title: "Jetpack Compose - What is the Difference Between ambientOf and staticAmbientOf"
date: "2020-11-03"
tags: ["jetpack-compose", "android"]
---

In this post, I talk a little about the difference between two top-level functions used to create an `Ambient`, the `ambientOf` and the `staticAmbientOf`,
and how to choose which one to use.

The Jetpack Compose version using in this post is 1.0.0-alpha06.

## Ambient Introduction

The `Ambient` API in Jetpack Compose is used to pass some data implicitly to child components.
If you are familiar with other declarative frameworks, you can think of the `Ambient` API as the [Context](https://reactjs.org/docs/context.html#dynamic-context) in React, [Provider](https://pub.dev/packages/provider) in Flutter, or [EnvironmentObject](https://developer.apple.com/documentation/swiftui/environmentobject) in SwiftUI.

The basic usage of `Ambient` is very simple.
First, we declare a global `Ambient`:

```kotlin
val AmbientCounter = ambientOf<Int>()
```

The declared `Ambient` serves as a key to some data and will do nothing itself.
In order to associate the `Ambient` to some data and provide the data to children, we need to use the `Providers` component:

```kotlin
@Composable
fun Parent() {
  val count = 100
  Providers(AmbientCounter provides count) {
    Child()
    // Other composable children ...
  }
}
```

Then, any children under the `Providers` can read the provided value via `Ambient.current`:

```kotlin
@Composable
fun Child() {
  val count = AmbientCounter.current // will be 100
  Text("Count value $count")
}
```

## Ambient Behavior

Currently, two top-level functions `staticOf` and `staticAmbientOf` can be used to declare an `Ambient`.
What's the difference between them?

Here are parts of the comments of these two functions:

- `ambientOf`

  > Changing the value provided during recomposition will invalidate the children of Providers that read the value using Ambient.current.

- `staticAmbientOf`

  > Changing the value provided will cause the entire tree below Providers to be recomposed, disabling skipping of composable calls.

It seems like the ambient created by `staticOf` is more efficient (actually depends on the situation) and will only trigger children's recomposition only if they need it.
While `staticAmbientOf` will recompose all children no matter its value is used or not.
Let's verify the behavior of these two functions with some test codes!

### Test the Ambient Created by ambientOf

First, we define a `Child` component which log its parameter `text`:

```kotlin
@Composable
fun Child(text: String) {
    Log.d("AmbientTest", "Child: $text")
}
```

We know that the Jetpack Compose is very clever and will only recompose a `Composable` function if its content changed.
So for the `Child` component defined above, normally, we should only see the log when the parameter `text` changed (include the initial composition).

Then, we declare an `AmbientCounter` by the `ambientOf` function and a `Parent` component which uses the `AmbientCounter` to expose its internal state to children:

```kotlin
val AmbientCounter = ambientOf<Int>()

@Composable
fun Parent() {
    val count = remember { mutableStateOf(0) }
    Providers(
        AmbientCounter provides count.value
    ) {
        val ambientString =
            "Ambient Text, Count ${AmbientCounter.current}"

        Child(text = ambientString)
        Child(text = "Unchanged text")

        IconButton(onClick = { count.value++ }) {
            Icon(Icons.Default.Add)
        }
    }
}
```

The internal `count` state of `Parent` can be incremented by clicking a button.
The `Providers` component contains two `Child` components,
one's text `ambientString` is generated from the value of `AmbientCounter`,
the other one's text is never changed.

Launch the test app and click several times on the button we can see these logs:

```text
D/AmbientTest: Child: Ambient Text, Count 0
D/AmbientTest: Child: Unchanged text
D/AmbientTest: Child: Ambient Text, Count 1
D/AmbientTest: Child: Ambient Text, Count 2
D/AmbientTest: Child: Ambient Text, Count 3
D/AmbientTest: Child: Ambient Text, Count 4
```

As expected, the child with unchanged text only composed once, the other child using the `ambientString` recomposed every time the count changed.

### Test the Ambient created by staticAmbientOf

Now we change to using `staticAmbientOf` function for creating `AmbientCounter`:

```kotlin
// highlight-start
// Change to staticAmbientOf
val AmbientCounter = staticAmbientOf<Int>()
// highlight-end

@Composable
fun Parent() {
    val count = remember { mutableStateOf(0) }
    Providers(
        AmbientCounter provides count.value
    ) {
        val ambientString =
            "Ambient Text, Count ${AmbientCounter.current}"

        Child(text = ambientString)
        Child(text = "Unchanged text")

        IconButton(onClick = { count.value++ }) {
            Icon(Icons.Default.Add)
        }
    }
}
```

Here are the logs after several button clicks:

```text
D/AmbientTest: Child: Ambient Text, Count 0
D/AmbientTest: Child: Unchanged text
D/AmbientTest: Child: Ambient Text, Count 1
D/AmbientTest: Child: Unchanged text
D/AmbientTest: Child: Ambient Text, Count 2
D/AmbientTest: Child: Unchanged text
D/AmbientTest: Child: Ambient Text, Count 3
D/AmbientTest: Child: Unchanged text
D/AmbientTest: Child: Ambient Text, Count 4
D/AmbientTest: Child: Unchanged text
```

As you can see, for the `Child` that only using the unchanged text, recomposition still occurred every time the `AmbientCounter` value changed.

## The Hidden Cost of ambientOf

From the above section, we confirmed that `ambientOf` will only recompose what we need.
It seems like `ambientOf` is more efficient so why we still have `staticAmbientOf`?
After searching the source code of Jetpack Compose we may find that the occurrences of `staticAmbientOf` is much more often than `ambientOf`.
I can't figure it out, so I asked the Jetpack Compose team in Slack and got the answer!
Thanks a lot for them. 😊

The result is that both the `ambientOf` and `staticAmbientOf` have their cons and pros.
So far we have only considered the recomposition situation of `Ambient`.
There is another cost we need to consider, the setup cost.

We already know that `staticAmbientOf` will force a recomposition of all children when its value changed.
But this also means that we don't need to track the subscriptions on every usage of the `Ambient`.
This will give us a faster setup.

On the other hand, `ambientOf` needs to pay the cost of proper subscription setups for the effective recomposition.
If there are large numbers of the subscriptions of the `Ambient`, e.g. theme colors,
then we may pay a higher cost when building and maintaining the initial compose tree.
This can cause our app slower.

## Conclusion

Both `staticAmbientOf` and `ambientOf` can be used to create an `Ambient` value.
Theoretical, `staticAmbientOf` is suitable for the use case that the `Ambient` value is likely to be read more than written, while `ambientOf` is the opposite.
However, this conclusion is lacking support from some benchmark tests.

Overall, if we need an `Ambient` value, first consider the `staticAmbientOf`.
Because most things which are `Ambient` values should be consumed by large numbers of children,
and **_things that are consumed by large numbers of children empirically seem to change not very often_** (e.g. preferred language, theme).
Otherwise, passing those values as parameters is a better choice.
