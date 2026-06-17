//lets say we have auction
//leaving the details of notifying other bidders
//of user bid is not a good way its clutter

//reduces direct communication by introducing central mediator


interface AuctionMediator {
    registerBidder(bidder: Bidder): void
    placeBid(bidder: Bidder, amount: number): void
}


class AuctionHouse implements AuctionMediator {
    private bidders: Bidder[] = []

    registerBidder(bidder: Bidder): void {
        this.bidders.push(bidder)
    }

    placeBid(bidder: Bidder, amount: number): void {
        for (const b of this.bidders) {
            if (bidder != b) b.recieveBid(bidder, amount)
        }
    }
}



class Bidder {
    constructor(
        private readonly name: string,
        private readonly mediator: AuctionHouse
    ) {

    }

    getName(): string { return this.name }

    placeBid(amount: number) { this.mediator.placeBid(this, amount) }
    recieveBid(bidder: Bidder, amount: number) {
        console.log(this.name + "is notified:" + bidder.getName())
    }
}


const auctionHouse = new AuctionHouse()
const bidder1 = new Bidder("sonny", auctionHouse)
const bidder2 = new Bidder("neil", auctionHouse)
const bidder3 = new Bidder("vincent", auctionHouse)

bidder2.placeBid(500)