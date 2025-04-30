# Responsive Design: Making Websites Look Good on All Devices

---

## What is Responsive Design?

Responsive Design is a way of making websites that look **good** and **work well** on all devices—like computers, tablets, and phones.

:::note
If a website is responsive, you don't have to zoom in or scroll sideways on your phone just to read something!
:::

---

## Why is Responsive Design Important?

- People use different devices with different screen sizes.
- A good website should be easy to use, no matter the device.

![Website On Devices](../images/devices.png)

---

## Key Concepts of Responsive Design

### 1. **Flexible Layouts**

- Use **percentages** instead of fixed pixel sizes so your website can shrink or grow.

```css
.container {
  width: 80%; /* uses 80% of the available space */
}
```

:::quiz
[q]Why do we use percentages instead of fixed pixels for responsive layouts?[/q]
[c]Because percentages allow layouts to adjust to different screen sizes[a][/c]
[c]Because percentages look prettier[/c]
[c]Because browsers require it[/c]
:::

---

### 2. **Media Queries**

A media query checks the size of the screen and changes the website’s design to fit.

```css
@media (max-width: 600px) {
  .container {
    background-color: lightblue;
  }
}
```

:::codeoutput
If you open this site on a screen less than 600 pixels wide, the background will turn light blue!
:::

:::quiz
[q]What do media queries do in responsive design?[/q]
[c]Create images[/c]
[c]Check device size and change styles for different screens[a][/c]
[c]Make websites run faster[/c]
:::

---

### 3. **Flexible Images**

Images should also resize to fit the device.

```css
img {
  max-width: 100%;
  height: auto;
}
```

:::tip
This makes sure the images never stretch outside their containers!
:::

---

### 4. **Mobile-First Design**

Start designing for small screens, then make the site look better for bigger screens.

:::teachersnote
Encourage students to preview their sites on mobile devices first. This helps to ensure the most important content is always easy to find!
:::

---

### 5. **Viewport Meta Tag**

Add this line in your HTML so browsers know how to scale your webpage on different devices:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### Example: Responsive Layout

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .container {
      width: 80%;
      margin: auto;
      background: #eee;
      padding: 20px;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    @media (max-width: 600px) {
      .container {
        width: 98%;
        background: #cde;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Responsive Design!</h1>
    <img src="../images/web-example.png" alt="Web Example">
    <p>This page looks great on any device!</p>
  </div>
</body>
</html>
```

---

:::practice
**Try it!**

1. Change the width value in the `.container` to `50%`. What happens on different screen sizes?
2. Edit the background color in the media query and see what changes when you resize the window.
:::

---

## Potential Issues

:::warning
- Not all browsers support the same CSS features.
- Test your site on many devices!
:::

---

## Summary Table

| Concept             | What it Means                           | Example                         |
|---------------------|-----------------------------------------|---------------------------------|
| Flexible Layouts    | Use `%` instead of fixed `px`           | `width: 80%;`                   |
| Media Queries       | Change styles for different screen size | see CSS with `@media`           |
| Flexible Images     | Images shrink/grow as needed            | `max-width: 100%;`              |
| Mobile-First Design | Design for mobile, scale up             | Write CSS for small screens first|
| Viewport Tag        | Helps scaling on devices                | HTML meta tag                   |

---

:::quiz
[q]Which tag should you add to your HTML to help browsers scale your website for devices?[/q]
[c]<img>[/c]
[c]<meta name="viewport" content="width=device-width, initial-scale=1.0">[a][/c]
[c]<script>[/c]
[c]<div>[/c]
:::

---

## Test Yourself!

:::quiz
[q]Responsive design helps websites:[/q]
[c]Work only on big screens[/c]
[c]Work well on all device sizes[a][/c]
[c]Become faster for computers only[/c]
:::

---

# Conclusion

- Responsive Design helps your website look **awesome** everywhere!
- Remember: **flexible layouts**, **media queries**, and **mobile-first thinking** are key.

---

:::tip
Try resizing your browser window while viewing websites. Notice how some look better than others? That’s responsive design in action!
:::

---

**Happy coding and keep testing on all your devices!**