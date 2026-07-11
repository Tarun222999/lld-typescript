class User {
    constructor(id: string, name: string, email: string) { }
}


class Admin extends User {
    isAdmin = true
    constructor(id: string, name: string, email: string) {
        super(id, name, email)
    }
}

class UserManagement {

    constructor(user: User[]) { }

    createUser() { }
    editUser() { }
    updateUser() { }
}

class Role {
    constructor(roleName: string, permissions: Permission[]) { }
}


class RoleManagement {
    roles: Role[] = []
    constructor() { }
    createRole() {
        //create and push
    }
    updateRole() { }
    deleteRole() { }
}

interface Observer {
    record(event)
}

//inject audit logger wherever need to use it
class AuditLogger implements Observer {
    record(event: any) {

    }
}

export class Cache {

}


class Permission {
    constructor(permission: string) { }
}

class Resource {
    //create resource with permissions
    constructor(permission: Permission[]) { }
}


class IAM {

    hasPermission(userId, resource, action) {

    }
}