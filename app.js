let shop = document.getElementById('shop');

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
      .map((item) => {
        let {id,name,price,desc,img} = item;
        let search = basket.find((x) => x.id === id ) || []
        return `<div class="item" id=product-id-${id}>
            <img width="220" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i class="bi bi-dash-lg" onclick="decrement(document.getElementById(${id}))"></i>
                        <div id=${id} class="quantity">
                          ${search.item === undefined? 0: search.item}
                        </div>
                        <i class="bi bi-plus-lg" onclick='increment(document.getElementById(${id}))'></i>
                    </div>
                </div>
            </div>
        </div>`;
      }).join(""));
}

let basket = JSON.parse(localStorage.getItem('data')) || [];

generateShop();

let increment = (id) => {
    let selectedItem = id;

    let search = basket.find((item) => {
        return item.id === selectedItem.id;
    })

    if(search === undefined)
    {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    }
    else{
        search.item += 1; 
    }

    localStorage.setItem('data',JSON.stringify(basket));

    update(selectedItem.id);
};

let decrement = (id) => {
    let selectedItem = id;

    let search = basket.find((item) => {
      return item.id === selectedItem.id;
    });

    if(search === undefined) return;
    else if (search.item === 0) {
      return
    } else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((item) => {
      return item.id === id;
    });
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
  let sum = 0;
  basket.map((x) => {
    sum += x.item;
  })
  document.getElementById("cartAmount").innerHTML = sum;
}

calculation();