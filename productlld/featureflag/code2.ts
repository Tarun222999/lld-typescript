

type Env = "DV" | "QAS" | "PRD"



class User {
    constructor(name, email) {

    }
}

class Admin extends User {

}


class Group {
    constructor(userIds: Set<string>) { }
}

interface Rule {
    matches(user: UserContext): boolean
}

class EnvironmentRule implements Rule { }
class GroupRule implements Rule { }
class RolloutRule implements Rule { }





class FeatureFlag {
    constructor(key, name, enabled, rules: Rule[]) { }
}


//admin can do crud operations
class FeatureFlagService {
    fflags: FeatureFlag[] = []
    observers: Observer[] = []
    constructor() { }

    create(name, toggle, properties) {

        //upon doing something update observer(audit logger)
    }
    update() { }
    delete() { }
    addRules() { }
    getFlag() { }
}



class UserContext {
    constructor(id, region, country, env, groups)
}




class FeatureFlagEvaluator {
    constructor(
        service: FeatureFlagService
    ) {

    }
    isEnable(key: string, userConfig: UserConfig): boolean {
        //get the feature flag
        //check the rules 
        //return result

        //use cache check first
        //if miss service checl

        const flag = service.getFlag(key)

        if (!flag.enable) {
            return false
        }

        for (const rule of flag.rules) {
            if (!rule.matches(context)) {
                return false
            }
        }

        return false
    }


}



interface Observer {
    observe(event): void
}


interface AuditLogger implements Observer {
    observe(event){
    //log detfails
}
}



class FeatureFlagCache {
    private cache = new Map<string, FeatureFlag>();

    get(key: string): FeatureFlag { }

    put(flag: FeatureFlag) { }

    invalidate(key: string) { }
}