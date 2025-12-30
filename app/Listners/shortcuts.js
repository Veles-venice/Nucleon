window.addEventListener("keydown",(e) => {
  try {
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
      e.preventDefault();
      console.log("ctrl+k clicked");
    }
  } catch (err) {
    console.log("an error encountered!");
  }
});
