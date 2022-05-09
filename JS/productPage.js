import dogFood from "../data/dog-food.json" assert { type: "json" };
import catFood from "../data/cat-food.json" assert { type: "json" };
import allFood from "../data/all-food.json" assert { type: "json" };

const productPageElement = document.querySelector(".product-page");
const productElement = productPageElement.querySelector(".product");

window.handleClickProduct = (idProduct) => {
  localStorage.setItem("productID", idProduct);
};

const formatPrice = (price) => new Intl.NumberFormat().format(price);

const renderProductWithCategories = (e) => {
  const data = {
    DOG: dogFood,
    CAT: catFood,
  };

  const titleProductElement = productElement.querySelector(".product__title");
  titleProductElement.innerHTML = `<h4>${e?.target?.innerText}</h4>`;

  const productListElement = productElement.querySelector(
    ".product__list-item"
  );
  productListElement.innerHTML = data[e?.target?.id]
    ?.map(
      (item, index) => `
                <a
                  href='./productDetail.html?id=${item?.id}'
                  class="item col-lg-4 col-md-4 col-sm-6 col-xs-6"
                  onclick="return handleClickProduct(${item?.id})"
                >
                    <div class="item-image">
                        <img src=${item?.img} alt="item-${index}">
                    </div>
                    <div class="item-info">
                        <p class="name">${item?.title}</p>
                        <p class="price">${formatPrice(item?.price)}đ</p>
                    </div>
                </a>
            `
    )
    .join("");
};

//set default product is all product
if (productElement) {
  const titleProductElement = productElement.querySelector(".product__title");
  titleProductElement.innerHTML = "<h4>Tất cả sản phẩm</h4>";

  const productListElement = productElement.querySelector(
    ".product__list-item"
  );

  const listProduct = allFood?.slice(0, 24);
  productListElement.innerHTML = listProduct
    ?.map(
      (item, index) => `
            <a
              href='./productDetail.html?id=${item?.id}'
              class="item col-lg-4 col-md-4 col-sm-6 col-xs-6"
              onclick="return handleClickProduct(${item?.id})"
            >
                <div class="item-image">
                    <img src=${item?.img} alt="item-${index}">
                </div>
                <div class="item-info">
                    <p class="name">${item?.title}</p>
                    <p class="price">${formatPrice(item?.price)}đ</p>
                </div>
            </a>
        `
    )
    .join("");
}

const listItemSidebarElement =
  productPageElement.querySelectorAll(".list-item");
if (listItemSidebarElement) {
  listItemSidebarElement?.forEach((item) =>
    item.addEventListener("click", renderProductWithCategories)
  );
}
