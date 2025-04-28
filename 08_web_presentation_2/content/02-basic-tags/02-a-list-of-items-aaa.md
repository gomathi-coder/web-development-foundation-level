# Understanding Lists in HTML: Ordered and Unordered

When you want to show information in a list on a webpage, you can use two types of lists:

## 1. Unordered List (`<ul>`)

- This list just shows **bullet points** (little dots).
- Use this when the order **doesn't matter**, like a shopping list or names.

```
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>React</li>
</ul>
```

This looks like:

- HTML  
- CSS  
- JavaScript  
- React  

:::tip  
Think of an unordered list like a bag of your favorite candies — you just want to list them, and the order doesn’t matter!  
:::

---

## 2. Ordered List (`<ol>`)

- This list shows **numbers**.
- Use this when the order **does matter**, like steps in a recipe or instructions.

```
<ol>
  <li>Open Visual Studio Code</li>
  <li>Write your HTML code</li>
  <li>Save the file</li>
  <li>Open in browser</li>
</ol>
```

This looks like:

1. Open Visual Studio Code  
2. Write your HTML code  
3. Save the file  
4. Open in browser  

:::tip  
Use an ordered list when you want to tell someone the exact order to do things — like steps in baking a cake!  
:::

---

## Quick Tip

- `<ul>` = **Unordered List** (bullets)  
- `<ol>` = **Ordered List** (numbers)  
- `<li>` = **List Item** (each thing in the list)


:::note  
Remember: The tags `<ul>` and `<ol>` create the list container, and `<li>` tags add each item to the list.  
:::

---

## Practice Time!

:::practice
Try creating a list of your own favorites! It could be your favorite sports, books, or even steps to make your favorite snack.
:::

---

## Teachers Note

:::teachersnote  
Encourage students to differentiate between when to use ordered versus unordered lists by giving them real-life examples like shopping lists (unordered) and instructions or recipes (ordered).  
Use live coding sessions for better understanding.  
:::

---

## Quiz

:::quiz
[q]Which HTML tag is used to create a bullet list?[/q]
[c]<ul>[a][/c]
[c]<ol>[/c]
[c]<li>[/c]
:::

:::quiz
[q]Which HTML tag shows numbers automatically for list items?[/q]
[c]<ul>[/c]
[c]<ol>[a][/c]
[c]<li>[/c]
:::

:::quiz
[q]What tag is used to add each item inside a list?[/q]
[c]<li>[a][/c]
[c]<ul>[/c]
[c]<ol>[/c]
:::