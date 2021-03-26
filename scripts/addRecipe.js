"use strict";

let recipes = [];

function addRecipe(event) {
    const title = document.getElementById("recipe_name").value;
    const description = document.getElementById("recipe_description").value;

    if (validateTitle()) {

        let index = 0;
        while (recipes[index] != null) {
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
}

function validateTitle() {
    const title = document.getElementById("recipe_name").value;
    if (title == "") {
        alert("Title must be filled out");
        document.getElementById("recipe_name").focus();
        return false;
    }
    return true;
}

function fileDragover(event) {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = "copy";
}

function fileDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    readTxtFile(fileList[0]);
    console.log(fileList);
}

function readTxtFile(file) {
    if (file.type && file.type != "text/plain") {
        console.log('File is not a plain text.', file.type, file);
        return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        const description = reader.result;
        let recipeDescription = document.getElementById("recipe_description");
        recipeDescription.value = description;
    };
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.length > 0) {
        recipes = JSON.parse(localStorage.recipes)
    }
    document.getElementById("add_recipe_button").onclick = addRecipe;

    let dropZone = document.getElementById('recipe_description');
    dropZone.ondragover = fileDragover;
    dropZone.ondrop = fileDrop
})