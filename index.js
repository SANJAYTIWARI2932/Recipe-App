const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipecloseButton=document.querySelector('.recipe-close-btn');

//function to get recipes
const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML="<h2>fetching Recipes...</h2>";
    try{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const respose=await data.json();

    //using forloop
    // for (let i = 0; i < respose.meals.length; i++) {
    //     const meal = respose.meals[i];
    //     console.log(meal);
    // }

    //using forEach loop
    recipeContainer.innerHTML="";
    respose.meals.forEach(meal=>{
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> category</p>
        
        `
        const button=document.createElement('button');
        button.textContent="view recipe";
        recipeDiv.appendChild(button);

        // adding EventListener to recipe button
        button.addEventListener('click',(e)=>{
            openRecipePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv);
    });
    }catch(error){
        recipeContainer.innerHTML="<h2>Error in fetching Recipes...</h2>";
    }
    
}

//function to fetch ingredients and measurements
const fetchIngredient=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredients=meal[`strIngredient${i}`];
        if(ingredients){
            const measure=meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measure} ${ingredients}</li>`
        }else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML=`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="ingredientList">${fetchIngredient(meal)}</ul>
        <div>
            <h3>Instructions:</h3>
            <p class="recipeInstruction">${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
}

recipecloseButton.addEventListener('click',(e)=>{
    recipeDetailsContent.parentElement.style.display='none';
})


searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});

