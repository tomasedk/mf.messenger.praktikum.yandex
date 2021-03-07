export const templateString = `<li class="message">
    <div data-set-id="{{photo}}"></div>
    <div class="message__cloud {{#if isYourMsg}}message__cloud_self-mark{{/if}}">
        {{#if attachedImg}}<img alt="cat" class="message__img" src="../../../../sources/cat.png">{{/if}}
        <div class="message__text">{{msgText}}</div>
        <div class="message__info">
            <div class="message__date">{{msgDate}}</div>
            {{#if isRead}}<img alt="blue checkmark" class="message__checkmark" src="../../../../sources/checkmark.svg">{{/if}}
        </div>
    </div>
</li>`
