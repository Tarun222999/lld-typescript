abstract class Button {
    abstract onClick(): void
}


class SubmitButton extends Button {
    onClick(): void {
        console.log("submit")
    }
}


class CancelButton extends Button {
    onClick(): void {
        console.log("cancel")
    }
}


function main() {
    const submit: Button = new SubmitButton();
    const cancel: Button = new CancelButton();
    submit.onClick(); cancel.onClick();


}