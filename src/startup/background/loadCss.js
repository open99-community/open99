import css from "../boot.css"

//we want \n, not actual newlines
const finalCss = css.replaceAll("\n", "\\n")
//@TODO THIS DOESNT WORK, FIX IT OR JUST ADD STYLE TAG IN HEAD IN HTML

export function loadCss() {
    document.head.appendChild(document.createElement("style")).innerText = finalCss
}