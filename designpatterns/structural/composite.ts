/*
composite pattern is a structural design pattern
that lets you treat individual objects
and group of objects uniformly
*/

//common interface
interface FileSystemItem {
    show(indent?: string): void
}

export class File implements FileSystemItem {
    constructor(private name: string) { }

    show(indent: string = ""): void {
        console.log(indent + this.name)
    }
}


export class Folder implements FileSystemItem {
    private children: FileSystemItem[] = []
    constructor(private name: string) { }

    add(item: FileSystemItem) {
        this.children.push(item)
    }

    remove(item: FileSystemItem) {
        this.children = this.children.filter(child => child !== item)
    }

    show(indent: string = "") {
        console.log(indent + this.name)

        for (const child of this.children) {
            child.show(indent + " ")
        }
    }
}


function main() {
    const resume = new File("resume.pdf")
    const notes = new File("notes.txt")
    const vacation = new Folder("Vacation");
    vacation.add(new File("Goa.png"));

    const pictures = new Folder("Pictures");
    pictures.add(new File("Photo1.jpg"));
    pictures.add(vacation);


    const documents = new Folder("Documents");
    documents.add(resume);
    documents.add(notes);


    const root = new Folder("root")
    root.add(documents)
    root.add(pictures)
}