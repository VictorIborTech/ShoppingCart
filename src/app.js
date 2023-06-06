let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("products")) || [];

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


    // console.log(basket);
    update(id)

    basket = basket.filter((x) => x.item !== 0);


    //Local Storage
    localStorage.setItem("products", JSON.stringify(basket));

}
function update(id){
    let search = basket.find((item) => item.id === id);
    console.log(search.item)
    document.getElementById(id).innerHTML= search.item;

    calculation();
}


// Calculate Total item
let calculation = () =>{
    let cartIcon = document.getElementById("cart_amount");
    cartIcon.innerHTML=basket.map((x) => x.item).reduce((x,y) => x + y, 0);
}

calculation();


let getShop = () =>{
    return (shop.innerHTML = shopData.map((item) =>{

        let {id, name, price, desc, img} = item; //destructuring the map.
        // check for id and retain its number of item
        let search = basket.find((x) => x.id === id) || [];

        return `<div id="product_id_${id}" class="item">
                <img src="${img}" alt="" width="220">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price_quantity">
                        <span ><strong>$ ${price}</strong></span>
                        <div class="button">
                            <i class="fa fa-minus" id="decreasebtn" onclick="decreaseCount(${id})"></i>
                            <span class="quantity" id=${id}>${search.item === undefined ? 0 : search.item}</span>
                            <i class="fa fa-plus" id="increasebtn" onclick="increaseCount(${id})"></i>
                        </div>
                    </div>
                    
                </div>
            </div>`
    }).join(""));
}

getShop();





