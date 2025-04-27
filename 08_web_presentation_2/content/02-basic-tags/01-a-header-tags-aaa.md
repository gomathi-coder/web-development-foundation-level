# Learning HTML Headings and Paragraphs

Hello young learners! Today, we are going to learn about some important HTML tags: **heading tags (h1 to h6)**, **paragraph tag (p)**, and the **strong tag**. These tags help make web pages organized and easy to read.

---

## What are Heading Tags? (h1 to h6)

Headings are like chapter titles and subtitles in a book. They tell us what each section is about.

- `<h1>` is the **biggest and most important** heading.
- `<h2>` to `<h6>` are smaller headings used for sub-sections.
- As the number gets bigger, the size of the heading gets smaller.

#### Examples of Headings and Paragraphs

```html
<h1>This is Heading 1</h1>
<p>This paragraph is under Heading 1.</p>

<h2>This is Heading 2</h2>
<p>This paragraph is under Heading 2.</p>
```

#### Code Output
:::codeoutput
<h1>This is Heading 1</h1>
<p>This paragraph is under Heading 1.</p>

<h2>This is Heading 2</h2>
<p>This paragraph is under Heading 2.</p>
:::

:::tip
Use headings to break your web page into parts so visitors can easily understand the content.
:::

---

## Paragraph Tag `<p>`

A paragraph is a group of sentences about one topic. On web pages, paragraphs are wrapped inside `<p>` tags.

Example:

```html
<p>This is a sentence inside a paragraph tag.</p>
```

---

## The `<strong>` Tag - Making Text Strong!

The `<strong>` tag makes words **bold** to show they are important.

Example:

```html
<p>This is a <strong>very important</strong> sentence!</p>
```

---

## Full Example You Can Try!

```html
<!DOCTYPE html>
<html>
<head>
  <title>HTML Headings and Paragraphs Example</title>  
</head>
<body>
  <div>
    <h1>Heading Level 1 (h1)</h1>
    <p>This is a paragraph below an <strong>h1</strong> heading. It's typically used as the main title of a page.</p>

    <h2>Heading Level 2 (h2)</h2>
    <p>This is a paragraph below an <strong>h2</strong> heading. It's used for major sections of content.</p>

    <h3>Heading Level 3 (h3)</h3>
    <p>This is a paragraph under <strong>h3</strong>. Use it for sub-sections inside h2 sections.</p>

    <h4>Heading Level 4 (h4)</h4>
    <p>This level is usually used for smaller subsections or detailed content divisions.</p>

    <h5>Heading Level 5 (h5)</h5>
    <p>This is not used often, but it's great for extra detail levels.</p>

    <h6>Heading Level 6 (h6)</h6>
    <p>This is the smallest heading level and typically used only for fine structure inside deeply nested content.</p>
  </div>
</body>
</html>
```

---

## Quick Notes

:::note
- Headings go from `<h1>` (largest) to `<h6>` (smallest).
- Paragraphs are written inside `<p>`.
- Use `<strong>` to make text bold and important.
:::

---

## Quiz Time!

:::quiz
[q]Which tag is used for the **largest** heading?[/q]
[c]<h3>[/c]
[c]<h6>[/c]
[c]<h1>[a][/c]
:::

:::quiz
[q]What tag is used to add a paragraph?[/q]
[c]<div>[/c]
[c]<p>[a][/c]
[c]<strong>[/c]
:::

:::quiz
[q]How do you make text **bold** in HTML?[/q]
[c]Use the <bold> tag[/c]
[c]Use the <bigger> tag[/c]
[c]Use the <strong> tag[a][/c]
:::

---

## Teachers Note

:::teachersnote
Make sure students practice writing HTML with different heading levels and paragraphs. Encourage them to use the `<strong>` tag to highlight words in their paragraphs.
:::

---

## Practice Assessment

:::practice
Write an HTML page with:
- An `<h1>` heading that is the title of your favorite book.
- A paragraph explaining why you like the book.
- Use `<strong>` to highlight the book's name inside the paragraph.
- Add at least two smaller heading levels (`<h2>` and `<h3>`) to add sections about your favorite characters and plot summary.
:::

---

Have fun creating your very own web pages! 🎉
