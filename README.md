# responsive-components

This repository is a simple example of using the ResizeObserver API to make "components" responsive based on their parent container. Not on the size of the browser!

For each container element observed we update the class name (XS, SM, MD, LG, XL) based on the container's size

## A little about the code

We define some class names with diferent breakpoints

```
var defaultBreakpoints = { XS: 0, SM: 384, MD: 576, LG: 768, XL: 960 };
```

when we observe the size of the parent container change we add appropriate class name (XS, SM, MD, LG, XL)

```
Object.keys(breakpoints).forEach(function (breakpoint) {
        var minWidth = breakpoints[breakpoint];
        if (entry.contentRect.width >= minWidth) {
          const originalClasses = entry.target.classList.value
            .split(" ")
            .filter(function (c) {
              return !Object.keys(defaultBreakpoints).includes(c);
            });
            // don't forget to add back the original classes that aren't part of our breakpoints!
          entry.target.classList = originalClasses.join(" ");
          entry.target.classList.add(breakpoint);
        }
      });
```

From there we can use the breakpoint class names to style the child "component"

```
/* XL */
#container .main-content.XL {
  background-color: saddlebrown;
  height: 300px;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(6, 16.6%);
}

#container .main-content.XL .content-header {
  background-color: lightblue;
  margin: 15px 0 15px;
  border: black solid 2px;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 7;
}

#container .main-content.XL .content-title {
  grid-column-start: 4;
  grid-column-end: 10;
  grid-row-start: 2;
  grid-row-end: 3;
}

#container .main-content.XL .content-body {
  font-size: x-large;
  grid-column-start: 4;
  grid-column-end: 10;
  grid-row-start: 3;
  grid-row-end: 6;
}
```

Pretty cool stuff!

Next thing I want to do is to use it with a React micro frontend app where each micro application will have the XS, SM, etc applied their parent div in the container application. Then each micro application will render responsively based on where they are rendered within the container app. Have a MFE app that is a checkout cart? Render the app in a XL container to see your cart with all of it's details. Have the same route rendered in a small sidebar within your shop to display only the highlights of a customer's orders.

## How to run this

Just open the index.html file in a browser. Clicking the buttons at the bottom will change the container div's size and responsively change the child UI

## Credit where credit is due

The idea for this along with the observer code (modified slightly) came from this article I found a while back

[Good article by Philip Walton](https://philipwalton.com/articles/responsive-components-a-solution-to-the-container-queries-problem/)

Can't wait to combine this technique with the Micro Frontend architecture
