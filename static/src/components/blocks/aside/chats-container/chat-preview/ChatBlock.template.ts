export const templateString = `
<div data-set-id="{{photo}}"></div>
<div class="chat__preview-container">
    <span class="username chat__username">{{fullName}}</span>
    <span class="chat__preview-message">
        {{#if isYourLastMsg}}<span class="chat__preview-message_self-mark">Вы: </span>{{/if}}{{msgText}}
    </span>
</div>
<div class="chat__message-info">
    <span class="chat__message-date">{{msgDate}}</span>
    <div class="notification chat__message-notification {{#if noNewMsgs}}chat__message-notification_hidden{{/if}}">{{newMsgsCount}}</div>
</div>
`
