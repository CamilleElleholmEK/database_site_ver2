const productId = new URLSearchParams(window.location.search).get("prut");
const endpoint = `https://kea-alt-del.dk/t7/api/products/${productId}`;

const container = document.querySelector(".detail_container");

function getData() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showData);
}

function showData(json) {
  console.log(json);
  let discountPercent = `${json.discount}`;
  let price = `${json.price}`;
  let priceDivided = price / 100;
  let discount = priceDivided * discountPercent;
  let priceAfter = price - discount;
  container.innerHTML = `<a class="back" href="productlist.html?category=${json.category}">Tilbage</a>
  <div class="detail_view">
  <div class="img_wrap wrap">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/1000/${json.id}.webp"
            alt="${json.productdisplayname}"
          />
          <p class="hide">Udsolgt</p>
          <p class="sale">
            ${json.discount}
            <span>%</span>
          </p>
        </div>
        <div class="details">
          <p class="subtle">
            ${json.articletype}
            <span> | </span>
            ${json.brandname}
          </p>
          <h3>${json.productdisplayname}</h3>
          <div class="price">
            <p class="price_before">
              DKK
              <span>${json.price}</span>
              ,-
            </p>
            <p class="price_after">
              DKK
              <span>${Math.round(priceAfter)}</span>
              ,-
            </p>
          </div>
          <div class="to_cart">
            <p class="btn">Add to Cart</p>
            <p class="stock">
              In stock:
              <span>4</span>
            </p>
          </div>
        </div>
        </div>`;
}

getData();
