let lable = document.getElementById('lable');
let shopingCart = document.getElementById("shoping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let sum = 0;
  basket.map((x) => {
    sum += x.item;
  });
  document.getElementById("cartAmount").innerHTML = sum;
};
calculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return (shopingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="cart-item">
                <img width='100' src=${search.img} />
                <div class="details">
                    <div class = "title-price-x">
                        <h4 class='title-price'>
                            <p>${search.name}</p> 
                            <p class="cart-item-price">$ ${search.price}</p> 
                        <h4>
                        <i onclick="removeItem(document.getElementById(${id}))" class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons">
                        <i class="bi bi-dash-lg" onclick="decrement(document.getElementById(${id}))"></i>
                        <div id=${id} class="quantity">
                          ${item}
                        </div>
                        <i class="bi bi-plus-lg" onclick='increment(document.getElementById(${id}))'></i>
                    </div>

                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>    
            `;
        }).join(''));
    }
    else{
        shopingCart.innerHTML = ``;
        lable.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home </button>
        </a>    
        `;
    }
}
generateCartItems()


let increment = (id) => {
  let selectedItem = id;

  let search = basket.find((item) => {
    return item.id === selectedItem.id;
  });

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((item) => {
    return item.id === selectedItem.id;
  });

  if (search === undefined) return;
  else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((item) => {
    return item.id === id;
  });
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    calculation();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
}


let TotalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {id,item} = x;
            let search = shopItemsData.find((y) => y.id == id) || [];
            return (search.price*item)
        })
        let sum = 0
        amount.map((x)=>{
            return sum+=x;
        })
        lable.innerHTML = `
        <h2>Total Bill: $ ${sum}</h2>
        <button class="removeAll" onclick="clearCart()">Clear Cart</button>
        `;
    }
    else return
}
TotalAmount();

let clearCart = () => {
    basket =[];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}