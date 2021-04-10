import './categories.css';

export const ChangeCategories = (array) => {
  const html = array.map((item) => `
        <div class='card-flip'>
            <div class='front'>
                <div class="card">
                    <div class="card-header">${item.name}
                        <div><img class='reverse-button' src="img/rotate.png" alt="rotate"></div>
                    </div>
                    <div class="card-body">
                        <div class="img-container"><img id='${item.id}' src="${item.img}" alt="${item.name}"></div>
                    </div>
                </div>
            </div>
            <div class="back">
                <div  class="card">
                    <div  class="card-header"> ${item.translation}</div>
                    <div  class="card-body">
                        <div class="img-container"><img src="${item.img}" alt="${item.name}"></div>
                    </div>
                </div>
            </div>
        </div>`);
  return html.join(' ');
};
