export const templateString = `<ul class="messages">
    {{#if messages}}
        {{#each messages}}
            <div data-set-id="{{this}}"></div>
        {{/each}}
    {{else}}
        Переписка пуста
    {{/if}}
</ul>`
