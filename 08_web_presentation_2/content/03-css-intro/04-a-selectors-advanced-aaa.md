# Part 2: CSS Selector Advanced

Now, let's explore **more interesting selectors**!

---

### 4. **Descendant Selector**

Selects elements inside another element.

```css
div span {
  font-weight: bold;
}
```

It means **all `<span>` elements inside `<div>`** become bold.

---

### 5. **Pseudo-class Selector**

Styles elements in a special state, for example when you hover with the mouse.

```css
button:hover {
  background-color: lightblue;
}
```

When you point to the button with your cursor, the background changes.

---

### 6. **Grouping Selector**

Apply the same style to many selectors at once.

```css
h1, h2, h3 {
  font-family: Arial, sans-serif;
}
```

All headings `<h1>`, `<h2>`, and `<h3>` will use Arial font.

---

### 7. **Universal Selector**

Applies styling to **every element** on the page.

```css
* {
  margin: 0;
  padding: 5px;
}
```

---

## Full Example Code

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Element Selector */
    p {
      color: blue;
    }

    /* Class Selector */
    .highlight {
      background-color: yellow;
      padding: 2px;
    }

    /* ID Selector */
    #main-title {
      font-size: 24px;
      color: darkgreen;
    }

    /* Descendant Selector */
    div span {
      font-weight: bold;
    }

    /* Pseudo-class Selector */
    button:hover {
      background-color: lightblue;
    }

    /* Grouping Selector */
    h1, h2, h3 {
      font-family: Arial, sans-serif;
    }

    /* Universal Selector */
    * {
      margin: 0;
      padding: 5px;
    }
  </style>
</head>
<body>

  <h1 id="main-title">CSS Selectors Examples</h1>

  <p>This paragraph is styled with element selector (blue).</p>
  <p>All paragraphs are affected.</p>

  <div class="highlight">This div has the highlight class.</div>
  <p class="highlight">This paragraph also has the highlight class.</p>

  <div id="special-box">This div has a special ID (but no styling).</div>

  <div>
    <span>This span inside a div is bold.</span>
  </div>
  <span>This span outside div is normal.</span>

  <button>Hover over me!</button>

  <h2>Heading 2 with grouped style</h2>
  <h3>Heading 3 with same grouped style</h3>

</body>
</html>
```

---

### Tip

:::tip  
Try changing colors or fonts in the CSS to see how things happen live in your browser!  
:::

---

### Teachers Note

:::teachersnote  
Use this lesson with small projects for learners. Ask kids to change colors or add new classes and observe effects.  
:::

---

## Quick Quiz Time!

:::quiz
[q]Which selector styles all `<p>` elements on the page?[/q]
[c]#p[/c]
[c].p[/c]
[c]p[a][/c]
[c]*[/c]
:::

:::quiz
[q]How do you select elements with the class `highlight`?[/q]
[c]highlight[/c]
[c].highlight[a][/c]
[c]#highlight[/c]
[c]*highlight[/c]
:::

:::quiz
[q]Which selector styles an element only when a mouse is over it?[/q]
[c]Pseudo-class selector like :hover[a][/c]
[c]Class selector like .hover[/c]
[c]ID selector like #hover[/c]
[c]Element selector like hover[/c]
:::

---

## Summary

- Use **element selectors** to pick tags like `p` or `h1`.
- Use **class selectors** with a dot `.` for reusable styles.
- **ID selectors** with a hash `#` are for unique elements.
- **Descendant selectors** pick elements inside others.
- **Pseudo-classes** style elements in special states (hover, active).
- **Grouping selectors** combine many selectors.
- Universal selector `*` styles all.

---

You're now ready to make your webpages colorful and fun with CSS selectors! 🎉

---

# Practice Time!  

Write CSS to:

- Change all `<h2>` headings to red.
- Make only elements with class `.highlight` have bold text.
- Style the button so when hovered it turns green.

---

Happy Coding! 🚀