export const templateString = `
<div data-set-id="{{modal}}"></div>
<nav class="nav">
    <div data-set-id="{{backlink}}"></div>
</nav>
<main class="profile-page__content">
    <div data-set-id="{{photo}}"></div>
    <h1 class="profile-page__username">{{{username}}}</h1>
    {{#if isEdit}}<form action="#" class="profile-page__form">{{/if}}
        <div class="profile-page__body">
            <div data-set-id="{{fields}}"></div>
        </div>
        <div data-set-id="{{actions}}"></div>
    {{#if isEdit}}</form>{{/if}}
</main>
`