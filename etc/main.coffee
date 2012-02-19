Recipes = {}
Recipes.Search = {}
Recipes.Search.init = () ->
    timerId = null
    search = document.querySelector 'form.search input'
    search.addEventListener 'keyup', () ->
        if timerId isnt null
            clearTimeout timerId
            timerId = null
        timerId = setTimeout Recipes.Search.doSearch, 300, search.value
Recipes.Search.doSearch = (q) ->
    q = q.trim()
    lis = document.querySelectorAll '.recipe-list li'
    if not q
        show li for li in lis
    else
        toHide = (li for li in lis when not match q, li)
        show li for li in lis
        hide li for li in toHide
    undefined


show = (x) -> x.classList.remove 'hidden'
hide = (x) -> x.classList.add 'hidden'
match = (x, node) ->
    xs = node.textContent.toLowerCase()
    (xs.indexOf x) > -1

if String.prototype.trim?
    String.prototype.trim = () ->
        (String this).replace /^\s+|\s+$/g, ''

window.Recipes = Recipes
