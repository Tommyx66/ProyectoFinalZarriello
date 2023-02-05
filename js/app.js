const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");
let textoAlerta;  //CAMBIO

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const alertAgregarProducto = (texto) => {   //CAMBIO
  Toastify({

    text: texto,

    duration: 3000,

    style: {
      color: "black",
      background: "rgba(236, 229, 229, 0.993)",
      fontSize: "1.5rem"
    },

    offset: {
      x: 80,
      y: 25
    },
  }).showToast();
}

fetch("./js/api.json")   //CAMBIOS
  .then((response) => response.json())
  .then((data) => {
    showProducts(data);
  })

const showProducts = (data) => {   //CAMBIOS
  data.forEach((product) => {

    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
          <img src="${product.thumbnailUrl}">
          <h5>${product.title}</h5>
          <p>$${product.price}</p>`;

    shopContent.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

      if (repeat) {
        textoAlerta = "Sumaste otra cantidad al carrito";   //CAMBIO

        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
            alertAgregarProducto(textoAlerta);    //CAMBIO
          }
        });
      } else {
        textoAlerta = "Producto agregado al carrito";   //CAMBIO

        carrito.push({
          id: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
          cantidad: product.cantidad,
        });
        carritoCounter();
        saveLocal();
        alertAgregarProducto(textoAlerta);  //CAMBIO
      }

    })
  }
  )
}


//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//get item

JSON.parse(localStorage.getItem("carrito"));


