# Console Genius

Stop wasting time copying console errors, opening new tabs, and searching Stack Overflow. **Console Genius** is a Chrome extension that brings the solution directly to you.

It automatically fetches the top-voted answer and solution "gist" from Stack Overflow and displays it *directly below the error* in your DevTools console.

---

## Features

* **Fully Automatic:** No clicking, no searching. It triggers automatically when you log an error.
* **Smart Solutions:** Fetches the most relevant, top-voted answer from the Stack Exchange API.
* **Solution Gist:** Shows a "gist" or excerpt of the actual solution, so you don't even have to click the link.
* **Clean UI:** The solution is neatly collapsed inside a `console.group`, keeping your console clean.
* **Direct Link:** Always provides a direct source link to the Stack Overflow question so you can verify the answer.

---

## Installation (from GitHub)

Since this extension is not on the Chrome Web Store, you can install it for free in 30 seconds:

1.  **Download:** Go to the [**Releases Page**](https://github.com/aarav-shukla07/console_genius/releases/tag/v1.0) (Replace this link with your repo's releases page) and download the latest `.zip` file.
2.  **Unzip:** Unzip the file. You will have a folder (e.g., `console-genius-v1.0`).
3.  **Open Extensions Page:** Open Chrome and navigate to `chrome://extensions`.
4.  **Enable Developer Mode:** In the top-right corner, turn on the **"Developer mode"** toggle.

    

5.  **Load the Extension:** Click the **"Load unpacked"** button that appeared.

    

6.  **Select Folder:** Select the unzipped `console-genius-v1.0` folder you just downloaded.
7.  **Done!** The "Console Genius" card will appear. The extension is now active!

---

## How to Use

1.  Go to any website (like your own project, Wikipedia, etc.).
2.  **Reload the page** (this is important after installing).
3.  Open the Developer Console (F12 or Ctrl+Shift+I).
4.  When you or a script logs an error with `console.error()`, the solution will appear right below it.

### Try it yourself!

Paste these common errors into your console and press Enter to see it work:

```javascript
// The classic "undefined" error
console.error("Uncaught TypeError: Cannot read properties of undefined (reading 'map')")

// The classic "null" error
console.error("TypeError: 'null' is not an object")

// A promise rejection
console.error("Uncaught (in promise) Error: Request failed with status code 404")
```
---

## How It Works (The "Magic")
This extension is built to be lightweight and effective.

- ```content.js```: This script is loaded onto every page. Its only job is to inject the injector.js file into the page's "main world." This is necessary to interact with the page's console.

- ```injector.js```: 
1. This is the core logic.

2. It safely overwrites the window.console.error function, keeping a copy of the original.

3. When you call ```console.error()```, it lets the original red error print, then it...

4. Takes the error message and calls the Stack Exchange /search/excerpts API.

5. It cleans the HTML and text from the API response.

6. It uses ```console.groupCollapsed()``` to print the beautiful, styled, and collapsed solution (with the gist and source link) right into your console.

---