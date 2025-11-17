```js
let items = document.querySelectorAll("[id^='column-item-video-container']");
let result = [];

items.forEach((el) => {
    try {
        let link = el.querySelector("a")?.href || "";
        let img = el.querySelector("img")?.src || "";
        let title = el.querySelector("img")?.alt || "";
        let views =
            el.querySelector("[data-e2e='video-views']")?.innerText || "";

        result.push({
            link,
            img,
            title,
            views,
        });
    } catch (e) {}
});

// Copy result as JSON
copy(result);
console.log("Copied! Paste anywhere (Notepad) → احفظ الملف .json");
```
