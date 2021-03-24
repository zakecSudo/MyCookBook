"use strict";

let recipes = [];
let search = "";

function noRecipes() {
    let content = document.getElementById("content");
    let paragraph = document.createElement("p");
    paragraph.textContent = "You don't have any recipe's yet, add them with \"Add recipe\" in navigation bar!"
    paragraph.classList.add("no_recipe");
    content.appendChild(paragraph);
}

function searchRecipes(event) {
    recipes = JSON.parse(localStorage.recipes)
    document.getElementById("content").innerHTML = "";
    search = document.getElementById("search_bar").value.toUpperCase();
    for(let i = 0; i < recipes.length; i++) {
        if(recipes[i].title.toUpperCase().includes(search)) {
            domAddRecipe(recipes[i]);
        }
    }
}

function domRemoveRecipe(event) {
    let confirmPrompt = confirm("Are you sure you want to delete recipe " + event.srcElement.parentElement.getElementsByClassName("recipe_title")[0].innerText);
    if (confirmPrompt == true) {
        let index = parseInt(event.srcElement.parentElement.id);
        event.srcElement.parentElement.remove();
        recipes.splice(index, 1);
        for (let i = index; i < recipes.length; i++) {
            if (i < recipes.length) {
                recipes[i].id = i;
                document.getElementById(i + 1).id = i.toString();
            }

        }
        localStorage.recipes = JSON.stringify(recipes);
    }
}

function domAddRecipe(recipe) {
    let content = document.getElementById("content");

    let recipe_box = document.createElement("div");
    recipe_box.classList.add("recipe");

    recipe_box.id = recipe.id;

    let recipe_title = document.createElement("p");
    recipe_title.textContent = recipe.title;
    recipe_title.classList.add("recipe_title");

    let recipe_description = document.createElement("p");
    recipe_description.textContent = recipe.description;
    recipe_description.classList.add("recipe_description");

    let remove_button = document.createElement("button");
    remove_button.textContent = "Remove recipe";
    remove_button.classList.add("remove_recipe");
    remove_button.addEventListener("click", domRemoveRecipe);

    recipe_box.appendChild(recipe_title);
    recipe_box.appendChild(recipe_description);
    recipe_box.appendChild(remove_button);

    content.appendChild(recipe_box);
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.length > 0) {
        recipes = JSON.parse(localStorage.recipes)
        if (recipes.length > 0) {
            for (let i = 0; i < recipes.length; i++) {
                domAddRecipe(recipes[i]);
            }
        } else {
            noRecipes();
        }
    }
    document.getElementById("submit_button").onclick = searchRecipes;
})