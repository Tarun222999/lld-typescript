

type Env = "DV" | "QAS" | "PRD"



class User {
    constructor(name, email) {

    }
}

class Admin extends User {

}


//storing duplicate user objects can we avoid
class Group {
    constructor(users: User[]) { }
}

//this is becoming god object can we avoid
class Properties {
    constructor(
        targetEnv?: Env[],
        targetGroups?: Group[],
        rollOutPercentage?: number
    ) { }
}


class FeatureFlag {
    constructor(key, name, enabled, properties: Properties) { }
}


//admin can do crud operations
//need better class name
class FeatureFlagManagement {
    fflags: FeatureFlag[] = []
    constructor() { }

    create(name, toggle, properties) { }
    update() { }
    delete() { }
}


//need betterame
class UserConfig {
    constructor(id, region, country)
}

interface EvalutionStrategy {
    evaluate(flag: FeatureFlag, userConfig: UserConfig): boolean
}

/*
RegionAndGroupStrategy

RegionAndRolloutStrategy

RegionAndGroupAndRolloutStrategy

*/

class RegionBased implements EvalutionStrategy {

    evaluate(flag: FeatureFlag): boolean {
        //only true with all the properies,and also user in same regions
    }
}
class System {
    constructor(
        fmgnt: FeatureFlagManagement,
        admins: Admin[],
        private stargey: EvalutionStrategy
    ) {

    }
    getFeatureToggle(key: string, userConfig: UserConfig): boolean {

    }

    //only allow admins similar for rest of crud
    createFeatureFlag() { }


    //change stragey when needed
    setStrategy(strategy: EvalutionStrategy) { this.stargey = strategy }
}