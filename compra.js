document.addEventListener('DOMContentLoaded', () => {

let datos = [
    {
    id: 1,
    nombre: 'Televisol 42',
    precio: 215000,
    imagen: "./img/tv42.jpg",
    },
    {
    id: 2,
    nombre: 'Televisol 52',
    precio: 315000,
    imagen: "./img/tv52.png",
    },
    {
    id: 3,
    nombre: 'Televisol 62',
    precio: 450000,
    imagen: "./img/tv62.png",
    }
];

    let carrito = [];
    let DomCarrito = document.querySelector('#cuerpoTabla');
    let DomVaciar = document.querySelector('#botonBorrar');
    let miLocalStorage = window.localStorage;



function renderizarProductos(){

    datos.forEach((info) => {

    let estructura = document.createElement('div');
    document.querySelector(".televisores").append(estructura);
    
    let nodoCuerpo = document.createElement('div');
    estructura.append(nodoCuerpo);
    
    let nodoTitulo = document.createElement('h3');
    nodoTitulo.textContent = info.nombre;
    estructura.append(nodoTitulo);

    let nodoImagen = document.createElement('img');
    nodoImagen.src = info.imagen
    estructura.append(nodoImagen);

    let nodoPrecio = document.createElement('span');
    nodoPrecio.textContent = info.precio;
    estructura.append(nodoPrecio);

    let nodoBoton = document.createElement('button');
    nodoBoton.textContent = 'Agregar';
    nodoBoton.setAttribute('marcador', info.id);
    nodoBoton.addEventListener('click', agregarProducto);
    estructura.append(nodoBoton);
    
    });
}

function agregarProducto (evento) {

    carrito.push(evento.target.getAttribute('marcador'))

    renderizarCarrito();

    guardarCarrito();

}

function renderizarCarrito(){

    const carritoSinDuplicar = [...new Set(carrito)];
    carritoSinDuplicar.forEach((item) => {

        const miItem = datos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);

        });

        const numeroUnidades = carrito.reduce((total, itemId) => {

            return itemId === item ? total +=1 : total;
        }, 0);

        let miNodo = document.createElement ('tr');
        miNodo.classList.add('.cuerpoTabla');
        miNodo.innerHTML =   `<td>${miItem[0].nombre}</td>
                              <td>${numeroUnidades}</td> 
                              <td>${miItem[0].precio}</td>`;
        
        DomCarrito.appendChild(miNodo);
    });
}

function guardarCarrito () {

    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito () {

    if (miLocalStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

function vaciarCarrito (){

    carrito = [];

    renderizarCarrito();
}

//DomVaciar.addEventListener('click', vaciarCarrito);

cargarCarrito();
renderizarProductos();
renderizarCarrito();

});

















