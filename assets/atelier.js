(() => {
  const root = document.querySelector('[data-atelier]');
  if (!root) return;

  const data = {
    tile: {
      eyebrow: '01 / AzulejosGoa',
      title: 'Hand-painted ceramic art',
      description: 'Real work from AzulejosGoa — Portuguese and Indo-Goan ceramic art, personalised nameplates and decorative tiles.',
      image: 'assets/atelier-azulejos.webp',
      alt: 'Hand-painted ceramic nameplate by AzulejosGoa',
      site: 'https://azulejosgoa.com/'
    },
    decals: {
      eyebrow: '02 / Ceramic Decals',
      title: 'Your artwork, fired in',
      description: 'A finished ceramic decal result from CeramicDecals.in, made for artists, potters, cafés and brands.',
      image: 'assets/atelier-decals.webp',
      alt: 'Finished ceramic decal result',
      site: 'https://ceramicdecals.in/'
    },
    stone: {
      eyebrow: '03 / Ranjan Engravings',
      title: 'Meaning, set in stone',
      description: 'Stone engraving and custom carving by Ranjan Engravings in Goa, from memorials to house nameplates.',
      image: 'assets/atelier-stone.png',
      alt: 'Stone engraving work by Ranjan Engravings',
      site: 'https://ranjanengravings.com/'
    }
  };

  const image = root.querySelector('[data-atelier-image]');
  const eyebrow = root.querySelector('[data-atelier-eyebrow]');
  const title = root.querySelector('[data-atelier-title]');
  const description = root.querySelector('[data-atelier-description]');
  const link = root.querySelector('[data-atelier-link]');

  function select(key) {
    const item = data[key];
    if (!item) return;
    image.classList.add('is-changing');
    window.setTimeout(() => {
      image.src = item.image;
      image.alt = item.alt;
      eyebrow.textContent = item.eyebrow;
      title.textContent = item.title;
      description.textContent = item.description;
      link.href = item.site;
      document.querySelectorAll('[data-atelier-choice]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.atelierChoice === key));
      });
      image.addEventListener('load', () => image.classList.remove('is-changing'), { once: true });
    }, 120);
  }

  root.querySelectorAll('[data-atelier-choice]').forEach((button) => {
    button.addEventListener('click', () => select(button.dataset.atelierChoice));
  });
})();
