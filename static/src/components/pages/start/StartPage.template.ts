export const templateString = `<form action="#" class="start-form">
    <h1 class="header start-form__header {{header.classModificator}}">{{header.text}}</h1>
    
    <div data-set-id="{{fields}}"></div>

    <div data-set-id="{{submitButtonId}}"></div>
    <nav>
        <div data-set-id="{{linkId}}"></div>
    </nav>
</form>`
