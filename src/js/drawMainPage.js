export const DrawMainPage = (categories) => {
  const html = categories.map((item) => `<div class="card">
                <div class="card-header">${item.name}</div>
                    <div class="card-body">
                    <div class="img-container"><img id = '${item.id}' src="${item.img}" alt="${item.name}"></div>
                </div>
            </div>`);

  return html.join(' ');
};
