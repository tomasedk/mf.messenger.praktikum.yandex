export const templateString = `
<div class="sidebar__header">
    <div class="search">
        <input class="search__input" placeholder="Поиск" type="text">
    </div>
    <nav>
        <a class="link profile-link" href="../../../pages/profile/details/details.html">
            <span class="profile-link__text">Профиль</span>
            <img alt="Blue arrow" class="profile-link__arrow" src="../../../../sources/arrow.svg">
        </a>
    </nav>
</div>
<div data-set-id="{{body}}"></div>
`
