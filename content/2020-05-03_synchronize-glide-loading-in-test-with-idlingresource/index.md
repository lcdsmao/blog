---
title: "Synchronize Glide Loading in Test with IdlingResource"
date: "2020"-05-03
tags: ["android", "espresso", "glide", "test"]
---

[Glide](https://github.com/bumptech/glide) allows us to load images asynchronously.
However, the asynchronous loading behavior is not testable which can become a pain.
In some instrumented test scenarios, if the execution of the test code and the loading task of Glide cannot ensure synchronization, then the test result can become uncontrollable.
Thankfully, [Espresso](https://developer.android.com/reference/androidx/test/espresso/Espresso) provides [`IdlingResource`](https://developer.android.com/reference/androidx/test/espresso/IdlingResource) to help us executing asynchronous work in test code synchronously which can solve this problem.

In this post, I will show you how to synchronize the image loading task of Glide in test code with minimal impact on the production code.
Some codes are inspired by this [issue](https://github.com/bumptech/glide/issues/1440).

## Synchronize with CountingIdlingResource and Target

The interface `IdlingResource` represents a resource that may do asynchronous work.
It provides an abstract method named `boolean isIdleNow()` that indicates whether the resource is currently idle or not.

[`CountingIdlingResource`](https://developer.android.com/reference/androidx/test/espresso/idling/CountingIdlingResource) is an implementation of `IdlingResource`.
It maintains a counter and we can increase or decrease the count.
When the count is 0, `isIdleNow()` will returns true.
`CountingIdlingResource` is very suitable for representing the image loading task of Glide.
When a loading task starts we increase the count by 1; when a loading task ends we decrease the count by 1.

To observe the lifecycle of the loading task, we can implement the [`Target`](https://bumptech.github.io/glide/javadocs/400/com/bumptech/glide/request/target/Target.html) interface.
`Target` is an interface that Glide can load a resource into and notify of relevant lifecycle events during a load.
The most frequently used method `into(ImageView)` will finally wrap the `ImageView` into a `Target`.
`Target` provides four lifecycle callbacks:

- `onLoadStarted`
- `onLoadFailed`
- `onLoadCleared`
- `onResourceReady`

When `onLoadStarted` is called it indicates a loading task starts, and the other three callbacks indicate a loading task ends.

Another point to note is that only the callback `onLoadStarted` is guaranteed to be called.
If the size of `Target` is invalid (e.g. visibility of an ImageView is `gone`) then the other three callbacks will never be called.
To ensure the `CountingIdlingResource` will eventually become idle instead of waiting until timeout,
we need to decrease the count manually if `Target` size is invalid.

## IdlingResource Target Example

Let's take a look at an example that extends the `DrawableImageViewTarget` (a base class that implement `Target` and suitable for most Glide use cases):

```kotlin
class IdlingResourceTarget(
  private val idlingResource: CountingIdlingResource,
  view: ImageView
) : DrawableImageViewTarget(view) {

  private var isLoading = false
    set(value) {
      // Only change the count when isLoading really changed
      if (field != value) {
        field = value
        if (value) idlingResource.increment() else idlingResource.decrement()
      }
    }

  // A Runnable to set isLoading to false if the size is invalid
  private val checkSizeTimeOutRunnable = Runnable {
    isLoading = false
  }

  override fun onLoadStarted(placeholder: Drawable?) {
    isLoading = true
    val handler = Handler(Looper.getMainLooper())
    // If we cannot get a valid size during the delay (1000ms) then set isLoading to false
    handler.postDelayed(checkSizeTimeOutRunnable, 1_000)
    getSize { _, _ ->
      // This callback will only be called if the size is valid
      handler.removeCallbacks(checkSizeTimeOutRunnable)
    }
    super.onLoadStarted(placeholder)
  }

  override fun onLoadFailed(errorDrawable: Drawable?) {
    isLoading = false
    super.onLoadFailed(errorDrawable)
  }

  override fun onLoadCleared(placeholder: Drawable?) {
    isLoading = false
    super.onLoadCleared(placeholder)
  }

  override fun onResourceReady(resource: Drawable, transition: Transition<in Drawable>?) {
    isLoading = false
    super.onResourceReady(resource, transition)
  }
}
```

If your App uses many custom `Target` implementations, you can create `IdlingResourceTarget` with the delegate pattern as described in this [comment](https://github.com/bumptech/glide/issues/1440#issuecomment-576486525).

Now we can use the `IdlingResourceTarget` like this (actually we can't and will be explained in the next section):

```kotlin
Glide.with(fragment)
  .load(imageUrl)
  .into(
    IdlingResourceTarget(
      countingIdlingResource,
      imageView
    )
  )
```

## Create Different Loading Strategy in Test and Production Flavor

Normally, we only implement the Espresso in the test flavor.
So using the `IdlingResourceTarget` in the production code is impossible.
To solve this problem, let the interface to do the rescue.

First we define a `ImageLoadStrategy` interface:

```kotlin
interface ImageLoadStrategy {
  // Override this method to decide how to apply the request to the imageView
  fun apply(request: GlideRequest<Drawable>, imageView: ImageView)
}
```

Then, let the `ImageLoadStrategy` companion object implements itself with the delegate pattern.
Also define a `Normal` implementation of `ImageLoadStrategy` that simply calls `request.into(view)`.
Set the `Normal` as the default delegate:

```kotlin
interface ImageLoadStrategy {

  companion object : ImageLoadStrategy {
    private var delegate: ImageLoadStrategy = Normal

    override fun apply(request: GlideRequest<Drawable>, imageView: ImageView) {
      delegate.apply(request, imageView)
    }

    @VisibleForTesting
    fun setTestStrategy(strategy: ImageLoadStrategy) {
      delegate = strategy
    }

    @VisibleForTesting
    fun resetStrategy() {
      delegate = Normal
    }
  }

  fun apply(request: GlideRequest<Drawable>, imageView: ImageView)

  private object Normal : ImageLoadStrategy {

    override fun apply(request: GlideRequest<Drawable>, imageView: ImageView) {
      request.into(imageView)
    }
  }
}
```

Finally, create an extension function `intoViewWithStrategy` for `GlideRequest`:

```kotlin
fun GlideRequest<Drawable>.intoViewWithStrategy(view: ImageView) {
  ImageLoadStrategy.apply(this, view)
}
```

Now, in the production code, calling `intoViewWithStrategy(imageView)` instead of `into(imageView)`:

```kotlin
Glide.with(fragment)
  .load(imageUrl)
  .intoViewWithStrategy(imageView)
```

With `ImageLoadStrategy` the production code will work like before and can load images in another strategy in the test.

## Implement the Test ImageLoadStrategy

The simplest way to use `ImageLoadStrategy` with `IdlingResourceTarget` in test is like this:

```kotlin
val glideIdlingResource: CountingIdlingResource = CountingIdlingResource("Glide")

@Before
fun setUp() {
  IdlingRegistry.getInstance().register(glideIdlingResource)
  ImageLoadStrategy.setTestStrategy(object : ImageLoadStrategy {
    override fun apply(request: GlideRequest<Drawable>, imageView: ImageView) {
      request.into(IdlingResourceTarget(countingIdlingResource, imageView))
    }
  })
}

@After
fun tearDown() {
  ImageLoadStrategy.resetStrategy()
  IdlingRegistry.getInstance().unregister(glideIdlingResource)
}
```

However, the above code has two problems:

- Not considering the `ScaleType` of the imageView while the `Normal` strategy, `into(imageView)`, considered it.
- Too much boilerplate code if we need to apply the test strategy in many tests.

To let the `ScaleType` just works the same with `Normal` strategy, simply copy the real implementation into an extension function:

```kotlin
fun GlideRequest<Drawable>.intoIdlingResourceTarget(
  idlingResource: CountingIdlingResource,
  view: ImageView
) {
  val requestBuilder =
    if (!isTransformationSet && isTransformationAllowed && view.scaleType != null) {
      when (view.scaleType) {
        ScaleType.CENTER_CROP -> clone().optionalCenterCrop()
        ScaleType.CENTER_INSIDE -> clone().optionalCenterInside()
        ScaleType.FIT_CENTER, ScaleType.FIT_START, ScaleType.FIT_END -> clone().optionalFitCenter()
        ScaleType.FIT_XY -> clone().optionalCenterInside()
        ScaleType.CENTER, ScaleType.MATRIX -> this
        else -> this
      }
    } else {
      this
    }
  // Actually, modify other options can also be done here, e.g. disable thumbnail with `thumbnail(null)`.
  requestBuilder.into(IdlingResourceTarget(idlingResource, view))
}
```

To reduce boilerplate code we can create a custom test rule:

```kotlin

class GlideTestRule : ExternalResource() {

  private var glideIdlingResource: CountingIdlingResource? = null

  override fun before() {
    glideIdlingResource = CountingIdlingResource("Glide")
    ImageLoadStrategy.setTestStrategy(object : ImageLoadStrategy {
      override fun apply(request: GlideRequest<Drawable>, imageView: ImageView) {
        request.intoIdlingResourceTarget(glideIdlingResource!!, imageView)
      }
    })
    IdlingRegistry.getInstance().register(glideIdlingResource)
  }

  override fun after() {
    ImageLoadStrategy.resetStrategy()
    IdlingRegistry.getInstance().unregister(glideIdlingResource)
    glideIdlingResource = null
  }
}
```

Now, we only need to define a `GlideTestRule` in the test:

```kotlin
@get:Rule
val glideTestRule = GlideTestRule()
```

## Recap

- Use `intoViewWithStrategy(imageView)` in production code.
- Use `GlideTestRule` in test code.
