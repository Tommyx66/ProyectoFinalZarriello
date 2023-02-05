const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>`;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerHTML = '<h1 class="x-button">x</h1>';
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
                                    <img src="${product.thumbnailUrl}">
                                    <h4>${product.title}</h4>
                                    <h4 class="pe-5">$${product.price}</h4>
                                    <span class="restar"> - </span>
                                    <h4 class="text-center">Cantidad: ${product.cantidad}</h4>
                                    <span class="sumar"> + </span>
                                    <h4 class="text-end">Total: $${product.cantidad * product.price}</h4>
                                    <span class="delete-product"> X </span> 
                                    `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", () => {
            if(product.cantidad !== 1) {
                product.cantidad--;
                pintarCarrito();
                saveLocal();
            }
        });

        let sumar = carritoContent.querySelector(".sumar")

        sumar.addEventListener("click", () => {
                product.cantidad++;
                pintarCarrito();
                saveLocal();
        });


        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", () =>{
            eliminarProducto(product.id);
        })


    });

    const total = carrito.reduce((acc, el) => acc + el.price * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `<h3 class="text-white">Total a pagar: $${total}</h3>`;
    modalContainer.append(totalBuying);
};

const renderCartButton = () => {
    let output = `<button type="button" class="btn btn-cart position-relative text-light">
                    <img src="img/logo/logoCart.png" alt="Cart">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-light">${totalCart()}</span>
                  </button>`;
    document.getElementById("cart_button").innerHTML = output;
  }
  
verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

 
};
carritoCounter();
