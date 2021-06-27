let textArea = document.createElement("textarea");
textArea.setAttribute("id", "stickerLinks");
textArea.setAttribute("style", "border-radius: 5px;border: 3px double #CCCCCC;font-size: 15px;outline: none;resize: none;width: 100%;height: 100vh;");
textArea.value = Array.from(document.querySelectorAll(".FnStickerPreviewItem")).map((ele) => JSON.parse(ele.getAttribute("data-preview")).staticUrl).join("\n");
document.getElementsByClassName("mdCMN09ImgList")[0].appendChild(textArea);