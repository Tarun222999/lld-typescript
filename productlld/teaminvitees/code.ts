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
    team_members: TeamMember[] = []
    admin: string = "admin_id"


    saveMember() {

    }

    deleteMember() {

    }

    promoteAdmin() {
        //remove previous admin
        //make the new one
    }
}


class TeamManagementService {
    teams: Team[] = []

    constructor(inviteService: InviteeService) { }
    addToTeam(user, team) {
        // when called by user need to check if its called by owner only
        // add the user to team
        //on sucess call invite service to send 
    }

    removeFromTeam() { }

    promoteadmin() {
        //check user exists promote admin
    }

}


class InviteStategy {
    invite(user: User) {

    }
}

class EmailService implements InviteStategy {
    invite(user: User): void {
        //send email
    }
}


class InviteeService {
    sendInvite(strategy: InviteStategy, user: User) {
        strategy.invite(user)
    }
}