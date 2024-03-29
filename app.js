

  
var Id = ""

// this is function which is fetching the api for displaying the random image on the screen 
async function Random (){
    try {
        let data = await fetch (`https://www.themealdb.com/api/json/v1/1/random.php`)
        const response = await data.json();
        imge.src=response.meals[0].strMealThumb;
        sagar.innerText=response.meals[0].strMeal;
        Id = response.meals[0].idMeal;
        console.log(Id)
        Popup(Id)
    }
    catch(error){
        console.log(error)
    }
}
Random()
const imge = document.getElementById("imge")
const sagar = document.getElementById("sagar")
const CardContainer = document.getElementById("card-container")
 

var  MaterialDiv = document.getElementById("ingredients") 
var removeIMG = document.getElementById("remove-png")

// this event listener i used to  take an action on clicking on the random image to show ingredients page 
imge.addEventListener("click",(c)=>{
   MaterialDiv.style.display="block"
   
})
 
//  this i used to remove the ingredients page by clicking on icon
removeIMG.addEventListener("click",(c)=>{
    MaterialDiv.style.display="none"
})

// here i fetch the api for the search result which is searched in the search bar 
async function  GetSearchItem (SearchItem){
    try {
        let data = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${SearchItem}`)
        const response = await data.json();
        console.log(response.meals)

        CardContainer.innerHTML="";



        response.meals.forEach(element => {
            let dish = ""
            dish+= ` <div  class="card" >
            <img src="${element.strMealThumb}" alt="">
            <h2> ${element.strMeal}</h2>
    
        </div>`
        CardContainer.innerHTML+=dish;
        });

    }
    catch(error){
        console.log(error)
    }
}



const SearchResult = document.getElementById("search")

// here i give the eventlistner to take action after search on clicking enter button 
SearchResult.addEventListener("keypress",(e)=>{
 if(e.key=="Enter"){
    console.log(SearchResult.value) 
    window.scroll({top:800 , behavior:"smooth"})
    GetSearchItem(SearchResult.value)
    SearchResult.value=""
 }

})




const materials= document.getElementById("ingredients-list")

//  here this function i used to show ingredients by fetching api 
async function  Popup(ingredients){
    try {
        let data = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ingredients}`)
        const response = await data.json();
        console.log(response.meals)

        materials.innerHTML="";

        
        let items = ""
        for(i=1;i<=20;i++){

            if(response.meals[0][`strIngredient${i}`] !== ""){

                
                console.log(response.meals[0][`strIngredient${i}`])
                let a = response.meals[0][`strIngredient${i}`]
                items += `<li>${a}</li>`
                
            }
                materials.innerHTML=items;
        }
        


    }
    catch(error){
        console.log(error)
    }
}

