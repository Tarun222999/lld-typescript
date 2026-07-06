interface Image {
    display(): void
}

class RealImage implements Image {
    constructor(private readonly fileName: string) {
        this.loadFromDisk()
    }

    private loadFromDisk() {
        console.log(`Loading ${this.fileName} from Disk`)
    }

    display(): void {
        console.log(`Displaying ${this.fileName}`)
    }
}


class ProxyImage implements Image {
    private realImage?: RealImage
    constructor(private filename: string) { }

    display(): void {
        if (!this.realImage) {
            this.realImage = new RealImage(this.filename);
        }
        this.realImage.display();
    }
}


const image = new ProxyImage("vacation.jpg");

console.log("Image created");

image.display();
image.display();