window.addEventListener("keydown",(e) => {
  try {
    if (e.ctrlKey && e.key.toLowerCase() === "y") {
      e.preventDefault();
      console.log("ctrl+k clicked");
    }
  } catch (err) {
    console.log("an error encountered!");
  }
});

