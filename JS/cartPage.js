import allFood from "../data/all-food.json" assert { type: "json" };

let id = (id) => document.getElementById(id);

const formatPrice = (price) => new Intl.NumberFormat().format(price);

const findOccurrences = (arr = []) => {
  const res = [];
  arr.forEach((el) => {
    const index = res.findIndex((obj) => {
      return obj["id"] === el;
    });
    if (index === -1) {
      res.push({
        id: el,
        count: 1,
      });
    } else {
      res[index]["count"]++;
    }
  });
  return res;
};

const cartProducts = id("cart-products");

const renderProduct = () => {
  const cartItem = findOccurrences(
    JSON.parse(localStorage.getItem("cart-item"))
  );

  const findProduct = (idx) => allFood.find((e) => e.id === idx);
  const sumTotal = cartItem.reduce(
    (prev, curr) => prev + findProduct(curr?.id)?.price * curr?.count,
    0
  );

  cartProducts.innerHTML =
    cartItem
      .map(
        (e) =>
          `
                <li class="mb-2">
                    <div class="cart-product">
                        <div class="cart-product__img-wrapper">
                            <img src="${findProduct(e.id)?.img}" alt="">
                        </div>
                        <div class="cart-product__content">
                            <div class="cart-product__name">
                                ${findProduct(e.id)?.title}
                            </div>
                            <div class="cart-product__price">Đơn giá: ${formatPrice(
                              findProduct(e.id)?.price
                            )}đ</div>
                            <div class="cart-product__quantity">Số lượng: ${
                              e.count
                            }</div>
                        </div>
                    </div>
                </li>
                `
      )
      .join("") +
    `
            <li
                class="list-group-item d-flex justify-content-between"
            >
                <span>Total (VND)</span>
                <strong>${formatPrice(sumTotal)}đ</strong>
            </li>
        `;
};

renderProduct();
