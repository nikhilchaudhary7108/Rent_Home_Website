const heart = document.getElementById("heart");

    heart.addEventListener("click", function () {
      this.classList.toggle("active");
      this.textContent = this.classList.contains("active") ? "❤️" : "♡";
    });