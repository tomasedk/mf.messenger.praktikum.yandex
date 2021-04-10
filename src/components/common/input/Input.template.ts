export const templateString = `<div class="input {{additionalClasses}}">
    <input class="input__value" id="{{id}}" name="{{id}}" placeholder=" " type="{{type}}">
    <label class="input__label" for="{{id}}">
        <span class="input__label-content-name">{{label}}</span>
    </label>
    <span class="error input__error">{{error}}</span>
</div>
`;
