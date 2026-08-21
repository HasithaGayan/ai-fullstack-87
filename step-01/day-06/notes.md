# Day 6 - CSS Foundations

## What I Learned

### 1. CSS Basics
CSS controls how HTML looks.

Basic structure:

```css
selector {
    property: value;
}
```

Example:

```css
body {
    background-color: #f5f5f5;
}
```

---

### 2. Selectors

Element selector:

```css
body
```

Class selector:

```css
.section-card
```

ID selector:

```css
#about
```

Class can be reused.

ID is for a specific unique element.

---

### 3. Specificity

For the selectors I practiced:

```text
Element < Class < ID
```

Example:

```css
.section-card {
    background-color: white;
}

#about {
    background-color: lightblue;
}
```

`#about` wins because it is more specific.

---

### 4. Box Model

Every element has:

```text
Content → Padding → Border → Margin
```

- Content = actual content
- Padding = space inside
- Border = line around element
- Margin = space outside

Example:

```css
.section-card {
    margin: 20px auto;
    padding: 2rem;
    border: 1px solid #cccccc;
}
```

---

### 5. box-sizing

```css
box-sizing: border-box;
```

This makes width calculations easier because padding and border are included inside the declared width.

---

### 6. CSS Units

```text
px  = pixels
%   = relative width
rem = relative to root font size
em  = relative to current font size
```

Examples:

```css
width: 90%;
max-width: 1000px;
padding: 2rem;
padding: 0.25em 0;
```

---

### 7. CSS Variables

Created reusable colors:

```css
:root {
    --bg-color: #f5f5f5;
    --text-color: #222222;
    --card-color: #ffffff;
    --border-color: #cccccc;
    --primary-color: #2563eb;
}
```

Use them like:

```css
color: var(--primary-color);
```

This keeps the design consistent and easier to change.

---

### 8. Typography

I used:

```css
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}
```

Headings:

```css
h1,
h2,
h3 {
    line-height: 1.2;
}
```

Readable paragraph width:

```css
p {
    max-width: 65ch;
}
```

---

### 9. Forms

I styled:

- labels
- inputs
- textarea
- button
- spacing

Example:

```css
input,
textarea {
    width: 100%;
    max-width: 500px;
    padding: 0.6rem;
    border: 1px solid var(--border-color);
    box-sizing: border-box;
}
```

---

### 10. Navigation

I removed bullets and made links horizontal.

```css
nav ul {
    list-style: none;
}

nav li {
    display: inline-block;
    margin-right: 1rem;
}
```

---

### 11. Hover and Focus

Hover:

```css
nav a:hover {
    text-decoration: underline;
}
```

Keyboard focus:

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 3px;
}
```

This improves accessibility.

---

### 12. DevTools

I used browser DevTools to inspect the Contact section.

I checked:

```text
Margin
Border
Padding
Content
```

I also saw that:

```css
padding: 2rem;
```

was approximately:

```text
32px
```

---

### 13. Debugging Practice

I intentionally changed:

```css
padding: 2rem;
```

to:

```css
padding: 0;
```

The content moved too close to the border.

Then I restored:

```css
padding: 2rem;
```

This showed me how padding affects layout.

---

### 14. CSS Cleanup

I removed duplicate rules like repeated:

```css
body
```

and:

```css
a
```

Clean CSS is easier to read, debug, and maintain.

---

## Day 6 Key Reminder

```text
HTML = Structure
CSS = Presentation
```

Main concepts learned:

- Selectors
- Cascade
- Specificity
- Box model
- Margin and padding
- CSS units
- CSS variables
- Typography
- Forms
- Navigation
- Hover states
- Focus states
- Accessibility
- DevTools
- CSS debugging

## Day 6 Status

**Completed ✅**