//enum
enum TeamRole {
    OWNER,
    ADMIN,
    MEMBER
}

enum InviteeStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED,
    EXPIRED
}

class User {
    constructor(name: string, id: string, email: string) { }
}

class TeamMember {
    constructor(userId: string, role: TeamRole, joinedAt: Date) { }
}

class Team {
    members: Map<string, TeamMember>

    promoteAdmin(userId) {

    }

    addMember(member)

    removeMember(userId)

    getMember(userId)

    hasMember(userId)
}


class TeamManagementService {
    teams: Team[] = []

    constructor(inviteService: InviteeService) { }
    addToTeam(user, team) {
        //on sucess call invite service to send 
    }

    removeFromTeam() { }

    promoteadmin() {
        //check user exists promote admin
    }

}


interface InviteStategy {
    send(invitation: Invitation) {

}
}

class EmailService implements InviteStategy {
    invite(user: User): void {
        //send email
    }
}


class Invitation {
    id,teamId,email,inviteBy,status,expiry, token
}

class InviteeService {
    invites: Invitation[] = []
    constructor(teamService: TeamManagementService) { }

    sendInvite(strategy: InviteStategy, user: User) {
        strategy.invite(user)
    }

    onUserAccepted(user, team) {
        //add to team
    }
}