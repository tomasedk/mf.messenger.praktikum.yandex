export const templateString = `<div class="modal {{additionalClasses}}">
    <div class="modal__content">
        <div class="modal__header">{{title}}</div>
        <form action="#" class="{{formClass}}" enctype="multipart/form-data">
<!--            <div class="modal__body">-->
                <div data-set-id="{{body}}"></div>
<!--            </div>-->
            <div class="modal__footer">
                <div data-set-id="{{footer}}"></div>
            </div>
        </form>
    </div>
</div>`
