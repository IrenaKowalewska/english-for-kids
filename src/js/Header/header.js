import './header.css';

export const Header = (categories) => {
  const header = document.createElement('header');
  header.classList.add('header');
  const html = categories.map(((item) => `
        <li><a class='link${item.id}' href="#">${item.name}</a> </li>
        `)).join(' ');
  header.innerHTML = `
        <nav class="nav">
            <ul class="menu">
                <li> <a class='home' href="#" style="text-decoration: underline">Home</a> </li>
                ${html}
                <li> <a class='statistic' href="#">Statistic</a> </li>
            </ul>
        </nav>

        <div class="container nav-style">
            <div class="burger">
                <span></span>
            </div>
            <h1 class="title">English for kids</h1>
            <div class="switcher_container">
                <div class="switch">
                    <input type="checkbox" name="switch" class="switch-checkbox" id="id-switch" checked>
                    <label class="switch-label" for="id-switch">
                        <span class="switch-inner"></span>
                        <span class="switch-external"></span>
                    </label>
                </div>
            </div>  
        </div>
    `;
  return header;
};
