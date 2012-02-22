(function() {
  var Recipes, hide, show,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Recipes = {};

  Recipes.Search = {};

  Recipes.Search.init = function() {
    this.lis = document.querySelectorAll('.recipe-list li');
    this.initSearchField();
    this.initTagsFilter();
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
      return timerId = setTimeout(Recipes.Search.onSearchQuery, 300, search.value);
    };
    _ref = ['keyup', 'change', 'search'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      search.addEventListener(e, f);
    }
    return;
  };

  Recipes.Search.initTagsFilter = function() {
    var node, searchContainer, tag, tagNodes, tags, tagsContainer, tagsSelect, x, _i, _j, _len, _len2;
    tags = [];
    tagNodes = document.querySelectorAll('.recipe-list .tags li');
    for (_i = 0, _len = tagNodes.length; _i < _len; _i++) {
      x = tagNodes[_i];
      tag = x.textContent;
      if (__indexOf.call(tags, tag) < 0) tags.push(tag);
    }
    if (tags.length) {
      tags = tags.sort();
      searchContainer = document.querySelector('form.search .query');
      tagsContainer = document.querySelector('form.search .tags');
      tagsSelect = tagsContainer.querySelector('select');
      for (_j = 0, _len2 = tags.length; _j < _len2; _j++) {
        x = tags[_j];
        node = document.createElement('option');
        node.value = x;
        node.text = x;
        tagsSelect.appendChild(node);
      }
      searchContainer.classList.remove('max');
      show(tagsContainer);
    }
    tagsSelect.addEventListener('change', function() {
      return Recipes.Search.onTagSelect(tagsSelect.value);
    });
    return;
  };

  Recipes.Search.onSearchQuery = function(q) {
    var match;
    match = function(x, node) {
      var xs;
      xs = node.textContent.toLowerCase();
      return __indexOf.call(xs, x) >= 0;
    };
    return Recipes.Search._search(match, q);
  };

  Recipes.Search.onTagSelect = function(tag) {
    var match;
    match = function(x, node) {
      var n, nodes, xs;
      nodes = node.querySelectorAll('.tags li');
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
    if (tag === '---') tag = '';
    return Recipes.Search._search(match, tag);
  };

  Recipes.Search._search = function(match, q) {
    var li, lis, toHide, _i, _j, _len, _len2;
    q = q.trim();
    lis = Recipes.Search.lis;
    for (_i = 0, _len = lis.length; _i < _len; _i++) {
      li = lis[_i];
      show(li);
    }
    if (q) {
      toHide = (function() {
        var _j, _len2, _results;
        _results = [];
        for (_j = 0, _len2 = lis.length; _j < _len2; _j++) {
          li = lis[_j];
          if (!match(q, li)) _results.push(li);
        }
        return _results;
      })();
      for (_j = 0, _len2 = toHide.length; _j < _len2; _j++) {
        li = toHide[_j];
        hide(li);
      }
    }
    return;
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
