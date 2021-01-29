# responsive-components

This repository is a simple example of using ResizeObserver API to make components responsive based on their parent container

For each container element we are observing we update the class name (XS, SM, MD, LG, XL) based on the container's size

```
var defaultBreakpoints = { XS: 0, SM: 384, MD: 576, LG: 768, XL: 960 };
Object.keys(breakpoints).forEach(function (breakpoint) {
        var minWidth = breakpoints[breakpoint];
        if (entry.contentRect.width >= minWidth) {
          const originalClasses = entry.target.classList.value
            .split(" ")
            .filter(function (c) {
              return !Object.keys(defaultBreakpoints).includes(c);
            });
            ###
          entry.target.classList = originalClasses.join(" ");
          entry.target.classList.add(breakpoint);
        }
      });
```

This is pretty cool stuff! Next thing to do is to use it with micro frontend architecture where the each micro application will have the XS, SM, etc applied their parent div in the container application. Then each micro application will render responsively based on where they are rendered!
