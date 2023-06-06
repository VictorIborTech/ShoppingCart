let basket = JSON.parse(localStorage.getItem("products")) || [];


// Calculate Total item
let calculation = () =>{
    let cartIcon = document.getElementById("cart_amount");
    cartIcon.innerHTML=basket.map((x) => x.item).reduce((x,y) => x + y, 0);
    

    
}
calculation();


let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping_cart");




function generateCartItems(){
    if (basket.length !== 0){
        return shoppingCart.innerHTML = basket.map((x) => {
            let{id ,item} = x;
            let search = shopData.find((y) => y.id === id)         
            return `
            <div class="cart_item">
                <img src="${search.img}" alt="" width="120">
                <div class="details">
                    <div class="title_price_x">
                        <h4 class="title_price">
                            <p class="cart_name">${search.name}</p>
                            <p class="cart_price">$ ${search.price}</p>
                        </h4>
                        <i onclick= "removeItem(${id})" class="fa fa-times" aria-hidden="true"></i>
        
                    </div>
                    <div class="button">
                            <i class="fa fa-minus" id="decreasebtn" onclick="decreaseCount(${id})"></i>
                            <span class="quantity" id=${id}>${item}</span>
                            <i class="fa fa-plus" id="increasebtn" onclick="increaseCount(${id})"></i>
                    </div>

                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>`
        }).join("");
    }
    else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h3>Cart Is Empty</h3>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>`;
    }
}
generateCartItems()



function increaseCount(id){
    //  let selectedItem = id;
     let search = basket.find((item) => item.id === id);

     if (search === undefined){
         basket.push({
             id: id,
             item: 1,
         });
     }
     else{
        search.item += 1;
     }

     
    //  console.log(basket);
    update(id);

    generateCartItems();

    //Local Storage
    localStorage.setItem("products", JSON.stringify(basket))
}
function decreaseCount(id){
    let search = basket.find((item) => item.id === id);



    if (search == undefined){
        return;
    }
    else if (search.item === 0){
        return;
    }
    else{
       search.item -= 1;
    }



    
    update(id)

    basket = basket.filter((x) => x.item !== 0);

    generateCartItems();

    //Local Storage
    localStorage.setItem("products", JSON.stringify(basket));

}
function update(id){
    let search = basket.find((item) => item.id === id);
    console.log(search.item)
    document.getElementById(id).innerHTML= search.item;

    calculation();
    totalAmount();
   
}


let removeItem= (id) => {
    basket= basket.filter((x) => x.id !== id); 

    generateCartItems();
    totalAmount();
    calculation();

    localStorage.setItem("products", JSON.stringify(basket))

}

let clearCart = () =>{
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("products", JSON.stringify(basket))

    
}

let totalAmount = () =>{
    if(basket.length !==0){
        let Amount = basket.map((x) =>{
            let{id, item} = x; 
            let search = shopData.find((y) => y.id === id) || [];
            
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        
        label.innerHTML= `<h1>Total Bill: $ ${Amount}</h1>
        <div class="cart_btn">
            <button class= "checkout">Checkout</button>
            <button onclick="clearCart()" class= "removeall">Clear Cart</button>
        </div>`
        
    }
    
} 
totalAmount();