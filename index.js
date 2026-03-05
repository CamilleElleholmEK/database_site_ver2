const endpoint = "https://kea-alt-del.dk/t7/api/categories";
const container = document.querySelector("#category_links");

function getData() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showData);
}

function showData(data) {
  console.log(data);
  data.forEach((category) => {
    container.innerHTML += `<div class="category_wrap"> <a class="category_card" href="productlist.html?category=${category.category}">${category.category}</a> </div>`;
  });
}
getData();
