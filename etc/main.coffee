Recipes = {}

Recipes.Search = {}

Recipes.Search.init = () ->
    this.lis = document.querySelectorAll '.recipe-list li'
    this.initSearchField()
    this.initTagsFilter()
    undefined

Recipes.Search.initSearchField = () ->
    timerId = null
    search = document.querySelector 'form.search .query input'
    f = () ->
        if timerId isnt null
            clearTimeout timerId
            timerId = null
        timerId = setTimeout Recipes.Search.onSearchQuery, 300, search.value
    (search.addEventListener e, f for e in ['keyup', 'change', 'search'])
    undefined

Recipes.Search.initTagsFilter = () ->
    tags = []
    tagNodes = document.querySelectorAll '.recipe-list .tags li'
    for x in tagNodes
        tag = x.textContent
        tags.push tag if tag not in tags
    if tags.length
        tags = tags.sort()
        searchContainer = document.querySelector 'form.search .query'
        tagsContainer = document.querySelector 'form.search .tags'
        tagsSelect = tagsContainer.querySelector 'select'
        for x in tags
            node = document.createElement 'option'
            node.value = x
            node.text = x
            tagsSelect.appendChild node
        searchContainer.classList.remove 'max'
        show tagsContainer
    tagsSelect.addEventListener 'change', () ->
        Recipes.Search.onTagSelect tagsSelect.value
    undefined

Recipes.Search.onSearchQuery = (q) ->
    match = (x, node) ->
        xs = node.textContent.toLowerCase()
        x in xs
    Recipes.Search._search match, q

Recipes.Search.onTagSelect = (tag) ->
    match = (x, node) ->
        nodes = node.querySelectorAll '.tags li'
        xs = (n.textContent for n in nodes)
        x in xs
    tag = '' if tag is '---'
    Recipes.Search._search match, tag

Recipes.Search._search = (match, q) ->
    q = q.trim()
    lis = Recipes.Search.lis
    show li for li in lis
    if q
        toHide = (li for li in lis when not match q, li)
        hide li for li in toHide
    undefined


show = (x) -> x.classList.remove 'hidden'
hide = (x) -> x.classList.add 'hidden'

if String.prototype.trim?
    String.prototype.trim = () ->
        (String this).replace /^\s+|\s+$/g, ''

window.Recipes = Recipes
