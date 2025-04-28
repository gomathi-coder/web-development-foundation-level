# Learn About Colors 🌈  

:::comment
This needs to be added with more example and some correction is required
:::

---

## Part 1: Colors Basics

### What are Colors?  
Colors are what we see when light reflects off objects and enters our eyes. Colors make everything around us look bright and interesting!

- When light hits an object, some colors are absorbed and others are reflected.  
- The color that is reflected is the color we see.

### Primary Colors  
There are **three main (primary) colors**:
- **Red**
- **Green**
- **Blue**

These colors can be mixed to make many other colors. This is called the **RGB** color model. It’s mostly used in screens like TVs and computers.

### Secondary Colors  
When you mix two primary colors, you get **secondary colors**:
- Red + Green = **Yellow**  
- Green + Blue = **Cyan**  
- Blue + Red = **Magenta**

### Why Colors Matter in Computers and Websites  
Colors on websites are written using special codes. This helps computers show exact colors no matter where we visit from.

---

### How Colors are Written on the Web

#### 1. Color Names  
You can write colors by their name:  
```html
<p style="color:red;">This text is red!</p>
```

#### 2. Hex Color Codes  
Colors can be written in hex code—these start with `#` followed by 6 letters or numbers.  
Example:  
- `#FF0000` = Red  
- `#00FF00` = Green  
- `#0000FF` = Blue  

Each pair of characters shows how much **red, green**, and **blue** the color has.

##### Breaking Down Hex:  
- `FF` means the highest.  
- `00` means none at all.

So, `#FF0000` means *full red*, no green, no blue.

#### 3. RGB Values  
Colors can also be written like this:  
```css
rgb(255, 0, 0)
```
That means 255 red, 0 green, 0 blue — which is red! The numbers go from 0 (none) to 255 (full).

---

### Using Colors in Web Design: Text, Background, and Borders  

Colors make websites beautiful by coloring:
- **Text Color** — the color of the letters  
- **Background Color** — the space behind the text or other elements  
- **Border Color** — the line around boxes or images

#### Example of Using Colors in HTML:

```html
<div style="color: white; background-color: #4A90E2; border: 2px solid #003366; padding: 10px;">
  This is a cool blue box with white text and a dark blue border.
</div>
```

---

### Elegant Color Combinations

Here are some color combinations that look nice and easy on the eyes:

| Text Color       | Background Color | Border Color   | Description                |
|------------------|------------------|----------------|----------------------------|
| White `#FFFFFF`  | Navy Blue `#2C3E50`| Light Blue `#2980B9` | Elegant, modern look        |
| Dark Gray `#333333` | Light Gray `#ECF0F1` | Gray `#BDC3C7` | Soft and professional       |
| Black `#000000`  | Peach `#FFDAB9`   | Dark Orange `#FF8C00` | Warm and friendly           |
| White `#FFFFFF`  | Forest Green `#228B22` | Light Green `#90EE90` | Fresh and natural vibe      |

---

### Example Code of Elegant Color Box

```html
<div style="
  color: #FFFFFF; 
  background-color: #2C3E50; 
  border: 3px solid #2980B9; 
  padding: 15px; 
  font-family: Arial, sans-serif;
  width: 300px;
  margin: 10px auto;
  border-radius: 8px;
  text-align: center;
">
  Elegant Navy Blue Box with White Text
</div>
```

---

### Visual Preview (imaginary for learners)

![Elegant Navy Blue Box Example](https://dummyimage.com/300x100/2c3e50/ffffff&text=Elegant+Box)  
*White text on navy blue background with blue border*

---

### Try It Yourself!

Change the colors in the example below and see what beautiful combinations you can make:

```html
<div style="
  color: #000000; 
  background-color: #FFDAB9; 
  border: 2px solid #FF8C00; 
  padding: 12px;
  width: 300px;
  margin: 10px auto;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
">
  Warm Peach Box with Black Text and Orange Border
</div>
```

---

:::tip  
When picking colors for text and background, always check if the text color is easy to read. Light text on dark background or dark text on light background works best!  
:::

---