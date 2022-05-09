import dogFood from "../data/dog-food.json" assert { type: "json" };
import catFood from "../data/cat-food.json" assert { type: "json" };
import newFood from "../data/new-product.json" assert { type: "json" };
import bestSale from "../data/best-selling.json" assert { type: "json" };

//set default cart-item
if (!localStorage.getItem("cart-item"))
  localStorage.setItem("cart-item", JSON.stringify([0]));

// Load data from json to html
const newProductElement = document.querySelector(".new-products");
const bestSellingElement = document.querySelector(".best-selling");
const dogFoodElement = document.querySelector(".dog-food");
const catFoodElement = document.querySelector(".cat-food");

window.handleClickProduct = (idProduct) => {
  localStorage.setItem("productID", idProduct);
};

const formatPrice = (price) => new Intl.NumberFormat().format(price);

const mapData = (element, data) => {
  const _data = data?.slice(0, 4);

  element.querySelector(".list__items").innerHTML = _data
    ?.map(
      (i) =>
        `
    <a
      href='./html/productDetail.html?id=${i?.id}'
      class="col-md-3 col-sp col-xs-12 col-sm-6 item"
      onclick="return handleClickProduct(${i?.id})"
    >
        <div class="item-image">
            <img src=${i.img} alt="img">
        </div>
        <div class="item-info">
            <p class="name">${i.title}</p>
            <p class="price">${formatPrice(i.price)}đ</p>
        </div>
    </a>
    `
    )
    ?.join("");
};

mapData(newProductElement, newFood);
mapData(bestSellingElement, bestSale);
mapData(dogFoodElement, dogFood);
mapData(catFoodElement, catFood);
