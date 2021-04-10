export const RenderCardsForPlay = (array) => {
  const html = array.map((item) => `<div class='card-flip'>
            <div class='front'>
                <div class="card">
                    <div class="card-body">
                        <div class="img-container-game"><img id='${item.id}' class='click-img' src="${item.img}" alt="${item.name}"></div>
                    </div>
                </div>
            </div>
            </div>`);
  return `${html.join(' ')}<div class= 'btn-start-game-container'> <button class = 'btn-start-game' id = ${array[0].arrayId}> Start New Game </button> </div>`;
};
