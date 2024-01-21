
// add id element
let title = document.getElementById('title')
let price = document.getElementById('price')
let texes = document.getElementById('texes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mood = 'create'
let tmp;
//*



//get total
function gettotal()
{
     if(price.value != '')
     {
      let result = (+price.value + +texes.value + +ads.value)-discount.value
      total.innerHTML = result
      total.style.background = 'red'
     }else{
      total.innerHTML = ''
      total.style.background = '#1b9bee'
     }
}





//create project
let nwepro;
if(localStorage.name != null)
{
 nwepro = JSON.parse(localStorage.name)
}else{
  nwepro = [];
}
submit.onclick = function()
{
  let datapro = {
    title:title.value.toLowerCase(),
    price:price.value,
    texes:texes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  }
  if(mood === 'create')
  {
  if(datapro.count > 1)
  {
    for(let i = 0 ; i < datapro.count ; i++){
      nwepro.push(datapro)
    }
  }else{
    nwepro.push(datapro)
  }
  }else{
    nwepro[ tmp ]= datapro;
    mood = 'create'
    submit.innerHTML = 'create'
    count.style.display = 'block'
  }
  
  
  localStorage.setItem('name', JSON.stringify(nwepro))
  //save loclstoreg
  shwodata()
  cleardata()
}




//clear inputs
function cleardata()
{
  title.value = ''
  price.value = ''
  texes.value = ''
  ads.value = ''
  discount.value = ''
  count.value = ''
  category.value = ''
}




// read
function shwodata()
{
  let table = '';
  for(let i = 0 ; i < nwepro.length ; i++){
    table +=`
    <tr>
          <td>${i}</td>
          <td>${nwepro[i].title}</td>
          <td>${nwepro[i].price}</td>
          <td>${nwepro[i].texes}</td>
          <td>${nwepro[i].ads}</td>
          <td>${nwepro[i].discount}</td>
          <td>${nwepro[i].total}</td>
          <td>${nwepro[i].category}</td>
          <td><button onclick = "updatedata(${i})" id="update">update</button></td>
          <td><button onclick = "deletedata(${i})" id="deleted">deleted</button></td>
    </tr>
    ` 
  }
   document.getElementById('tbody').innerHTML = table;
   let btndata = document.getElementById('deleteall')
   if(nwepro.length > 0){
    btndata.innerHTML = `
    <button onclick = "deleteall()">deleteall (${nwepro.length})</button>
    `
   }else{
    btndata.innerHTML  = ''
   }
}
shwodata()



//!delete
function deletedata(i)
{
  nwepro.splice(i,1)
  shwodata()
}



//! deleteall
function deleteall(){
  localStorage.clear()
  nwepro.splice(0)
  shwodata()
}



//* update
function updatedata(i){
  title.value = nwepro[i].title;
  price.value = nwepro[i].price;
  texes.value = nwepro[i].texes;
  ads.value = nwepro[i].ads;
  discount.value = nwepro[i].discount;
  category.value = nwepro[i].category;
  gettotal();
  count.style.display = 'none'
  submit.innerHTML = 'update'
  mood = 'update'
  tmp = i ;
  scroll({
    top:0,
    behavior:"smooth"
   })
}





