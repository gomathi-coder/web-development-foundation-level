# Understanding Fonts:

Fonts are all around us! When you read a book, a website, or even a comic strip, different letters can look different. This is because of **fonts**. Today, we'll explore fonts in a simple and interesting way.

---

### What is a Font?

A **font** is a style or design of letters, numbers, and symbols. Just like your handwriting is unique, fonts give text a particular look or mood.

#### Examples of fonts you might know:
- Comic Sans (fun and playful)
- Arial (simple and clear)
- Times New Roman (classic and formal)

---

### How to Use Fonts in Computer Code (HTML & CSS)

Let's learn how to change fonts on a website using HTML and CSS!

##### Step 1: Pick a font!

##### Step 2: Use CSS to tell the computer which font to use.

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            font-family: "Arial", sans-serif;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <p>This is a paragraph with Arial font.</p>
</body>
</html>
```

#### What does this mean?
- `font-family`: This command changes the font.
- `"Arial", sans-serif`: Means use Arial, or if it's not available, use any simple sans-serif font.
- `font-size`: How big the letters are.

---

### CSS Font Properties Explained with Examples

Here are some important **font-related CSS properties** you need to know, with fun examples!

#### 1. font-family

Sets the font style for the text.

```html
<p style="font-family: 'Courier New', monospace;">
  This text uses the Courier New font.
</p>
```

---

#### 2. font-size

Changes the size of the text.

```html
<p style="font-size: 30px;">
  This text is 30 pixels big!
</p>
```

---

#### 3. font-weight

Makes text bold or lighter.

```html
<p style="font-weight: bold;">
  This is bold text.
</p>

<p style="font-weight: 100;">
  This is very light text.
</p>
```

---

#### 4. font-style

Makes text italic, normal, or oblique.

```html
<p style="font-style: italic;">
  This text is italic.
</p>
```

---

#### 5. font-variant

Changes text to small capitals.

```html
<p style="font-variant: small-caps;">
  these are small capital letters.
</p>
```

---

#### 6. font

A shorthand property to set *font-style*, *font-variant*, *font-weight*, *font-size*, *line-height*, and *font-family* all at once.

```html
<p style="font: italic small-caps bold 20px/30px 'Times New Roman', serif;">
  This text uses font shorthand!
</p>
```

---

#### 7. letter-spacing

Controls the space between letters.

```html
<p style="letter-spacing: 5px;">
  Letters are spaced out!
</p>
```

---

#### 8. word-spacing

Controls the space between words.

```html
<p style="word-spacing: 20px;">
  More space between words.
</p>
```

---

#### 9. line-height

Controls space between lines of text.

```html
<p style="line-height: 2;">
  This paragraph has double space between lines.<br>
  See? It's easier to read!
</p>
```

---

#### Practice Assessment:

Try changing the font of this paragraph to **Georgia** and make it **italic** and **bold** using inline CSS.

```html
<p style="">I am practicing fonts!</p>
```

Hint: Use `font-family`, `font-style`, and `font-weight`.

---

### Quick Note on Font Families

The `font-family` lets you list fonts in order of preference:

```css
font-family: "Comic Sans MS", cursive, sans-serif;
```

This means:
- If "Comic Sans MS" is available, use it.
- Else use a cursive font.
- Else use a simple sans-serif font.

---

### Extra Fun: Google Fonts

You can use free fonts from **Google Fonts**! Visit [https://fonts.google.com/](https://fonts.google.com/) and select cool fonts to use on websites.

Example to add a Google Font:

```html
<head>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
        }
    </style>
</head>
```

---

### Tip

Always pick fonts that are easy to read for long texts, like in books or articles. Fun fonts are cool for titles or posters but not for paragraphs!

---

### Teachers Note

When teaching fonts, use examples from daily life — books, video games, websites, advertisements — so students can relate. Let students try changing fonts in simple HTML/CSS editors online to see results right away!

---

### Quick Quiz Time! 

:::quiz
[q]What type of font has small lines at the ends of letters?[/q]
[c]Sans-serif[/c]
[c]Script[/c]
[c]Serif[a][/c]
[c]Monospace[/c]
:::

:::quiz
[q]Which CSS property changes the thickness of the font?[/q]
[c]font-style[/c]
[c]font-weight[a][/c]
[c]font-family[/c]
[c]line-height[/c]
:::

:::quiz
[q]What font family is mostly used for coding because every letter takes the same space?[/q]
[c]Serif[/c]
[c]Monospace[a][/c]
[c]Script[/c]
[c]Display[/c]
:::

---

### Types of Fonts

1. **Serif Fonts**  
   These have small lines or decorations at the ends of letters.  
   - Example: Times New Roman, Georgia  
   - Looks classic and formal.

2. **Sans-serif Fonts**  
   These fonts do NOT have the little lines at the ends.  
   - Example: Arial, Helvetica, Verdana  
   - Look simple and modern.

3. **Monospace Fonts**  
   Every letter takes up the same amount of space.  
   - Example: Courier New, Consolas  
   - Used in coding and typing.

4. **Script Fonts**  
   Look like handwriting or calligraphy.  
   - Example: Brush Script, Pacifico  
   - Fun and decorative.

5. **Display Fonts**  
   Very decorative and used for big titles or posters.

---

Happy learning and have fun experimenting with fonts! 😊

![Fonts Example](https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Liberation_Serif_sample.svg/320px-Liberation_Serif_sample.svg.png)