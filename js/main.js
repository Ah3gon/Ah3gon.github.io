// Мелкие интерактивы: переключатель темы, мобильное меню, просмотр коллажей.

(function () {
  var root = document.documentElement;

  // ----- Тема -----
  // По умолчанию тема системная; после клика выбор сохраняется в localStorage.
  var themeBtn = document.querySelector('.theme-toggle');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  }

  function updateThemeLabel() {
    var next = currentTheme() === 'dark' ? 'светлую' : 'тёмную';
    themeBtn.setAttribute('aria-label', 'Включить ' + next + ' тему');
    themeBtn.title = 'Включить ' + next + ' тему';
  }

  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateThemeLabel();
  });
  systemDark.addEventListener('change', updateThemeLabel);
  updateThemeLabel();

  // ----- Мобильное меню -----
  var menuBtn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }

  menuBtn.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) setMenu(false);
  });

  // ----- Просмотр коллажа крупно -----
  var dialog = document.querySelector('.lightbox');
  var dialogImg = dialog.querySelector('.lightbox-img');

  document.querySelectorAll('.card-media').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      dialogImg.src = btn.dataset.full;
      dialogImg.alt = img.alt;
      dialog.showModal();
    });
  });

  dialog.querySelector('.lightbox-close').addEventListener('click', function () {
    dialog.close();
  });
  // Клик по затемнённому фону (мимо картинки) закрывает просмотр
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', function () {
    dialogImg.src = 'data:,';
  });
})();
