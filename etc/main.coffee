Recipes = {}

Recipes.Search = {}

Recipes.Search.init = () ->
    this._lis = document.querySelectorAll '.recipe-list > ul > li'
    this._query = ''
    this._category = ''
    this.disableSubmit()
    this.initSearchField()
    undefined

Recipes.Search.setCategory = (x, defer) ->
    this._category = x
    if not defer
        Recipes.Search.filter()

Recipes.Search.disableSubmit = () ->
    form = document.querySelector 'form.search'
    form.addEventListener 'submit', (event) ->
        event.preventDefault()
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

Recipes.Search.filter = () ->
    query = Recipes.Search._query
    category = Recipes.Search._category
    lis = Recipes.Search._lis
    query = query.trim()

    hasCategory = (x, node) ->
        nodes = node.querySelectorAll '.categories li'
        xs = (n.textContent for n in nodes)
        x in xs
    hasQuery = (x, node) ->
        xs = (node.querySelector 'p').textContent.toLowerCase()
        (xs.indexOf x) >= 0

    hide li for li in lis
    if category
        toShow = (li for li in lis when hasCategory category, li)
        if query
            toShow = (li for li in toShow when hasQuery query, li)
    else if query
        toShow = (li for li in lis when hasQuery query, li)
    else
        toShow = lis
    show li for li in toShow


Recipes.Menu = {}

Recipes.Menu.init = () ->
    this._sidebar = document.querySelector '.sidebar'
    this._list = this._sidebar.querySelector '.category-list'
    hasSome = this.populate()
    if hasSome
        show this._sidebar
        this.initOnScroll()
        this.bindEvents()

Recipes.Menu.populate = () ->
    list = this._list
    categories = []
    nodes = document.querySelectorAll '.recipe-list .categories li'
    for x in nodes
        category = x.textContent
        categories.push category if category not in categories
    if categories.length
        categories = categories.sort()
        for x in categories
            node = document.createElement 'li'
            node.innerHTML = '<a href="#">' + x + '</a>'
            list.appendChild node
        true
    else
        false

Recipes.Menu.initOnScroll = () ->
    sidebar = this._sidebar
    sidebarTop = sidebar.offsetTop + sidebar.parentNode.offsetTop
    sidebarLeftOld = sidebar.offsetLeft
    sidebarLeft = sidebarLeftOld + sidebar.parentNode.offsetLeft
    isFixed = 0

    onScroll = () ->
        scrollTop = window.pageYOffset
        if scrollTop >= sidebarTop && !isFixed
            isFixed = 1
            sidebar.style.left = sidebarLeft + 'px'
            sidebar.classList.add 'fixed'
        else if scrollTop <= sidebarTop && isFixed
            isFixed = 0
            sidebar.style.left = sidebarLeftOld + 'px'
            sidebar.classList.remove 'fixed'
        undefined

    window.addEventListener 'scroll', onScroll
    onScroll()
    undefined

Recipes.Menu.bindEvents = () ->
    bind = (a) ->
        a.addEventListener 'click', (event) ->
            event.preventDefault()
            a = this
            li = this.parentNode
            ul = li.parentNode
            n.classList.remove 'active' for n in ul.children
            li.classList.add 'active'
            if a.classList.contains 'all'
                Recipes.Menu.resetCategory()
            else
                Recipes.Menu.setCategory a.textContent
            undefined
    bind a for a in this._list.querySelectorAll 'a'
    undefined

Recipes.Menu.resetCategory = () ->
    Recipes.Menu.setCategory null

Recipes.Menu.setCategory = (x) ->
    Recipes.Search.setCategory x


show = (x) -> x.classList.remove 'hidden'
hide = (x) -> x.classList.add 'hidden'

if String.prototype.trim?
    String.prototype.trim = () ->
        (String this).replace /^\s+|\s+$/g, ''

window.Recipes = Recipes
