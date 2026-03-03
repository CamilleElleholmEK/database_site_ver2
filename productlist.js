const urlcategory = new URLSearchParams(window.location.search).get("category");

const container = document.querySelector(".list_grid");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${urlcategory}&limit=30`;
document.querySelector("h2").textContent = urlcategory;

document
  .querySelectorAll("button")
  .forEach((knap) => knap.addEventListener("click", filter));

let allData;

function getData() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then((data) => {
      allData = data;
      showData(allData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;
  if (valgt == "All") {
    showData(allData);
  } else {
    const udsnit = allData.filter((element) => element.gender == valgt);
    showData(udsnit);
  }
}

function showData(json) {
  console.log(json);
  let markup = "";
  json.forEach((product) => {
    console.log(product);
    let discountPercent = `${product.discount}`;
    let price = `${product.price}`;
    let priceDivided = price / 100;
    let discount = priceDivided * discountPercent;
    let priceAfter = price - discount;
    markup += `<a href="productdetails.html?prut=${product.id}">
          <article class="product_card">
            <div class="img_wrap">
              <img
                class="${product.soldout && "soldout"}"
                src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
                alt="Produkt billede"
              />
              ${product.soldout ? `<p class="soldout_text">Udsolgt</p>` : ""}
              ${
                product.discount
                  ? `<p class="sale ${product.soldout && "soldout"}">
                ${product.discount}
                <span>%</span>
              </p>`
                  : ""
              }
            </div>
            <p class="subtle">
              ${product.articletype}
              <span> | </span>
              ${product.brandname}
            </p>
            <h3>${product.productdisplayname}</h3>
            <div class="price">
              <p class="${product.discount && "price_before"}">
                DKK
                <span>${product.price}</span>
                ,-
              </p>
              ${
                product.discount
                  ? `<p class="price_after">
                DKK
                <span>${Math.round(priceAfter)}</span>
                ,-
              </p>`
                  : ""
              }
            </div>
          </article>
        </a>`;
  });
  container.innerHTML = markup;
}

getData();
