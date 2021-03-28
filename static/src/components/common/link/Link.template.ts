export const templateString = `
<a class="link {{additionalClasses}}" {{#if href}}href="{{href}}"{{/if}}>
    {{#if text}}<span {{#if text.className}}class={{text.className}}{{/if}} >{{text.label}}</span>{{/if}}
    {{#if img}}
        <img
            {{#if img.alt}}alt={{img.alt}} {{/if}}
            {{#if img.className}}class={{img.className}}{{/if}}
            {{#if img.src}}src={{img.src}} {{/if}}
        >
    {{/if}}
</a>`;