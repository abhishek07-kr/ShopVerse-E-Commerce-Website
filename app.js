const productsMain=document.querySelector(".products-main");
const categories = document.querySelectorAll(".product-categories a")
//console.log(categories);
//console.log(productsMain);
productsMain.innerHTML="<h1>Loading....</h1>";
(async ()=>{
    let api_data=await(await fetch("https://fakestoreapi.com/products")).json()
    console.log(api_data);
    
    let output="";
    for(const product of api_data){
        //console.log(product);
        let {id, title, price, description, category, image, rating}=product
        output += `<div class="col-3">
        <div class="card">
                       <img src="${image}" class="card-img-top" alt="${title}" onclick="openDetails(${id})" style="cursor: pointer;">
                          <div class="card-body">
                            <p class="card-title">$${title}</p>
                             <p class="card-title">$${price}</p>
                             <button class="btn btn-primary cart-btn" onclick="addToCart(${id})">Cart</button>

                        
                        </div>
                   </div>
                   </div>`
    }

    //All Products category
    categories[0].addEventListener("click", () => {
      window.navigation.reload()
    })
    //this is to display all category data in the ui
    productsMain.innerHTML=output;

    //filtering products based on categories
    categories.forEach(option=>{
      option.onclick=(e)=>{
        e.preventDefault()
        let selected_category=(e.target.innerText).toLowerCase();
        let filteredProducts = "";

    for(const product of api_data){
      let{image,title,category} = product
      if(selected_category === category){
        filteredProducts += `
        <div class="col-3">
        <div class="card">
                       <img src="${image}"  class="card-img-top" alt="${title}">
                          <div class="card-body">
                            <p class="card-title">${title}</p>
                            <p class="card-title">$${price}</p>
                         <a href="#" class="btn btn-primary">Cart</a>
                        </div>
                   </div>
                   </div>`
      }
    }
      productsMain.innerHTML = filteredProducts
    
      }
      //search products
let search = document.getElementById("search-products")
search.addEventListener("submit", (e) => {
  e.preventDefault()
  let searchedProduct = e.target.search.value
  let searchFilter = ""
  for(const product of api_data){
    let {title, image, price } = product
    if(title.toLowerCase().includes(searchedProduct.toLowerCase().trim())){
      searchFilter +=
      `<div class="col-3">
        <div class="card">
                       <img src="${image}"  class="card-img-top" alt="${title}">
                          <div class="card-body">
                            <p class="card-title">${title}</p>
                            <p class="card-title">$${price}</p>
                         <a href="#" class="btn btn-primary">Cart</a>
                        </div>
                   </div>
                   </div>`
    }
  }
  productsMain.innerHTML=searchFilter || "<h3> No product found</h3>";
})
    })
    
    // categories.forEach(option =>{
    //           option.onclick = (e) =>{
    //             let selected_category = e.target.innerText.toLowerCase();
    //             //console.log(selected_category );
    //             for (const product of api_data){
    //                 let{category} = api_data;
    //                 if(selected_category === category){
    //                     //console.log(product);
    //                     filteredProducts += product
    //                 }
    //             }
                


    //           }
    // })

    

})()

//cart
let cart = []
async function addToCart(id){
  let api_data=await (await fetch("https://fakestoreapi.com/products")).json()
  for (const product of api_data){
    if(product.id == id){ 
      cart.push(product)
    }
  }
  console.log(cart);
}

//Products Details
function openDetails(id) {
    // Save ID in localStorage
    localStorage.setItem("product_id", id);
    // Go to details page
    window.location.href = "product-details.html";
}