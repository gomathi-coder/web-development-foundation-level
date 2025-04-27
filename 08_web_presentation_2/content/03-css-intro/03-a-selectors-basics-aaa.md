# Learn CSS Selectors

Welcome! Today, we will learn about **CSS Selectors** in a simple and fun way. CSS helps us style webpages — like changing colors, fonts, and more.

---

## What are CSS Selectors?

CSS Selectors tell the browser **which HTML elements** to style. Imagine you want to color only your titles or make some words bold. Selectors help you pick those parts.

---

# Part 1: CSS Selector Basics

Let's look at some simple selectors with examples!

---

### 1. **Element Selector**

Selects all elements of a certain type.

```css
p {
  color: blue;
}
```

This makes **all paragraphs `<p>`** blue.

---

### 2. **Class Selector**

Selects elements with a specific class name.

```css
.highlight {
  background-color: yellow;
  padding: 2px;
}
```

Use this if your element has `class="highlight"`.

---

### 3. **ID Selector**

Selects one unique element with an ID.

```css
#main-title {
  font-size: 24px;
  color: darkgreen;
}
```

Only the element with `id="main-title"` gets this style.

---

## Code Example for Basics

```html
<p>This paragraph is blue.</p>
<div class="highlight">This div is highlighted yellow.</div>
<h1 id="main-title">This is a main heading in dark green.</h1>
```

---

## 👩‍🏫 Step-by-step for Beginners

1. **Element selector**: pick the element name like `p` or `h1` directly.
2. **Class selector**: use a dot `.` before the class name like `.highlight`.
3. **ID selector**: use a hash `#` before the id name like `#main-title`.

---

### Quick Note

:::note  
Class names can be used on many elements, but an ID can be used only once per page!  
:::

---

### Practice Assessment

:::practice  
Style all `<p>` elements to have red text using element selector.  
:::

---