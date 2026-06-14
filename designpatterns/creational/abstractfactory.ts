// Creates a family of related products that should work together.


// The Abstract Factory Pattern is useful when you need to create families of related objects without specifying their concrete classes.


interface Button {
    render(): void
}

interface Checkbox {
    render(): void
}

class WindowsButton implements Button {
    render(): void {
        console.log("button window rendered")
    }
}

class WindowCheckbox implements Checkbox {
    render(): void {
        console.log("Checkbox windows")
    }
}


class MacButton implements Button {
    render(): void {
        console.log("button macos rendered")
    }
}


class MacCheckBox implements Checkbox {
    render(): void {
        console.log("Checkbox os")
    }
}


interface UIFactory {
    createButton(): Button
    createCheckBox(): Checkbox
}


class WindowsUIFactory implements UIFactory {
    createButton(): Button {
        return new WindowsButton()
    }
    createCheckBox(): Checkbox {
        return new WindowCheckbox()
    }
}


class MacUIFactory implements UIFactory {
    createButton(): Button {
        return new MacButton()
    }
    createCheckBox(): Checkbox {
        return new MacCheckBox()
    }
}


class Application {
    constructor(private readonly factory: UIFactory) { }

    renderUI() {
        const button = this.factory.createButton();
        const checkbox = this.factory.createCheckBox();

        button.render()
        checkbox.render()
    }
}



const windowfactory = new WindowsUIFactory()
const app = new Application(windowfactory)
app.renderUI()