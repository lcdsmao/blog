+++
title = "Material Design — Transition for Floating Action Button in Android"
date = 2019-05-01
+++

Material.io shows some [transition animations](https://material.io/design/components/buttons-floating-action-button.html#types-of-transitions) for the floating action button but doesn’t reveal how to implement them in Android. However, _com.google.android.material:material_ actually already provided some components to achieve these animations. In this article, I will introduce how to implement these two transformations:

- Speed dial
- Morph

### Speed dial

> When pressed, a FAB can display three to six related actions in the form of a **speed dial**.

![image](1.gif)

Here is the sample code:

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

- Step 1: Use `CoordinatorLayout` as the root
- Step 2: Create two child views. The dial view to show related actions (dial) and the `FloatingActionButton` (fab)
- Step 3: Attached the `com.google.android.material.transformation.FabTransformationScrimBehavior` to dial view’s layout_behavior
- Step 4: Call `FloatingActionButton#setExpanded(Boolean)` in your activity then the dial view will show or hide automatically, e.g. set an OnClickListener to the fab `fab.setOnClickListener { fab.isExpanded = !fab.isExpanded }`

#### Behind the scene

`FloatingActionButton` implemented the `ExpandableWidget` interface thus has two methods `boolean isExpanded()` and `boolean setExpanded(boolean expanded)`. An `ExpandableWidgetHelper` class will be used in ExpandableWidget to call these two methods and dispatch the expanded state to parent `CoordinatorLayout` Then, `FabTransformationScrimBehavior` will respond to the state change through CoordinatorLayout and create the show/hide animators for the child view that is attached to.

### Morph

> The FAB can transform into another surface in an app. Morphing should be reversible and transform the new surface back into the FAB.

![image](2.gif)

Morph

Here is the sample code:

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

- Step 1: Use `CoordinatorLayout` as the root
- Step 2: Create the Floating Action Button (fab) and the new surface view which should be a `CircularRevealWidget` (_Important!!!_), e.g. `CircularRevealLinearLayout`, `CircularRevealFrameLayout` and et al. If we don’t use the CircularRevealWidget we will not get the morph animation
- Step 3: Attached the `com.google.android.material.transformation.FabTransformationSheetBehavior` to the new surface view’s layout_behavior
- Step 4: Call `FloatingActionButton#setExpanded(Boolean)` in your activity then morph animation will work

#### Behind the scene

The working flow is similar to the speed dial but `FabTransformationSheetBehavior` and `CircularRevealWidget` (through CircularRevealHelper) will create more complicated morph animations.
You can find the source code here: [_FabTransformationSheetBehavior_](https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/transformation/FabTransformationSheetBehavior.java), [_CircularRevealHelper_](https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/circularreveal/CircularRevealHelper.java).

### Create your own animation

If we want to create some different animations, we can inherit from one of the transformation behaviors and provide your own animators:

- ExpandableBehavior
- ExpandableTransformationBehavior
- FabTransformationBehavior
- FabTransformationScrimBehavior
- FabTransformationSheetBehavior

I create a simple behavior that extends `ExpandableTransformationBehavior` that let the speed dial actions view appear sequentially instead of all appears at once ([source code](https://github.com/lcdsmao/ExpandableFABExample/blob/master/app/src/main/java/com/paranoid/mao/expandablewidgetexample/EmitExpandableTransformationBehavior.kt)):

![image](3.gif)

### Summary

By using `com.google.android.material:material` we almost only need to write a few XML codes to achieve the fancy transformation animations for the floating action button.
