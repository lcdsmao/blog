+++
title = "Material Design - Transition for Floating Action Button in Android"
date = 2019-05-01

[taxonomies]
tags = ["android", "material design", "animation"]

[extra]
modified_date = 2020-03-31
+++

In this post I will show you how to implement two types [transition animations](https://material.io/design/components/buttons-floating-action-button.html#types-of-transitions) for the floating action button (FAB):

- Speed dial
- Morph

Both animations are implemented via the `CoordinatorLayout.Behavior` so `CoordinatorLayout` is required to be used.

## Speed dial

> When pressed, a FAB can display three to six related actions in the form of a **speed dial**.

![spped dial](1.gif)

### Usage

Create a `CoordinatorLayout` that contains a dial view and a FAB.
The show/hide animation of the dial view is done through the `com.google.android.material.transformation.FabTransformationScrimBehavior` behavior class.
To set up the behavior we bind the full class name of the behavior to the dial view with layout xml attribute `app:layout_behavior`.

Here is the sample layout xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <LinearLayout
        android:id="@+id/dial"
        android:layout_gravity="top|center_horizontal"
        android:visibility="invisible"
        android:layout_marginBottom="16dp"
        app:layout_anchor="@id/fab"
        app:layout_anchorGravity="top|center_horizontal"
        app:layout_behavior="com.google.android.material.transformation.FabTransformationScrimBehavior">
        ... child views
    </LinearLayout>
    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab"
        android:layout_gravity="bottom|end"
        ...
        />
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

Now we can toggle the visibility of the dial view programmatically via `FloatingActionButton.setExpanded(boolean)`:

```kotlin
fab.setOnClickListener {
  fab.isExpanded = !fab.isExpanded
}
```

### Behind the scene

The two methods `boolean isExpanded()` and `boolean setExpanded(boolean expanded)` of the `FloatingActionButton` are inherited from the `ExpandableWidget` interface.
A bridge class `ExpandableWidgetHelper` is used to connect the `ExpandableWidget` and the parent `CoordinatorLayout`.
When the expanded state of `ExpandableWidget` changes, `ExpandableWidgetHelper` will notify the `CoordinatorLayout` so the `CoordinatorLayout` can dispatch these changes to the `FabTransformationScrimBehavior`.
Finally, `FabTransformationScrimBehavior` will respond to the state changes and create the show/hide animators for attached view.

## Morph

> The FAB can transform into another surface in an app. Morphing should be reversible and transform the new surface back into the FAB.

![image](2.gif)

### Usage

Create a `CoordinatorLayout` that contains two child views, a FAB and a target view that the FAB will transform into.
Similar to the speed dial implementation, a specific behavior class `com.google.android.material.transformation.FabTransformationSheetBehavior` need to be bind to the target view.
Notice that there is another requirement for the target view that the view must be a **`CircularRevealWidget`**.
The material design components library already provided some often used layouts that implemented `CircularRevealWidget` for us, like `CircularRevealFrameLayout`.
If the target view is not a CircularRevealWidget then no morph animation will appear. 

Here is the sample layout xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <com.google.android.material.circularreveal.CircularRevealFrameLayout
        android:id="@+id/sheet"
        android:layout_gravity="bottom|center_horizontal"
        android:visibility="invisible"
        android:background="@color/secondaryColor"
        app:layout_behavior="com.google.android.material.transformation.FabTransformationSheetBehavior">
        ... child views
    </com.google.android.material.circularreveal.CircularRevealFrameLayout>
    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab"
        android:layout_gravity="bottom|end"
        />
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

When `FloatingActionButton.isExpanded() == false` only the FAB will show and vice verse. 
To transform the FAB into the target view we can call `FloatingActionButton.setExpanded(true)` or transform the FAB back by calling `FloatingActionButton.setExpanded(false)`.

### Behind the scene

The working flow is very similar to the speed dial but a little more complicated.
If you are interested in the implementation detail, the related source code can be found here:

- [FabTransformationSheetBehavior](https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/transformation/FabTransformationSheetBehavior.java)
- [CircularRevealHelper](https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/circularreveal/CircularRevealHelper.java).

## Create our own animation

To create our own animation when `FloatingActionButton.setExpanded(boolean)` was called, we need to create custom behavior class that inherit one of these transformation behaviors:

- ExpandableBehavior
- ExpandableTransformationBehavior
- FabTransformationBehavior
- FabTransformationScrimBehavior
- FabTransformationSheetBehavior

Then just bind the full class name to views via `app:layout_behavior`.

Here is a custom behavior example that let the speed dial actions views appear sequentially:

![image](3.gif)

The custom behavior inherited the `ExpandableTransformationBehavior` and here is the [source code](https://github.com/lcdsmao/ExpandableFABExample/blob/master/app/src/main/java/com/paranoid/mao/expandablewidgetexample/EmitExpandableTransformationBehavior.kt).

### Summary

By using `com.google.android.material:material` we only need to write a few XML codes to achieve the fancy transformation animations for the floating action button.
