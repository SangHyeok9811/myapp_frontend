// 검색 기능
(() => {
  const searchQuery = document.querySelector(".search-bar > input");
  const searchBtn = document.querySelector(".search-bar > button");

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentQuery = searchQuery.value;
    console.log(searchQuery.value);
    window.location.href = `search-result.html?q=${encodeURIComponent(
      currentQuery
    )}`;
  });

  searchQuery.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key.toLocaleLowerCase() === "enter") {
      currentQuery = searchQuery.value;
      window.location.href = `search.html?q=${encodeURIComponent(
        currentQuery
      )}`;
    }
  });
})();
