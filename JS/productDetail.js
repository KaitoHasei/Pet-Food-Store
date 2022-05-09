import allData from "../data/all-food.json" assert { type: "json" };

const productID = localStorage?.getItem("productID");
const infomationProduct = allData?.find((item) => item?.id === +productID);

const productInfoElement = document.querySelector(".product-info");

window.addItemToCart = (itemId) => {
  const _cartItems = JSON.parse(localStorage?.getItem("cart-item"));

  localStorage.setItem("cart-item", JSON.stringify([..._cartItems, itemId]));
  showSuccessToast();
  return;
};

// Toast function
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                        <div class="toast__icon">
                            <i class="${icon}"></i>
                        </div>
                        <div class="toast__body">
                            <h3 class="toast__title">${title}</h3>
                            <p class="toast__msg">${message}</p>
                        </div>
                        <div class="toast__close">
                            <i class="fas fa-times"></i>
                        </div>
                    `;
    main.appendChild(toast);
  }
}

function showSuccessToast() {
  toast({
    title: "Thành công!",
    message: "Đã thêm sản phẩm vào giỏ hàng.",
    type: "success",
    duration: 2000,
  });
}

function showErrorToast() {
  toast({
    title: "Thất bại!",
    message: "Đã có sản phẩm trong giỏ hàng!",
    type: "error",
    duration: 2000,
  });
}

const formatPrice = (price) => new Intl.NumberFormat().format(price);

if (productInfoElement) {
  productInfoElement.innerHTML = `
    <div class="product-info__image">
        <img src=${infomationProduct?.img} alt="">
    </div>
    <div class="product-info__content">
        <div class="product-name">
            <h1>${infomationProduct?.title}</h1>
        </div>
        <div class="product-price">
            <span>${formatPrice(infomationProduct?.price)}đ</span>
        </div>
        <div class="product-description">
            <p>
                Xương cho chó VEGEBONES là loại xương thưởng nổi tiếng với hương vị đặc biệt thơm 
                ngon và chức năng vượt trội với 3 loại để bạn thoả sức lựa chọn.
            </p>
        </div>
        <div class="product-buy">
            <button
                class="btn btn--primary add-cart"
                style="margin-right: 10px;"
                onclick="return addItemToCart(${
                  infomationProduct?.id
                })">Thêm vào giỏ hàng</button>
            <button class="btn btn--primary">Mua hàng</button>
        </div>
    </div>
    `;
}
