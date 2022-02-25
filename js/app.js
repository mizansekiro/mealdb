document.getElementById('loading').style.display = "none";


const searchMeal = () => {
    document.getElementById('search-btn').addEventListener('click', function () {
        const searchField = document.getElementById('search-field');
        const searchValue = searchField.value;
        searchField.value = '';
        console.log(searchValue);
        if (searchValue == '') {
            const p = document.getElementById('error');
            p.innerText = 'Please write somthing to display!!!';
            document.getElementById('loading').style.display = "block";
        } else {
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
            console.log(url);
            fetch(url)
                .then(res => res.json())
                .then(data => displaySearchResult(data.meals))
        }
    })
}

const displaySearchResult = (getfood) => {
    console.log(getfood);
    // console.log(meals.length);
    document.getElementById('loading').style.display = "none";
    document.getElementById('body-text').innerText = "";
    const getSearchReasult = document.getElementById('search-result');
    getSearchReasult.textContent = '';
    if (getfood == null) {
        const error = document.getElementById('error');
        error.innerText = `Your search is 0`;
    } else {
        document.getElementById('error').innerText = `Your search is ${getfood.length }`
        getfood.forEach(meal => {
            console.log(meal)
            const createDiv = document.createElement('div');
            createDiv.classList = 'col';
            createDiv.innerHTML = `
                <div div class = "card" >
                        <img src = "${meal.strMealThumb}"
                        class = "card-img-top"
                        alt = "">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "loadDealDetails(${meal.idMeal})">Details
                            </button>
                        </div>
                    </div>
    `;
            getSearchReasult.appendChild(createDiv);
        });

    }
}
const loadDealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(detailsdata => mealDetais(detailsdata.meals))
}

const mealDetais = detailsdata => {
    //console.log(data)
    const mealDetails = document.getElementById('mealModal');
    detailsdata.forEach(mealDetailsObj => {
        mealDetails.innerHTML = `
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${mealDetailsObj.strMeal}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex m-2">
                            <div class="card w-50" onclick="loadDealDetails(${mealDetailsObj.idMeal})">
                                <iframe src="${mealDetailsObj.strYoutube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                <div class="card-body">
                                    <h5 class="card-title">Details</h5>
                                    <p class="card-text">${mealDetailsObj.strInstructions.slice(0,300)}</p>
                                </div>
                            </div>
                            <div class="ms-5">
                                <h3 class = "text-warning">Ingredient</h3>
                                <ul class="list-group">
                                    <li class="list-group-item">${mealDetailsObj.strIngredient1}</li>
                                    <li class="list-group-item">${mealDetailsObj.strIngredient2}</li>
                                    <li class="list-group-item">${mealDetailsObj.strIngredient3}</li>
                                    <li class="list-group-item">${mealDetailsObj.strIngredient4}</li>
                                    <li class="list-group-item">${mealDetailsObj.strIngredient4}</li>
                                    <li class="list-group-item">${mealDetailsObj.strIngredient5}</li>
                                    <li class="list-group-item">${mealDetailsObj.strIngredient6}</li>
                                    <li class="list-group-item">${mealDetailsObj.strIngredient7}</li>
                                    <li class="list-group-item">${mealDetailsObj.strIngredient8}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>     
        `;
        //mealDetails.appendChild(createModaldiv);
    })
}