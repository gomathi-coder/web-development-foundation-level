# Images in HTML Pages

Images make web pages colorful and interesting! In this lesson, we'll learn how to put pictures on web pages using **HTML** — the language that builds websites.

---

## What is an Image in an HTML Page?

An **image** is a picture or a graphic shown on a webpage. Websites use images to make everything more fun and easy to understand.

To add an image to a web page, we use the **`<img>` tag**.

---

## The `<img>` Tag: Show Pictures in Your Page

The `<img>` tag is special because:

- It **does not have a closing tag**.  
- It needs information about the **image file** you want to show.

### How to Use `<img>`?

Here’s a simple example:

```html
<img src="./5_test.jpeg" alt="Sample Image" width="300" height="200">
```

### Explanation:

| Attribute  | Meaning                                |
|------------|---------------------------------------|
| `src`      | Where the image file is located       |
| `alt`      | Text shown if image doesn’t load      |
| `width`    | Width of the image in pixels           |
| `height`   | Height of the image in pixels          |

---

## Example HTML Page with Image

Here is a full simple HTML file which shows an image:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Image Tag Example</title>
</head>
<body>

  <img src="./5_test.jpeg" alt="Sample Image" width="300" height="200">

</body>
</html>
```

---

## Why Use the `alt` Attribute?

- Helps **visually impaired** people understand the image using screen readers.
- Shows text if the image file can’t load on the page.

:::tip  
Always write a good description in the `alt` attribute!  
:::

---

## Size of Images

- You can control image size using `width` and `height`.
- If you don’t specify, the image shows in its **original size**.
- Always keep width and height to stop the page from jumping when the image loads.

---

## Different Ways to Use Images

### 1. Using Local Images

If your picture is saved in the same folder as your HTML file, use:

```html
<img src="picture.jpg" alt="My Picture">
```

### 2. Using Images from the Internet (URLs)

You can also use pictures from other websites:

```html
<img src="https://example.com/image.png" alt="Web Image">
```

---

## Practice: Add an Image to Your Page

Try this at home or in school:

1. Find a small picture and save it in the same folder as your HTML file.
2. Add this code inside your `<body>`:

```html
<img src="your-image-file.jpg" alt="Description of your image" width="400">
```

3. Open your HTML file in a browser to see your image show up!

---

## Quick Note on Image File Types

Here are common file types for images on the web:

| File Type | Use                         |
|-----------|-----------------------------|
| `.jpg`    | Photos, real pictures         |
| `.png`    | Pictures with transparency   |
| `.gif`    | Animated images or simple graphics |

---

## Can You Add Images with Links?

Yes! You can make an image clickable like this:

```html
<a href="https://www.google.com">
  <img src="google-logo.png" alt="Google Logo" width="100">
</a>
```

Clicking the image sends you to a website!

---

## Warning: Using Very Big Images

:::warning  
Big images can **slow down** your websites and use a lot of internet data. Always use small images or compress them before adding.  
:::

---

## Teachers Note

:::teachersnote  
To help students understand images even better, show them how to change `width` and `height` and observe the changes. Let them experiment with different images and URLs.  
Involve them with group activities to create simple web pages with pictures.  
:::

---

## [Quiz Time!]

:::quiz
[q]Which HTML tag is used to add an image to a web page?[/q]
[c]<picture>[/c]
[c]<img>[a][/c]
[c]<image>[/c]
[c]<photo>[/c]
:::

:::quiz
[q]What does the `alt` attribute in the `<img>` tag do?[/q]
[c]Specifies the size of the image[/c]
[c]Provides a description if the image fails to load[a][/c]
[c]Changes the image format[/c]
[c]Sets the color of the image[/c]
:::

:::quiz
[q]How do you make an image on your web page clickable, linking it to another website?[/q]
[c]Wrap the `<img>` inside an `<a>` tag[a][/c]
[c]Add `href` inside the `<img>` tag[/c]
[c]Use the `<link>` tag[/c]
[c]Put the image inside a `<button>` tag[/c]
:::

---

## Summary

- Use the **`<img>` tag** to add pictures on a web page.
- Use `src` to set the image location.
- Use `alt` to describe the image.
- You can control image size with `width` and `height`.
- Use local images or online image URLs.
- You can make images clickable by using links!

Happy coding and have fun with images on your web pages! 🎨😊

---

**Do you want to practice more?**

:::practice  
Create your own HTML page with at least 2 images: one from your computer and one from the internet. Experiment with sizes and alt descriptions!  
:::

---

# The End!