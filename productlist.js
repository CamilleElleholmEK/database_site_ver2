const urlcategory = new URLSearchParams(window.location.search).get("category");

const container = document.querySelector(".list_grid");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${urlcategory}&limit=30`;
document.querySelector("h2").textContent = urlcategory;

document
  .querySelectorAll("#filter button")
  .forEach((knap) => knap.addEventListener("click", filter));

document
  .querySelectorAll("#sort button")
  .forEach((knap) => knap.addEventListener("click", sorter));

let allData;
let udsnit;

function sorter(e) {
  if (e.target.dataset.price) {
    if (e.target.dataset.price == "asc") {
      udsnit.sort((a, b) => a.price - b.price);
    } else {
      udsnit.sort((a, b) => b.price - a.price);
    }
  } else {
    if (e.target.dataset.text == "az") {
      udsnit.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      udsnit.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }
  showData(udsnit);
}

function getData() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then((data) => {
      allData = udsnit = data;
      showData(allData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;
  if (valgt == "All") {
    udsnit = allData;
  } else {
    udsnit = allData.filter((element) => element.gender == valgt);
  }
  showData(udsnit);
}

function showData(json) {
  let markup = "";
  json.forEach((product) => {
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
