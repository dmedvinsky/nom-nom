Recipes = {}

Recipes.Search = {}

Recipes.Search.init = () ->
    this._lis = document.querySelectorAll '.recipe-list > ul > li'
    this._query = ''
    this._tag = ''
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
        timerId = setTimeout () ->
            Recipes.Search._query = search.value
            Recipes.Search.filter()
        , 300
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
        Recipes.Search._tag = tagsSelect.value
        Recipes.Search.filter()
    undefined

Recipes.Search.filter = () ->
    query = Recipes.Search._query
    tag = Recipes.Search._tag
    lis = Recipes.Search._lis
    query = query.trim()
    tag = if tag isnt '---' then tag else ''

    hasTag = (x, node) ->
        nodes = node.querySelectorAll '.tags li'
        xs = (n.textContent for n in nodes)
        x in xs
    hasQuery = (x, node) ->
        xs = (node.querySelector 'p').textContent.toLowerCase()
        (xs.indexOf x) >= 0

    hide li for li in lis
    if tag
        toShow = (li for li in lis when hasTag tag, li)
        if query
            toShow = (li for li in toShow when hasQuery query, li)
    else if query
        toShow = (li for li in lis when hasQuery query, li)
    else
        toShow = lis
    show li for li in toShow


show = (x) -> x.classList.remove 'hidden'
hide = (x) -> x.classList.add 'hidden'

if String.prototype.trim?
    String.prototype.trim = () ->
        (String this).replace /^\s+|\s+$/g, ''

window.Recipes = Recipes
