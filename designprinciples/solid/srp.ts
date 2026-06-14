//each class have single responsibilys

class BreakBaker {
    breakBread() {
        console.log("order supplies")
    }
}
class InventoryManager {
    manageInventory() {
        console.log("order supplies")
    }
}
class SupplyOrder {
    orderSupplies() {
        console.log("order supplies")
    }

}
class Bakery {
    baker = new BreakBaker()
    inventoryManeger = new InventoryManager();
    supployOrder = new SupplyOrder()
}



