enum TeamRole {
    OWNER,
    ADMIN,
    MEMBER
}

enum InviteStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED,
    EXPIRED
}

class User {
    constructor(
        public id: string,
        public name: string,
        public email: string
    ) { }
}

class TeamMember {
    constructor(
        public userId: string,
        public role: TeamRole,
        public joinedAt: Date = new Date()
    ) { }
}

class Team {

    members = new Map<string, TeamMember>();

    constructor(
        public id: string,
        public name: string
    ) { }

    addMember(member: TeamMember) {
        if (this.members.has(member.userId))
            throw new Error("Already member");

        this.members.set(member.userId, member);
    }

    removeMember(userId: string) {
        this.members.delete(userId);
    }

    hasMember(userId: string) {
        return this.members.has(userId);
    }

    promoteAdmin(userId: string) {

        const newAdmin = this.members.get(userId);

        if (!newAdmin)
            throw new Error("User not found");

        for (const member of this.members.values()) {
            if (member.role === TeamRole.ADMIN)
                member.role = TeamRole.MEMBER;
        }

        newAdmin.role = TeamRole.ADMIN;
    }

    printMembers() {

        console.log(`\n===== ${this.name} =====`);

        for (const member of this.members.values()) {
            console.log(
                member.userId,
                TeamRole[member.role]
            );
        }
    }
}

class Invitation {

    constructor(
        public id: string,
        public teamId: string,
        public email: string,
        public invitedBy: string,
        public token: string,
        public status: InviteStatus = InviteStatus.PENDING,
        public expiry: Date = new Date(Date.now() + 24 * 60 * 60 * 1000)
    ) { }
}

/* ---------------- Repository ---------------- */

class TeamRepository {

    private teams = new Map<string, Team>();

    save(team: Team) {
        this.teams.set(team.id, team);
    }

    findById(id: string) {
        return this.teams.get(id);
    }
}

class UserRepository {

    private users = new Map<string, User>();

    save(user: User) {
        this.users.set(user.id, user);
    }

    findByEmail(email: string) {

        for (const user of this.users.values()) {
            if (user.email === email)
                return user;
        }

        return undefined;
    }
}

class InvitationRepository {

    private invites = new Map<string, Invitation>();

    save(invite: Invitation) {
        this.invites.set(invite.token, invite);
    }

    findByToken(token: string) {
        return this.invites.get(token);
    }
}

/* ---------------- Strategy ---------------- */

interface InviteStrategy {

    send(invitation: Invitation): void;

}

class EmailStrategy implements InviteStrategy {

    send(invitation: Invitation): void {

        console.log(
            `Email sent to ${invitation.email}`
        );

        console.log(
            `Token : ${invitation.token}`
        );
    }
}

/* ---------------- Team Service ---------------- */

class TeamService {

    constructor(
        private teamRepo: TeamRepository
    ) { }

    createTeam(team: Team) {
        this.teamRepo.save(team);
    }

    addMember(teamId: string, member: TeamMember) {

        const team = this.teamRepo.findById(teamId);

        if (!team)
            throw new Error("Team not found");

        team.addMember(member);

        this.teamRepo.save(team);
    }

    promoteAdmin(teamId: string, userId: string) {

        const team = this.teamRepo.findById(teamId);

        if (!team)
            throw new Error("Team not found");

        team.promoteAdmin(userId);

        this.teamRepo.save(team);
    }

    getTeam(teamId: string) {
        return this.teamRepo.findById(teamId);
    }
}

/* ---------------- Invite Service ---------------- */

class InviteService {

    constructor(
        private inviteRepo: InvitationRepository,
        private userRepo: UserRepository,
        private teamService: TeamService
    ) { }

    sendInvite(

        teamId: string,
        email: string,
        invitedBy: string,
        strategy: InviteStrategy

    ) {

        const invite = new Invitation(

            crypto.randomUUID(),
            teamId,
            email,
            invitedBy,
            crypto.randomUUID()

        );

        this.inviteRepo.save(invite);

        strategy.send(invite);
    }

    acceptInvite(token: string) {

        const invite = this.inviteRepo.findByToken(token);

        if (!invite)
            throw new Error("Invite not found");

        if (invite.status != InviteStatus.PENDING)
            throw new Error("Invalid Invite");

        if (invite.expiry < new Date())
            throw new Error("Invite expired");

        const user = this.userRepo.findByEmail(invite.email);

        if (!user)
            throw new Error("User not found");

        this.teamService.addMember(

            invite.teamId,

            new TeamMember(
                user.id,
                TeamRole.MEMBER
            )

        );

        invite.status = InviteStatus.ACCEPTED;

        console.log(
            `${user.name} joined the team`
        );
    }
}

/* ---------------- Driver ---------------- */

const userRepo = new UserRepository();
const teamRepo = new TeamRepository();
const inviteRepo = new InvitationRepository();

const teamService = new TeamService(teamRepo);

const inviteService = new InviteService(

    inviteRepo,
    userRepo,
    teamService

);

const owner = new User(
    "u1",
    "Tarun",
    "tarun@gmail.com"
);

const bob = new User(
    "u2",
    "Bob",
    "bob@gmail.com"
);

userRepo.save(owner);
userRepo.save(bob);

const team = new Team(
    "t1",
    "Backend Team"
);

teamService.createTeam(team);

teamService.addMember(
    "t1",
    new TeamMember(owner.id, TeamRole.OWNER)
);

inviteService.sendInvite(
    "t1",
    "bob@gmail.com",
    owner.id,
    new EmailStrategy()
);

// Normally user clicks the email.
// Here we fetch token directly.

const token = [...(inviteRepo as any).invites.keys()][0];

inviteService.acceptInvite(token);

teamService.promoteAdmin(
    "t1",
    "u2"
);

teamService.getTeam("t1")?.printMembers();