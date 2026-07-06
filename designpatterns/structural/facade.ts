class AuthService {
    authenticate(user: string) {
        console.log(`${user} authenticated`)
    }
}

class SubscriptionService {
    validate(user: string) {
        console.log(`Subscription valid for ${user}`);
    }
}

class VideoService {
    start(movie: string) {
        console.log(`Streaming ${movie}`);
    }
}

class AnalyticsService {
    track(movie: string) {
        console.log(`Tracking watch event for ${movie}`);
    }
}


class MovieFacade {
    constructor(
        private auth: AuthService,
        private subscription: SubscriptionService,
        private video: VideoService,
        private analytics: AnalyticsService
    ) {

    }

    watchMovie(user: string, movie: string) {
        this.auth.authenticate(user)
        this.subscription.validate(user)
        this.video.start(movie)
        this.analytics.track(movie)
    }
}

const facade = new MovieFacade(
    new AuthService(),
    new SubscriptionService(),
    new VideoService(),
    new AnalyticsService()
)

facade.watchMovie("Tarun", "Heat")


/*
facade vs adapter
facade
    simplifies a subsytem 
    focuses on ease of use
    new api for complexity
    client could use subsytem directly 

adapter
    converts into one interface into another
    focuses on compatibitlity 
    Client uses adapter because original interface doesn't fit

*/