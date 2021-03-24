"use strict";

let recipes = [];

function addRecipe(event) {
    const title = document.getElementById("recipe_name").value;
    const description = document.getElementById("recipe_description").value;

    let index = 0;
    while(recipes[index] != null) {
        index++
    }

    const recipe = {
        title: title,
        description: description,
        id: index   
    };

    recipes.push(recipe);
    localStorage.recipes = JSON.stringify(recipes);


    window.location.assign('./index.html')
}

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.length > 0) {
        recipes = JSON.parse(localStorage.recipes)
    }
    document.getElementById("add_recipe_button").onclick = addRecipe;
})