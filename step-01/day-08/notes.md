# Day 8 — CSS Grid and Responsive Design

## Responsive Navigation Breakpoint

I tested my navigation at different screen widths.

- At 700px, all five navigation links fit horizontally.
- At 601px, the links still fit horizontally.
- At 500px, the horizontal navigation wrapped awkwardly.
- At 500px with the 600px breakpoint enabled, the links stacked vertically and became easier to read.

I chose `@media (max-width: 600px)` because the navigation becomes crowded on smaller screens.

This is a content-driven breakpoint because it is based on how the content fits, rather than a specific phone model.


## Flexbox vs CSS Grid

### Example 1 — Navigation (Flexbox)

My portfolio uses Flexbox for the navigation links.

- CSS selector: `nav ul`
- `display: flex` arranges the links along one main axis.
- `gap` creates spacing between links.
- `flex-wrap: wrap` allows links to wrap when needed.
- At 600px and below, a media query changes `flex-direction` to `column`.

**Why Flexbox?** Navigation is mainly a one-dimensional layout: a row or a column of links.

### Example 2 — Project Gallery (CSS Grid)

My portfolio uses CSS Grid for its project cards.

- CSS selector: `.projects-container`
- `display: grid` creates a grid container.
- `repeat(auto-fit, minmax(min(100%, 250px), 1fr))` creates responsive columns.
- `gap: 1rem` adds spacing between cards.
- At narrow widths, the cards form one column; at wider widths, they appear side by side.
- I compared `auto-fill` with `auto-fit` and chose `auto-fit` because it collapses unused tracks so the existing cards can expand.

**Why CSS Grid?** A project gallery benefits from controlling column tracks and arranging items into a two-dimensional grid of rows and columns.

### Conclusion

I use Flexbox for one-dimensional navigation and CSS Grid for responsive project-card layouts. I choose layout techniques based on the content rather than just screen size.