(function() {
  var Recipes, hide, match, show;

  Recipes = {};

  Recipes.Search = {};

  Recipes.Search.init = function() {
    var search, timerId;
    timerId = null;
    search = document.querySelector('form.search input');
    return search.addEventListener('keyup', function() {
      if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
      }
      return timerId = setTimeout(Recipes.Search.doSearch, 300, search.value);
    });
  };

  Recipes.Search.doSearch = function(q) {
    var li, lis, toHide, _i, _j, _k, _len, _len2, _len3;
    q = q.trim();
    lis = document.querySelectorAll('.recipe-list li');
    if (!q) {
      for (_i = 0, _len = lis.length; _i < _len; _i++) {
        li = lis[_i];
        show(li);
      }
    } else {
      toHide = (function() {
        var _j, _len2, _results;
        _results = [];
        for (_j = 0, _len2 = lis.length; _j < _len2; _j++) {
          li = lis[_j];
          if (!match(q, li)) _results.push(li);
        }
        return _results;
      })();
      for (_j = 0, _len2 = lis.length; _j < _len2; _j++) {
        li = lis[_j];
        show(li);
      }
      for (_k = 0, _len3 = toHide.length; _k < _len3; _k++) {
        li = toHide[_k];
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

  match = function(x, node) {
    var xs;
    xs = node.textContent.toLowerCase();
    return (xs.indexOf(x)) > -1;
  };

  if (String.prototype.trim != null) {
    String.prototype.trim = function() {
      return (String(this)).replace(/^\s+|\s+$/g, '');
    };
  }

  window.Recipes = Recipes;

}).call(this);
