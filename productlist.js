const urlcategory = new URLSearchParams(window.location.search).get("category");

const container = document.querySelector(".list_grid");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${urlcategory}`;
document.querySelector("h2").textContent = urlcategory;
function getData() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showData);
}

function showData(json) {
  let markup = "";
  json.forEach((product) => {
    console.log(product);
    markup += `<a href="product.html">
          <article class="product_card">
            <div class="img_wrap">
              <img
                class="soldout"
                src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
                alt="Produkt billede"
              />
              <p class="soldout_text">Udsolgt</p>
              <p class="sale soldout">
                ${product.discount}
                <span>%</span>
              </p>
            </div>
            <p class="subtle">
              ${product.articletype}
              <span> | </span>
              ${product.brandname}
            </p>
            <h3>${product.productdisplayname}</h3>
            <div class="price">
              <p class="price_before">
                DKK
                <span>${product.price}</span>
                ,-
              </p>
              <p class="price_after">
                DKK
                <span>405</span>
                ,-
              </p>
            </div>
          </article>
        </a>`;
  });
  container.innerHTML = markup;
}

getData();
