(function() {
  var Recipes, hide, show,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Recipes = {};

  Recipes.Search = {};

  Recipes.Search.init = function() {
    this._lis = document.querySelectorAll('.recipe-list > ul > li');
    this._query = '';
    this._category = '';
    this.disableSubmit();
    this.initSearchField();
    return;
  };

  Recipes.Search.setQuery = function(x, defer) {
    this._query = x ? x.trim() : null;
    if (!defer) return Recipes.Search.filter();
  };

  Recipes.Search.setCategory = function(x, defer) {
    this._category = x ? x.trim() : null;
    if (!defer) return Recipes.Search.filter();
  };

  Recipes.Search.disableSubmit = function() {
    var form;
    form = document.querySelector('form.search');
    form.addEventListener('submit', function(event) {
      return event.preventDefault();
    });
    return;
  };

  Recipes.Search.initSearchField = function() {
    var e, f, search, timerId, _i, _len, _ref;
    timerId = null;
    search = document.querySelector('form.search .query input');
    f = function() {
      if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
      }
      return timerId = setTimeout(function() {
        return Recipes.Search.setQuery(search.value);
      }, 300);
    };
    _ref = ['keyup', 'change', 'search'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      search.addEventListener(e, f);
    }
    return;
  };

  Recipes.Search.filter = function() {
    var category, hasCategory, hasQuery, li, lis, query, toShow, _i, _j, _len, _len2, _results;
    query = Recipes.Search._query;
    category = Recipes.Search._category;
    lis = Recipes.Search._lis;
    hasCategory = function(x, node) {
      var n, nodes, xs;
      nodes = node.querySelectorAll('.categories li');
      xs = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = nodes.length; _i < _len; _i++) {
          n = nodes[_i];
          _results.push(n.textContent);
        }
        return _results;
      })();
      return __indexOf.call(xs, x) >= 0;
    };
    hasQuery = function(x, node) {
      var xs;
      xs = (node.querySelector('p')).textContent.toLowerCase();
      return (xs.indexOf(x)) >= 0;
    };
    for (_i = 0, _len = lis.length; _i < _len; _i++) {
      li = lis[_i];
      hide(li);
    }
    if (category) {
      toShow = (function() {
        var _j, _len2, _results;
        _results = [];
        for (_j = 0, _len2 = lis.length; _j < _len2; _j++) {
          li = lis[_j];
          if (hasCategory(category, li)) _results.push(li);
        }
        return _results;
      })();
      if (query) {
        toShow = (function() {
          var _j, _len2, _results;
          _results = [];
          for (_j = 0, _len2 = toShow.length; _j < _len2; _j++) {
            li = toShow[_j];
            if (hasQuery(query, li)) _results.push(li);
          }
          return _results;
        })();
      }
    } else if (query) {
      toShow = (function() {
        var _j, _len2, _results;
        _results = [];
        for (_j = 0, _len2 = lis.length; _j < _len2; _j++) {
          li = lis[_j];
          if (hasQuery(query, li)) _results.push(li);
        }
        return _results;
      })();
    } else {
      toShow = lis;
    }
    _results = [];
    for (_j = 0, _len2 = toShow.length; _j < _len2; _j++) {
      li = toShow[_j];
      _results.push(show(li));
    }
    return _results;
  };

  Recipes.Menu = {};

  Recipes.Menu.init = function() {
    var hasSome;
    this._sidebar = document.querySelector('.sidebar');
    this._list = this._sidebar.querySelector('.category-list');
    hasSome = this.populate();
    if (hasSome) {
      show(this._sidebar);
      this.initOnScroll();
      return this.bindEvents();
    }
  };

  Recipes.Menu.populate = function() {
    var categories, category, list, node, nodes, x, _i, _j, _len, _len2;
    list = this._list;
    categories = [];
    nodes = document.querySelectorAll('.recipe-list .categories li');
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      x = nodes[_i];
      category = x.textContent;
      if (__indexOf.call(categories, category) < 0) categories.push(category);
    }
    if (categories.length) {
      categories = categories.sort();
      for (_j = 0, _len2 = categories.length; _j < _len2; _j++) {
        x = categories[_j];
        node = document.createElement('li');
        node.innerHTML = '<a href="#">' + x + '</a>';
        list.appendChild(node);
      }
      return true;
    } else {
      return false;
    }
  };

  Recipes.Menu.initOnScroll = function() {
    var isFixed, onScroll, sidebar, sidebarLeft, sidebarLeftOld, sidebarTop;
    sidebar = this._sidebar;
    sidebarTop = sidebar.offsetTop + sidebar.parentNode.offsetTop;
    sidebarLeftOld = sidebar.offsetLeft;
    sidebarLeft = sidebarLeftOld + sidebar.parentNode.offsetLeft;
    isFixed = 0;
    onScroll = function() {
      var scrollTop;
      scrollTop = window.pageYOffset;
      if (scrollTop >= sidebarTop && !isFixed) {
        isFixed = 1;
        sidebar.style.left = sidebarLeft + 'px';
        sidebar.classList.add('fixed');
      } else if (scrollTop <= sidebarTop && isFixed) {
        isFixed = 0;
        sidebar.style.left = sidebarLeftOld + 'px';
        sidebar.classList.remove('fixed');
      }
      return;
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return;
  };

  Recipes.Menu.bindEvents = function() {
    var a, bind, _i, _len, _ref;
    bind = function(a) {
      return a.addEventListener('click', function(event) {
        var li, n, ul, _i, _len, _ref;
        event.preventDefault();
        a = this;
        li = this.parentNode;
        ul = li.parentNode;
        _ref = ul.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          n = _ref[_i];
          n.classList.remove('active');
        }
        li.classList.add('active');
        if (a.classList.contains('all')) {
          Recipes.Menu.resetCategory();
        } else {
          Recipes.Menu.setCategory(a.textContent);
        }
        return;
      });
    };
    _ref = this._list.querySelectorAll('a');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      a = _ref[_i];
      bind(a);
    }
    return;
  };

  Recipes.Menu.resetCategory = function() {
    return Recipes.Menu.setCategory(null);
  };

  Recipes.Menu.setCategory = function(x) {
    return Recipes.Search.setCategory(x);
  };

  show = function(x) {
    return x.classList.remove('hidden');
  };

  hide = function(x) {
    return x.classList.add('hidden');
  };

  if (String.prototype.trim != null) {
    String.prototype.trim = function() {
      return (String(this)).replace(/^\s+|\s+$/g, '');
    };
  }

  window.Recipes = Recipes;

}).call(this);
