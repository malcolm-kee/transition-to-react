// wrap function in IIFE
(function initPokemons() {
  const pokemonList = document.querySelector('#pokemon-list');

  // fetch pokemon list from `/api/pokemons`
  fetch('/api/pokemons')
    .then((res) => res.json())
    .then((pokemons) => {
      // remove the placeholder in #pokemon-list
      pokemonList.innerHTML = '';

      /* For each pokemon,
      1. create a li element with class 'col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'
      2. the li element should have the following inner HTML:
        <div class="flex-1 flex flex-col p-8">
        <img
          class="w-32 h-32 flex-shrink-0 mx-auto bg-gray-200 rounded-full"
          src="${pokemon.thumbnail}"
          alt=""
        />
        <h3 class="mt-6 text-gray-900 text-sm font-medium">
          ${pokemon.name.english}
        </h3>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dd class="text-gray-500 text-sm line-clamp-3">${pokemon.description}</dd>
        </dl>
      </div>
      */
      pokemons.forEach((pokemon) => {
        const item = document.createElement('li');
        item.addEventListener('click', () => {
          const iconLink = document.querySelector('link[rel="icon"]');
          if (iconLink) {
            iconLink.href = pokemon.thumbnail;
          }
        });
        item.className =
          'col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200';

        item.innerHTML = `
      <div class="flex-1 flex flex-col p-8">
        <img
          class="w-32 h-32 flex-shrink-0 mx-auto bg-gray-200 rounded-full"
          src="${pokemon.thumbnail}"
          alt=""
        />
        <h3 class="mt-6 text-gray-900 text-sm font-medium">
          ${pokemon.name.english}
        </h3>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dd class="text-gray-500 text-sm line-clamp-3">${pokemon.description}</dd>
        </dl>
      </div>`;

        pokemonList.appendChild(item);
      });
    });
})();
