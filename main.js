let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let delete_all = document.querySelector('.delete_all');
let temp;
let mod ='create';
let search_mod = 'title';


// window.localStorage.clear();

//------------------------clear_inputs-----------------------------------
function clear_inputs()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    ads.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    fun_total();
}

//-------------------------total-----------------------------------------------
function fun_total()
{
    if(price.value)
    {
        total.innerHTML = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.style.background = 'green';
    }else{
        total.innerHTML ='';
        total.style.background = 'red';
    }
    
}
//--------------------------create_product-----------------------------------------
let products;
if(window.localStorage.products != null)
{
    products = JSON.parse(window.localStorage.products);
}else
{
    products = [];
}

create.onclick = function()
{
 let pro = {
    title : title.value,
    price : price.value,
    taxes : taxes.value,
    ads : ads.value,
    discount : discount.value,
    total : total.innerHTML,
    category : category.value,
 }
 if(count.value < 100 && price.value != '' && category.value !='')
 {
    if(mod == 'create')
 {
    if(count.value > 1)
    {
       for(let i = 0;i<count.value;i++)
       {
           products.push(pro);
       }
    }else{
       products.push(pro);
    }
 }
 else
 {
   products[temp] = pro;  
   mod = 'create';
    count.style.display = 'block';
    search.style.display = 'block';
    create.innerHTML = 'create';
    create.style.marginBottom = '0px';
 }
 clear_inputs();
 }
 
 window.localStorage.products = JSON.stringify(products);
//  console.log(products);
 show_data();
 delete_all_btn();



}

//--------------------------show_product-----------------------------------------

function show_data()
{
    let table = '';
    for(let i=0;i<products.length;i++)
    {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="update_product(${i})">update</button></td>
        <td><button onclick="delete_product(${i})">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
}

show_data();

//--------------------------delete_product-----------------------------------------

function delete_product(value)
{
   products.splice(value,1);
   window.localStorage.products = JSON.stringify(products);
   show_data();

}

//--------------------------update_product-----------------------------------------

function update_product(value)
{
    mod = 'update';
    count.style.display = 'none';
    search.style.display = 'none';
    create.innerHTML = 'update';
    title.value = products[value].title;
    price.value = products[value].price;
    taxes.value = products[value].taxes;
    discount.value = products[value].discount;
    ads.value = products[value].ads;
    fun_total();
    category.value = products[value].category;
    create.style.marginBottom = '10px';
    temp = value;
    scroll({
        top:0,
        behavior:"smooth"
    })

}

//--------------------------get_seacrh_mod-----------------------------------------
function get_search_mod(id)
{
    let search = document.querySelector("#search");
    search.value = '';
    if(id == "search_title")
    {
        search.placeholder = 'Search By Title';
        search_mod = 'title';
    }else{
        search.placeholder = 'Search By Category';
        search_mod = 'category';
    }
    search.focus();
    show_data();
}

//--------------------------search_product-----------------------------------------
function search_product(value)
{
    let table = "";
    for (let i = 0; i < products.length; i++) {
      if (search_mod == "title") {
        if (products[i].title.includes(value)) {
          table += `
    <tr>
    <td>${i + 1}</td>
    <td>${products[i].title}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].ads}</td>
    <td>${products[i].discount}</td>
    <td>${products[i].total}</td>
    <td>${products[i].category}</td>
    <td><button onclick="update_product(${i})">update</button></td>
    <td><button onclick="delete_product(${i})">delete</button></td>
    </tr>
    `;
        }
      }else{
        if (products[i].category.includes(value)) {
            table += `
      <tr>
      <td>${i + 1}</td>
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td>
      <td>${products[i].discount}</td>
      <td>${products[i].total}</td>
      <td>${products[i].category}</td>
      <td><button onclick="update_product(${i})">update</button></td>
      <td><button onclick="delete_product(${i})">delete</button></td>
      </tr>
      `;
          }
      }
    }

    document.getElementById("tbody").innerHTML = table;
    search.onblur = ()=>{
        search.value = '';
        show_data();
    }
   
}

//--------------------------delete_all-----------------------------------------
function delete_all_btn()
{
    if(products.length >0)
    {
        delete_all.innerHTML =`<button onclick="deleteAll()">Delete All (${products.length})</button>`;
    
    }else{
        delete_all.innerHTML = '';   
    }
}


function deleteAll()
{
    products = [];
    window.localStorage.clear();
    show_data();
    delete_all.innerHTML = ''; 

}
