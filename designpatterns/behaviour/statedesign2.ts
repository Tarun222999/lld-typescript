//finite state implementation

interface MusicAction {
    next(context: MusicContext): void;
    getCurrentState(): string
}


class PlayAction implements MusicAction {
    next(context: MusicContext): void {
        context.setAction(new PauseAction())
    }

    getCurrentState(): string {
        return "Playing"
    }

}

class StoppedAction implements MusicAction {
    next(context: MusicContext): void {
        context.setAction(new PlayAction())
    }

    getCurrentState(): string {
        return "Stopped"
    }

}

class PauseAction implements MusicAction {
    next(context: MusicContext): void {
        context.setAction(new StoppedAction())
    }

    getCurrentState(): string {
        return "Pause"
    }

}

class MusicContext {
    constructor(private currentAction = new StoppedAction()) {

    }

    setAction(action: MusicAction) { this.currentAction = action }

    next() { this.currentAction.next(this) }

    getCurrentState(): string { return this.currentAction.getCurrentState() }
}