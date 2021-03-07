export const templateString = `<div data-set-id="{{modal}}"></div>
<div data-set-id="{{aside}}"></div>
<main class="chat-view">
    {{#if selectedChat}}
        <div data-set-id="{{selectedChat}}"></div>
    {{else}}
        <div class="empty-chat">Выберите чат для отправки сообщения</div>
    {{/if}}
</main>
`
