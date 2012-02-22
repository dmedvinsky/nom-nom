(function() {
  var Recipes, hide, show,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Recipes = {};

  Recipes.Search = {};

  Recipes.Search.init = function() {
    this._lis = document.querySelectorAll('.recipe-list > ul > li');
    this._query = '';
    this._tag = '';
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
      return timerId = setTimeout(function() {
        Recipes.Search._query = search.value;
        return Recipes.Search.filter();
      }, 300);
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
      Recipes.Search._tag = tagsSelect.value;
      return Recipes.Search.filter();
    });
    return;
  };

  Recipes.Search.filter = function() {
    var hasQuery, hasTag, li, lis, query, tag, toShow, _i, _j, _len, _len2, _results;
    query = Recipes.Search._query;
    tag = Recipes.Search._tag;
    lis = Recipes.Search._lis;
    query = query.trim();
    tag = tag !== '---' ? tag : '';
    hasTag = function(x, node) {
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
    hasQuery = function(x, node) {
      var xs;
      xs = (node.querySelector('p')).textContent.toLowerCase();
      return (xs.indexOf(x)) >= 0;
    };
    for (_i = 0, _len = lis.length; _i < _len; _i++) {
      li = lis[_i];
      hide(li);
    }
    if (tag) {
      toShow = (function() {
        var _j, _len2, _results;
        _results = [];
        for (_j = 0, _len2 = lis.length; _j < _len2; _j++) {
          li = lis[_j];
          if (hasTag(tag, li)) _results.push(li);
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
