//Every state supports the same operations.

interface MusicState {
    play(context: MusicContext): void
    pause(context: MusicContext): void
    stop(context: MusicContext): void
    getName(): string
}

class PlayingState implements MusicState {
    play(context: MusicContext) {
        console.log("Already Playing")
    }

    pause(context: MusicContext): void {
        console.log("Pausing")
        context.setState(new PauseState())

    }

    stop(context: MusicContext): void {
        console.log("Stopping music")
        context.setState(new StoppedState())
    }
    getName() { return "Playing" }
}



class PauseState implements MusicState {
    play(context: MusicContext) {
        console.log("Started Playing")
        context.setState(new PlayingState())
    }

    pause(context: MusicContext): void {
        console.log("Already Paused")
    }

    stop(context: MusicContext): void {
        console.log("Stopping music")
        context.setState(new StoppedState())
    }
    getName() { return "Paused" }
}

class StoppedState implements MusicState {
    play(context: MusicContext) {
        console.log("Started Playing")
        context.setState(new PlayingState())
    }

    pause(context: MusicContext): void {
        console.log("Music is Not Playing   ")
        //  context.setState(new PauseState())
    }

    stop(context: MusicContext): void {
        console.log("Already Stopped")
    }
    getName() { return "Stopped" }
}

export class MusicContext {
    private state: MusicState
    constructor() {
        this.state = new StoppedState()
    }

    setState(state: MusicState) {
        this.state = state;
    }


    play() { this.state.play(this) }

    pause() { this.state.pause(this) }

    stop() { this.state.stop(this) }

    getState(): string {
        return this.state.getName()
    }
}



const player = new MusicContext();

player.play()
player.pause()
player.play()
player.stop()