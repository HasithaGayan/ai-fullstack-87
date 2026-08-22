# Day 7 - CSS Flexbox

## What I Learned

### 1. Flexbox Basics

Flexbox is used to arrange elements in rows or columns.

```css
display: flex;
```

The parent becomes the **flex container**.

The children become **flex items**.

```text
Parent = Flex Container
Children = Flex Items
```

---

### 2. flex-direction

```css
flex-direction: row;
```

Places items:

```text
left → right
```

```css
flex-direction: column;
```

Places items:

```text
top
↓
bottom
```

---

### 3. Main Axis and Cross Axis

With:

```css
flex-direction: row;
```

```text
Main axis  = horizontal
Cross axis = vertical
```

`justify-content` controls the main axis.

`align-items` controls the cross axis.

---

### 4. justify-content

Example:

```css
justify-content: center;
```

Moves flex items to the center of the main axis.

I tested:

```css
justify-content: flex-start;
```

and:

```css
justify-content: center;
```

to see the difference.

---

### 5. align-items

```css
align-items: center;
```

Aligns flex items on the cross axis.

---

### 6. gap

```css
gap: 1rem;
```

Creates space between flex items.

This is cleaner than adding separate margins to every item.

---

### 7. flex-wrap

```css
flex-wrap: wrap;
```

Allows items to move onto another line when there is not enough space.

Example:

```text
Wide:
[ Item 1 ] [ Item 2 ] [ Item 3 ]

Small:
[ Item 1 ] [ Item 2 ]
[ Item 3 ]
```

---

### 8. flex-grow

```css
flex-grow: 1;
```

Allows a flex item to use extra available space.

---

### 9. flex Shorthand

I used:

```css
flex: 1 1 180px;
```

This means:

```text
1     = flex-grow
1     = flex-shrink
180px = flex-basis
```

Simple meaning:

The item can grow, shrink, and starts with a preferred size of about `180px`.

---

### 10. Skills Flexbox

I changed the Skills list into a Flexbox layout.

```css
#skills ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}
```

Each skill uses:

```css
#skills li {
    flex: 1 1 180px;
}
```

---

### 11. Project Cards

I created:

```html
<div class="projects-container">
```

This became the flex container.

The project `<article>` elements became flex items.

```css
.projects-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
```

Project cards use:

```css
.projects-container article {
    flex: 1 1 280px;
}
```

On wider screens they can sit side by side.

On smaller screens they wrap underneath each other.

---

### 12. Responsive Navigation

I used a media query:

```css
@media (max-width: 600px) {
    nav ul {
        flex-direction: column;
    }
}
```

This means:

```text
Above 600px  → horizontal navigation
600px or less → vertical navigation
```

`600px` is the breakpoint.

---

### 13. DevTools

I inspected:

```html
<div class="projects-container">
```

in DevTools.

The `flex` badge showed that the browser recognized it as a Flexbox container.

---

### 14. Responsive Testing

I tested the page at:

```text
1200px
700px
320px
```

I checked:

- navigation
- project cards
- skills
- wrapping
- mobile layout
- horizontal overflow

---

## Key Reminder

```text
display: flex      = enable Flexbox
flex-direction     = row or column
justify-content    = main axis
align-items        = cross axis
gap                = space between items
flex-wrap          = allow new rows
flex-grow          = use extra space
flex-basis         = preferred starting size
```

## Day 7 Status

**Flexbox and Responsive Layout Practice Completed ✅**