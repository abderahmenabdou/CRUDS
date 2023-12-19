const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const totale = document.getElementById("totale");
const count = document.getElementById("count");
const category = document.getElementById("category");
const deleted = document.querySelector(".delete");
const creat = document.getElementById("creat");
const search = document.getElementById("search");

let change = "creat";

// Get Totale

function getTotale (){
    if(price.value < 0 || taxes.value < 0 || ads.value < 0 || discount.value < 0){
        alert("You must enter a positive number")
    }else if(price.value != "" && taxes.value != "" && ads.value != ""){
        const result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    
        totale.innerHTML = result;
        totale.style.backgroundColor = "green"
    }else if(price.value != ""){
        const result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    
        totale.innerHTML = result;
        totale.style.backgroundColor = "green"
    }else{
        totale.innerHTML = "";
        totale.style.backgroundColor = "brown"
    }
}

// Creat Data

let arrayData;
// Check In Local Storage
if(window.localStorage.getItem("myProduct")){
    arrayData = JSON.parse(window.localStorage.getItem("myProduct"))
}else{
    arrayData = [];
}

function creatData(value){
    let product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        totale: totale.innerHTML,
        count: count.value,
        category: category.value,
    }

    if(title.value == ""){
        alert(`The field must be filled out Title`)
    }else if(price.value == ""){
        alert(`The field must be filled out Price`)
    }else if(category.value == ""){
        alert(`The field must be filled out category`)
    }else if(title.value != "" && price.value != "" && category.value != "" && product.count < 100){
        if(change === "creat"){
            if(product.count > 1){
                for(let i = 0; i < product.count; i++){
                    arrayData.push(product);
                }
            }else{
                    arrayData.push(product);
            }
        }else{
            arrayData[upData] = product;
            change = "creat";
            creat.innerHTML = "creat";
            count.style.display = "block"
        }
        clearData();
    }

    
    
    // Save Data In Local Storage
    window.localStorage.setItem("myProduct", JSON.stringify(arrayData));

    
    showData();
    getTotale();
}

// Clear Data
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    totale.innerHTML = "";
    count.value = "";
    category.value = "";
}

// Show Data
function showData(){
    let table ="";
    for(let i = 0; i < arrayData.length; i++){
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${arrayData[i].title}</td>
                <td>${arrayData[i].price}</td>
                <td>${arrayData[i].taxes}</td>
                <td>${arrayData[i].ads}</td>
                <td>${arrayData[i].discount}</td>
                <td>${arrayData[i].totale}</td>
                <td>${arrayData[i].category}</td>
                <td><button onclick = "updateData(${i})">update</button></td>
                <td><button onclick = "deleteData(${i})">delete</button></td>
            </tr>
        `
    }
    document.querySelector(".resultFinal table tbody").innerHTML = table;

    
    if(arrayData.length > 0){
        deleted.innerHTML = `<button onclick = "deleteAllData()">delete All (${arrayData.length})</button>`
    }else{
        deleted.innerHTML = ""
    }

}

showData();

// Delete Data
function deleteData(i){
    arrayData.splice(i,1);

    window.localStorage.setItem("myProduct", JSON.stringify(arrayData));

    showData()
}

// Delete All Data
function deleteAllData(){
    window.localStorage.clear();

    arrayData.splice(0);

    showData()
}


// Update Data
let upData;
function updateData(i){
    title.value = arrayData[i].title;
    price.value = arrayData[i].price;
    taxes.value = arrayData[i].taxes;
    ads.value = arrayData[i].ads;
    discount.value = arrayData[i].discount;
    getTotale();
    category.value = arrayData[i].category;

    count.style.display = "none";
    creat.innerHTML = "Update"

    change = "update";
    upData = i;

    scroll({
        top: 0,
        behavior: "smooth"
    })
    
}

// Search Data

// Focus Search
let searchMood = "title"
function searchInput(id){
    if(id === "searchTitle"){
        searchMood = "title";
        search.placeholder = "Search By Title"

    }else{
        searchMood ="category";
        search.placeholder = "Search By category"
    }
    search.focus()
}

// Search Data
function searchData(value){
    let table = "";
    if(searchMood === "title"){
        for(let i = 0; i < arrayData.length; i++){
            if(arrayData[i].title.includes(value)){
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${arrayData[i].title}</td>
                <td>${arrayData[i].price}</td>
                <td>${arrayData[i].taxes}</td>
                <td>${arrayData[i].ads}</td>
                <td>${arrayData[i].discount}</td>
                <td>${arrayData[i].totale}</td>
                <td>${arrayData[i].category}</td>
                <td><button onclick = "updateData(${i})">update</button></td>
                <td><button onclick = "deleteData(${i})">delete</button></td>
            </tr>
        `
            }
        }
    }else{
        for(let i = 0; i < arrayData.length; i++){
            if(arrayData[i].category.includes(value)){
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${arrayData[i].title}</td>
                <td>${arrayData[i].price}</td>
                <td>${arrayData[i].taxes}</td>
                <td>${arrayData[i].ads}</td>
                <td>${arrayData[i].discount}</td>
                <td>${arrayData[i].totale}</td>
                <td>${arrayData[i].category}</td>
                <td><button onclick = "updateData(${i})">update</button></td>
                <td><button onclick = "deleteData(${i})">delete</button></td>
            </tr>
        `
            }
        }
    }
    document.querySelector(".resultFinal table tbody").innerHTML = table;
}