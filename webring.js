;(function () {
  var script =
    document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName('script');
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (
          scripts[i].src &&
          scripts[i].src.indexOf('webring.js') !== -1
        ) {
          return scripts[i];
        }
      }
      return null;
    })();

  if (!script) return;

  var dataset = script.dataset || {};
  var memberId = dataset.memberId || script.getAttribute('data-member-id') || '';
  var theme =
    (dataset.theme || script.getAttribute('data-theme') || 'dark')
      .toString()
      .toLowerCase();
  var sitesUrl =
    dataset.sitesUrl ||
    script.getAttribute('data-sites-url') ||
    'https://columbia.network/sites.json';

  var baseUrl = 'https://columbia.network';
  var logoUrl = baseUrl + '/assets/crest.png';

  function createContainer() {
    var targetId =
      dataset.targetId || script.getAttribute('data-target-id') || '';
    var container = targetId ? document.getElementById(targetId) : null;

    if (!container) {
      container = document.createElement('div');
      if (script.parentNode) {
        script.parentNode.insertBefore(container, script);
      } else {
        document.body.appendChild(container);
      }
    }

    container.className +=
      (container.className ? ' ' : '') + 'columbia-webring-widget';

    var isDark = theme !== 'light';
    var bg = isDark ? 'rgba(0,0,0,0.82)' : 'rgba(249,250,251,0.92)';
    var border = isDark ? 'rgba(148,163,184,0.4)' : 'rgba(148,163,184,0.6)';
    var text = isDark ? '#e5e7eb' : '#111827';
    var muted = isDark ? '#9ca3af' : '#4b5563';
    var accent = '#60a5fa';
    var hoverBg = isDark
      ? 'rgba(37, 99, 235, 0.18)'
      : 'rgba(37, 99, 235, 0.10)';

    container.style.boxSizing = 'border-box';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.gap = '0.75rem';
    container.style.padding = '0.6rem 1rem';
    container.style.borderRadius = '999px';
    container.style.background = bg;
    container.style.border = '1px solid ' + border;
    container.style.fontFamily =
      \"Times New Roman, Times, serif\";
    container.style.fontSize = '0.85rem';
    container.style.lineHeight = '1.4';
    container.style.color = text;
    container.style.letterSpacing = '0.02em';
    container.style.maxWidth = '100%';
    container.style.margin = '1.5rem auto 0 auto';
    container.style.backdropFilter = 'blur(10px)';
    container.style.webkitBackdropFilter = 'blur(10px)';
    container.style.position = 'relative';
    container.style.zIndex = '10';
    container.setAttribute('tabindex', '0');

    container.textContent = 'loading columbia.network…';

    function styleLink(el, subtle) {
      el.style.display = 'inline-flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.padding = subtle ? '0.15rem 0.3rem' : '0.3rem 0.7rem';
      el.style.borderRadius = '999px';
      el.style.border = subtle ? 'none' : '1px solid transparent';
      el.style.textDecoration = 'none';
      el.style.cursor = 'pointer';
      el.style.whiteSpace = 'nowrap';
      el.style.color = subtle ? muted : text;
      el.style.fontWeight = subtle ? '400' : '500';
      el.style.transition =
        'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease';
      el.onmouseenter = function () {
        el.style.background = hoverBg;
        el.style.color = accent;
        if (!subtle) {
          el.style.borderColor = accent;
        }
      };
      el.onmouseleave = function () {
        el.style.background = 'transparent';
        el.style.color = subtle ? muted : text;
        if (!subtle) {
          el.style.borderColor = 'transparent';
        }
      };
    }

    return {
      container: container,
      styleLink: styleLink,
      palette: { text: text, muted: muted }
    };
  }

  var ui = createContainer();
  var container = ui.container;
  var styleLink = ui.styleLink;

  function resolveMemberIndex(members) {
    if (!members || !members.length) return -1;

    if (memberId) {
      for (var i = 0; i < members.length; i++) {
        if (members[i].id === memberId) return i;
      }
    }

    try {
      var host = window.location.hostname;
      var origin = window.location.origin;
      for (var j = 0; j < members.length; j++) {
        var site = members[j].site || '';
        if (!site) continue;
        if (site.indexOf(origin) === 0) return j;
      }
      for (var k = 0; k < members.length; k++) {
        var m = members[k];
        if (!m.site) continue;
        try {
          var url = new URL(m.site);
          if (url.hostname === host) return k;
        } catch (e) {}
      }
    } catch (e) {}

    return -1;
  }

  function buildWidget(members) {
    container.innerHTML = '';

    if (!members || !members.length) {
      container.textContent = '';
      var emptyLink = document.createElement('a');
      emptyLink.href = baseUrl;
      emptyLink.setAttribute('aria-label', 'Visit columbia.network');
      styleLink(emptyLink, true);
      var emptyImg = document.createElement('img');
      emptyImg.src = logoUrl;
      emptyImg.alt = 'columbia.network';
      emptyImg.style.height = '24px';
      emptyImg.style.width = 'auto';
      emptyImg.style.display = 'block';
      if (theme === 'light') emptyImg.style.filter = 'invert(1)';
      emptyLink.appendChild(emptyImg);
      container.appendChild(emptyLink);
      return;
    }

    var idx = resolveMemberIndex(members);
    if (idx === -1) {
      idx = 0;
    }

    var count = members.length;
    var current = members[idx];
    var prev = members[(idx - 1 + count) % count];
    var next = members[(idx + 1) % count];

    var prevLink = document.createElement('a');
    prevLink.href = prev.site || 'https://columbia.network';
    prevLink.textContent = '← prev';
    prevLink.setAttribute('aria-label', 'Previous site in columbia.network');
    styleLink(prevLink, false);

    var centerLink = document.createElement('a');
    centerLink.href = baseUrl;
    centerLink.setAttribute('aria-label', 'Visit columbia.network');
    styleLink(centerLink, true);
    centerLink.style.fontWeight = '500';
    centerLink.style.padding = '0.25rem 0.5rem';
    var logoImg = document.createElement('img');
    logoImg.src = logoUrl;
    logoImg.alt = 'columbia.network';
    logoImg.style.height = '24px';
    logoImg.style.width = 'auto';
    logoImg.style.display = 'block';
    logoImg.style.pointerEvents = 'none';
    if (theme === 'light') {
      logoImg.style.filter = 'invert(1)';
    }
    centerLink.appendChild(logoImg);

    var nextLink = document.createElement('a');
    nextLink.href = next.site || 'https://columbia.network';
    nextLink.textContent = 'next →';
    nextLink.setAttribute('aria-label', 'Next site in columbia.network');
    styleLink(nextLink, false);

    container.appendChild(prevLink);
    container.appendChild(centerLink);
    container.appendChild(nextLink);

    var touchStartX = null;

    container.addEventListener(
      'touchstart',
      function (e) {
        if (!e.touches || !e.touches.length) return;
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    container.addEventListener(
      'touchend',
      function (e) {
        if (touchStartX == null || !e.changedTouches || !e.changedTouches.length)
          return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(dx) < 40) return;
        if (dx < 0 && nextLink.href) {
          window.location.href = nextLink.href;
        } else if (dx > 0 && prevLink.href) {
          window.location.href = prevLink.href;
        }
      },
      { passive: true }
    );

    container.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' && prevLink.href) {
        e.preventDefault();
        window.location.href = prevLink.href;
      } else if (e.key === 'ArrowRight' && nextLink.href) {
        e.preventDefault();
        window.location.href = nextLink.href;
      }
    });
  }

  function load() {
    try {
      fetch(sitesUrl, { credentials: 'omit' })
        .then(function (res) {
          if (!res.ok) throw new Error('Failed to load sites.json');
          return res.json();
        })
        .then(function (data) {
          var members = Array.isArray(data) ? data : [];
          buildWidget(members);
        })
        .catch(function () {
          container.textContent = '';
          var link = document.createElement('a');
          link.href = baseUrl;
          link.setAttribute('aria-label', 'Visit columbia.network');
          styleLink(link, true);
          var fallbackImg = document.createElement('img');
          fallbackImg.src = logoUrl;
          fallbackImg.alt = 'columbia.network';
          fallbackImg.style.height = '24px';
          fallbackImg.style.width = 'auto';
          fallbackImg.style.display = 'block';
          if (theme === 'light') fallbackImg.style.filter = 'invert(1)';
          link.appendChild(fallbackImg);
          container.appendChild(link);
        });
    } catch (e) {
      container.innerHTML = '';
      var errLink = document.createElement('a');
      errLink.href = baseUrl;
      errLink.setAttribute('aria-label', 'Visit columbia.network');
      styleLink(errLink, true);
      var errImg = document.createElement('img');
      errImg.src = logoUrl;
      errImg.alt = 'columbia.network';
      errImg.style.height = '24px';
      errImg.style.width = 'auto';
      errImg.style.display = 'block';
      if (theme === 'light') errImg.style.filter = 'invert(1)';
      errLink.appendChild(errImg);
      container.appendChild(errLink);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();

