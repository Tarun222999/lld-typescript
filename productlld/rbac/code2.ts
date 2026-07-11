// ---------- ENUMS ----------

enum Resource {
    USER = "USER",
    PROJECT = "PROJECT",
    ORDER = "ORDER"
}

enum Action {
    READ = "READ",
    WRITE = "WRITE",
    DELETE = "DELETE"
}

// ---------- DOMAIN ----------

class Permission {

    constructor(
        public resource: Resource,
        public action: Action
    ) { }

    key() {
        return `${this.resource}:${this.action}`;
    }
}

class Role {

    permissions = new Set<Permission>();

    constructor(
        public id: string,
        public name: string
    ) { }

    addPermission(permission: Permission) {
        this.permissions.add(permission);
    }

    removePermission(permission: Permission) {
        this.permissions.delete(permission);
    }
}

class User {

    roles = new Set<Role>();

    constructor(
        public id: string,
        public name: string,
        public email: string
    ) { }

    assignRole(role: Role) {
        this.roles.add(role);
    }

    removeRole(role: Role) {
        this.roles.delete(role);
    }
}

// ---------- OBSERVER ----------

interface Observer {
    update(event: string): void;
}

class AuditLogger implements Observer {

    update(event: string): void {
        console.log("[AUDIT]", event);
    }

}

// ---------- SERVICES ----------

class UserService {

    private users = new Map<string, User>();

    constructor(private logger: Observer) { }

    createUser(user: User) {

        this.users.set(user.id, user);

        this.logger.update(`User Created : ${user.name}`);
    }

    getUser(id: string) {
        return this.users.get(id);
    }
}

class RoleService {

    private roles = new Map<string, Role>();

    constructor(private logger: Observer) { }

    createRole(role: Role) {

        this.roles.set(role.id, role);

        this.logger.update(`Role Created : ${role.name}`);
    }

    getRole(id: string) {
        return this.roles.get(id);
    }
}

class AssignmentService {

    constructor(
        private cache: PermissionCache,
        private logger: Observer
    ) { }

    assignRole(user: User, role: Role) {

        user.assignRole(role);

        this.cache.invalidate(user.id);

        this.logger.update(`${role.name} assigned to ${user.name}`);
    }

    removeRole(user: User, role: Role) {

        user.removeRole(role);

        this.cache.invalidate(user.id);

        this.logger.update(`${role.name} removed from ${user.name}`);
    }

}

// ---------- CACHE ----------

class PermissionCache {

    // userId -> Permission Keys

    private cache = new Map<string, Set<string>>();

    get(userId: string) {
        return this.cache.get(userId);
    }

    put(userId: string, permissions: Set<string>) {
        this.cache.set(userId, permissions);
    }

    invalidate(userId: string) {
        this.cache.delete(userId);
    }

}

// ---------- IAM ----------

class IAM {

    constructor(
        private userService: UserService,
        private cache: PermissionCache
    ) { }

    hasPermission(
        userId: string,
        resource: Resource,
        action: Action
    ): boolean {

        let permissions = this.cache.get(userId);

        // cache miss

        if (!permissions) {

            const user = this.userService.getUser(userId);

            if (!user)
                return false;

            permissions = new Set<string>();

            for (const role of user.roles) {

                for (const permission of role.permissions) {

                    permissions.add(permission.key());

                }
            }

            this.cache.put(userId, permissions);
        }

        return permissions.has(`${resource}:${action}`);
    }

}

// ---------------------- DEMO ----------------------

const logger = new AuditLogger();

const cache = new PermissionCache();

const userService = new UserService(logger);

const roleService = new RoleService(logger);

const assignmentService =
    new AssignmentService(cache, logger);

const iam = new IAM(userService, cache);

// permissions

const readProject =
    new Permission(Resource.PROJECT, Action.READ);

const writeProject =
    new Permission(Resource.PROJECT, Action.WRITE);

const deleteProject =
    new Permission(Resource.PROJECT, Action.DELETE);

// roles

const admin =
    new Role("r1", "Admin");

admin.addPermission(readProject);
admin.addPermission(writeProject);
admin.addPermission(deleteProject);

const employee =
    new Role("r2", "Employee");

employee.addPermission(readProject);

roleService.createRole(admin);
roleService.createRole(employee);

// user

const tarun =
    new User("u1", "Tarun", "abc@gmail.com");

userService.createUser(tarun);

// assign role

assignmentService.assignRole(tarun, employee);

console.log(
    iam.hasPermission(
        "u1",
        Resource.PROJECT,
        Action.READ
    )
);

console.log(
    iam.hasPermission(
        "u1",
        Resource.PROJECT,
        Action.DELETE
    )
);

// assign admin

assignmentService.assignRole(tarun, admin);

console.log(
    iam.hasPermission(
        "u1",
        Resource.PROJECT,
        Action.DELETE
    )
);