import './footer.css';

export const Footer = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer', 'container', 'nav-style');
  footer.innerHTML = `
        <div class="logo-rss">
            <a href="https://rs.school/" target="_blank">  <img src="img/rs_school_js.svg" alt="logo"></a>
        </div>
        <h2>2020 Q3</h2>
        <div class="author"><a href="https://github.com/IrenaKowalewska" target="_blank">
          <img src="img/github-logo.jpg" alt="logo"></a>
        </div>
    `;
  return footer;
};
