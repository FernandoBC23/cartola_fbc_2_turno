// scripts/transicoes.js

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
  
    document.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", function (e) {
        const url = this.href;
  
        if (this.target === "_blank" || url.startsWith("http")) return;
  
        e.preventDefault();
        document.body.classList.remove("loaded");
  
        setTimeout(() => {
          window.location.href = url;
        }, 250);
      });
    });
  });
  