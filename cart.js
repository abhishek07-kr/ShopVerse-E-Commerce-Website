// import {cart} from "./app.js";
// console.log(cartadfs);
// import { cart } from "./app";
// console.log(ca);


(() => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (cart.length === 0) {
                document.getElementById("cartBox").innerHTML = "<h4>No items in cart</h4>";
                return;
            }

            let html = "";

            cart.forEach(item => {
                html += `
                    <div style="border:1px solid #ddd; padding:10px; margin:10px 0; display: flex;">
                        <img src="${item.image}" width="80">
                        <h4>${item.title}</h4>
                        <p class="p-5">Price: $${item.price}</p>
                    </div>
                `;
            });

            document.getElementById("cartBox").innerHTML = html;
        })();