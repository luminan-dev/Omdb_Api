const API_KEY = "249767da";
const API_URL = "http://www.omdbapi.com"

const titleInput = document.querySelector('#title-input');
const yearInput = document.getElementById('year-input');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const plotSelector = document.getElementById('plot');
const moviesWrapper = document.querySelector('.post-wrapper');


const renderMovie = (movie) => {
    moviesWrapper.innerHTML = ''; // tozalash

    if (movie.Response === "False") {
        moviesWrapper.innerHTML = `
        <h2 class="text-center text-danger">Ma'lumot topilmadi, qaytadan urunb koring</h2>`;
        return;
    }

    moviesWrapper.innerHTML = `
        <div class="card mx-auto mt-4" style="width: 600px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${movie.Poster !== 'N/A' ? 
                        movie.Poster : 'https://via.placeholder.com/300'}" 
                         class="img-fluid rounded-start" alt="${movie.Title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="card-title">${movie.Title} (${movie.Year})</h3>
                        <p><strong>Janr:</strong> ${movie.Genre}</p>
                        <p><strong>Reyting:</strong> ${movie.imdbRating} / 10</p>
                        <p><strong>Rejissyor:</strong> ${movie.Director}</p>
                        <p><strong>Aktiorlar:</strong> ${movie.Actors}</p>
                        <p><strong>Syujet:</strong> ${movie.Plot}</p>
                        <p><small><strong>Chiqish sanasi:</strong>
                         ${movie.Released}</small>
                         </p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const getMovie = async () => {
    const title = titleInput.value.trim();
    const year = yearInput.value;
    const plot = plotSelector.value;

    if (!title) {
        moviesWrapper.innerHTML = `<p
           class="text-danger">Iltimos, kino nomini kiriting!
         </p>`;
        return;
    }

    try {
        const response = await axios.get(API_URL, {
            params: {
                t: title,
                y: year,
                plot: plot,
                apikey: API_KEY  // "apikey" emas, "apikey"
            }
        });

        renderMovie(response.data);
    } catch (error) {
        console.error("Xato:", error);
        moviesWrapper.innerHTML = `<h2 class="text-danger">
           Internet yoki server xatosi
          </h2>`;
    }
};
searchBtn.addEventListener('click', getMovie);
resetBtn.addEventListener('click', () => {
    titleInput.value = '';
    yearInput.value = '';
    plotSelector.value = 'short';
    moviesWrapper.innerHTML = '';
});