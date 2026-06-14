interface PayMentProcessor {

}

interface TaxCalucalator {

}

interface RegionFactory {
    proccessor(): PayMentProcessor
    taxCalucalator(): TaxCalucalator
}

class UPIProcessor implements PayMentProcessor { }
class UPITaxCal implements TaxCalucalator { }


class IndiaFactory implements RegionFactory {
    proccessor(): PayMentProcessor {
        return new UPIProcessor()
    }

    taxCalucalator(): TaxCalucalator {
        return new UPITaxCal()
    }
}

