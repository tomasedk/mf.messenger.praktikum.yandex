export const templateString = `
<div class="sidebar__header">
    <button class="round-button round-button__add"></button>
    <div class="search">
        <input class="search__input" placeholder="Поиск" type="text">
    </div>
    <nav>
        <div data-set-id="{{profileLink}}"></div>
    </nav>
</div>
<div data-set-id="{{body}}"></div>
`;
