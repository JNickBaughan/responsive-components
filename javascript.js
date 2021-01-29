if ("ResizeObserver" in self) {
  // Create a single ResizeObserver instance to handle all
  // container elements. The instance is created with a callback,
  // which is invoked as soon as an element is observed as well
  // as any time that element's size changes.
  var ro = new ResizeObserver(function (entries) {
    // Default breakpoints that should apply to all observed
    // elements that don't define their own custom breakpoints.
    var defaultBreakpoints = { XS: 0, SM: 384, MD: 576, LG: 768, XL: 960 };

    entries.forEach(function (entry) {
      // If breakpoints are defined on the observed element,
      // use them. Otherwise use the defaults.
      var breakpoints = entry.target.dataset.breakpoints
        ? JSON.parse(entry.target.dataset.breakpoints)
        : defaultBreakpoints;

      // Update the matching breakpoints on the observed element.
      Object.keys(breakpoints).forEach(function (breakpoint) {
        var minWidth = breakpoints[breakpoint];
        if (entry.contentRect.width >= minWidth) {
          const originalClasses = entry.target.classList.value
            .split(" ")
            .filter(function (c) {
              return !Object.keys(defaultBreakpoints).includes(c);
            });
          entry.target.classList = originalClasses.join(" ");

          entry.target.classList.add(breakpoint);
        }
      });
    });
  });
  var elements = document.querySelectorAll("[data-observe-resizes]");
  for (var element, i = 0; (element = elements[i]); i++) {
    ro.observe(element);
  }
}

["xsmall", "small", "medium", "large", "xlarge"].forEach((size) => {
  var button = document.getElementById(size);
  button.addEventListener("click", function () {
    var elem = document.getElementById("container");
    elem.classList = size;
  });
});
