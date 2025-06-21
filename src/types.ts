export interface DiscordInfo {
    channels: Array<any>;
    id: string;
    instant_invite: string;
    members: Array<any>;
    name: string;
    presence_count: number;
}

export interface LiveServerInfo {
    data: ServerInfo;
    teams: {
        0?: Team;
        1?: Team;
        2?: Team;
        3?: Team;
        4?: Team;
    };
}

export interface Team {
    name: string;
    players: Array<RawPlayer>;
}

export interface RawPlayer {
    0: Array<string>;
    1: string;
    2: string;
}

export interface Player {
    clanIcon: string;
    name: string;
}

export interface ServerInfo {
    name: string;
    ip: string;
    world: string;
    cnum: number;
    vnum: number;
    cmax: number;
    time: number;
    drx: number;
    ver: string;
    gametype: string;
    needcmdr: number;
    pass: number;
    race1: string;
    race2: string;
    race3?: string;
    race4?: string;
    demo: number;
    pure: number;
    bal: number;
    timelimit: number;
    notes: string;
}

export interface LiveProps {
    background: string
    serverProp: string
}

export interface WeeklySnapshot {
    timestamp: number;
    online: number;
}

export interface YearlySnapshot {
    timestamp: number;
    online: number;
}

export interface MonthlySnapshot {
    timestamp: number;
    online: number;
}

export interface Activity {
    period: string,
    activities?: Array<ActivityUser>,
    activity_map?: {
        [key: string]: number
    }
}

export interface ActivityUser {
    userId: number,
    clanId?: number,
    clanTag?: string,
    displayName: string
}

export interface ExtendedGameResult extends GameResult {
    players: Array<EGRPlayer>;
    p_accuracies: Array<ACRPlayer>;
}

export interface ACRPlayer {
    name: string;
    clan_id: number;
    uid: number;
    accuracies: Array<AAccuracy>;
    generalDamage: number;
}

export interface AAccuracy {
    name: string;
    value: EGRAccuracy;
}

export interface EGRPlayer {
    accuracy: Array<EGRAccuracy>;
    clan_id: number;
    clan_tag_name: string;
    info: EGRInfo;
    name: string;
    uid: number;
}

export interface EGRAccuracy {
    damage: number;
    deaths: number;
    hits: number;
    kills: number;
    name: string;
    shots: number;
}

export interface EGRInfo {
    auto_buff: number;
    blocks: number;
    build: number;
    build_damage: number;
    build_kill: number;
    carn_hp: number;
    client_damage: number;
    deaths: number;
    experience: number;
    flag_capture: number;
    heal: number;
    jumps: number;
    kill_streak: number;
    kills: number;
    melee_kill: number;
    mine: number;
    money_gained: number;
    money_spent: number;
    npc_damage: number;
    npc_kill: number;
    on_team_time: number;
    order_give: number;
    order_obeyed: number;
    outpost_damage: number;
    peon_damage: number;
    peon_kill: number;
    ranged_kill: number;
    sacrifice: number;
    siege_kill: number;
}

export interface GameResult {
    game: GRGame;
    server_name: string;
    timestamp: number;
    winner: number;
}

export interface GRGame {
    game_state: number;
    game_time: number;
    map_name: string;
    online: number;
    teams: {
        0: GRTeam;
        1: GRTeam;
        2: GRTeam;
        3?: GRTeam;
        4?: GRTeam;
    }
    timestamp: number;
}

export interface GRTeam {
    players: Array<GRPlayer>;
    race: string;
    team_id: number;
    team_name: string;
    commander_name: string;
    commander_clan_id: number;
}

export interface GRPlayer {
    clan_id: number;
    clan_tag_name: string;
    connect_time: number;
    is_commander: boolean;
    name: string;
    on_team_time: number;
    uid: number;
    p: EGRPlayer;
}

export interface WSProps {
    players: Array<ACRPlayer>;
}

export interface LadderProps {
    body: any;
    week_name: string;
}

// ===============================================================================================
// Weekly Ladder  ================================================================================
// ===============================================================================================

export interface WeeklyLadder {
    week_name: string
    status: string
    players: {
        [key: number]: WPlayer
    }
    ladder: WLadder
}

export interface WPlayer {
    acc_damage: number
    accuracy: WPlayerAccuracy
    clan_id: number
    clan_tag_name: string
    comm_stats: {
        comm_draw: number
        comm_lose: number
        comm_points: number
        comm_wins: number
    }
    info: WLInfo
    name: string
    names: Array<WLNames>
    team_stats: {
        stats: {
            [key: number]: TeamStats
        }
    }
    uid: number
}

export interface WPlayerAccuracy {
    'Hatchet': WPlayerAccuracy
    'Saber': WPlayerAccuracy
    'Battle axe': WPlayerAccuracy
    'Hunting Bow': WPlayerAccuracy
    'Marksman\'s Bow': WPlayerAccuracy
    'Crossbow': WPlayerAccuracy
    'Scattergun': WPlayerAccuracy
    'Repeater': WPlayerAccuracy
    'Coil Rifle': WPlayerAccuracy
    'Discharger': WPlayerAccuracy
    'Flux Gun': WPlayerAccuracy
    'Pulse Cannon': WPlayerAccuracy
    'Incinerator': WPlayerAccuracy
    'Mortar': WPlayerAccuracy
    'Launcher': WPlayerAccuracy
    'Ballista Weapon': WPlayerAccuracy
    'Catapult Weapon': WPlayerAccuracy
    'Bone sword': WPlayerAccuracy
    'Stalker claws': WPlayerAccuracy
    'Predator claws': WPlayerAccuracy
    'Venomous': WPlayerAccuracy
    'Rabid': WPlayerAccuracy
    'Carnivorous': WPlayerAccuracy
    'Ember': WPlayerAccuracy
    'Blaze': WPlayerAccuracy
    'Fireball': WPlayerAccuracy
    'Frost Bolts': WPlayerAccuracy
    'Tempest': WPlayerAccuracy
    'Lightning': WPlayerAccuracy
    'Chaos Bolt': WPlayerAccuracy
    'Surge': WPlayerAccuracy
    'Rupture': WPlayerAccuracy
    'Summoner strike': WPlayerAccuracy
    'Uprooted Tree': WPlayerAccuracy
}

export interface TeamStats {
    games: number
    wins: number
    lose: number
    draw: number
}

export interface WLNames {
    usages: number
    name: string
}

export interface WLInfo extends EGRInfo {

}

export interface WPlayerAccuracy {
    damage: number
    deaths: number
    hits: number
    kills: number
    shots: number
}

export interface WLadder {
    damage: {
        acc_damage: any
        [key: string]: {
            [key: number]: LDamage
        }
    }
    info: {
        [key: string]: LInfo
    }
}

export interface SortedWeeklyLadder {
    week_name: string
    status: string
    players: {
        [key: number]: WPlayer
    }
    ladder: SortedWLadder
}

export interface SortedWLadder {
    damage: {
        acc_damage: any
        [key: string]: Array<LDamage>
    }
    info: {
        [key: string]: Array<SimpleLInfo>
    }
}

export interface LInfo {
    [key: number]: SimpleLInfo
}

export interface SimpleLInfo {
    clan_id: number
    item_value: number
    name: string
    uid: number
}

export interface LDamage {
    a_item_damage: number
    a_item_hits: number
    a_item_shots: number
    clan_id: number
    name: string
    uid: number
}

export interface LadderTopProps {
    sortedWeeklyLadder: SortedWeeklyLadder
}

export interface SearchableSSFPlayer {
    uid: number
    clan_id: number
    clan_tag_name: string
    name: string
}


// ===============================================================================================
// A2S Server Info / Valve  ======================================================================
// ===============================================================================================

export interface A2SPlayer {
    index: number
    name: string
    score: number
    duration: number
    deaths: number
    team: number
    clan: number
    is_comm: number
}

export interface A2SInfo {
    server_name: string
    server_ip: string
    port: number
    map_name: string
    game: string
    player_count: number
    max_players: number
    bot_count: number
    server_type: string
    platform: string
    password_protected: boolean
    version: string
    edf: number
    ping: number
}

export interface A2SResponse {
    info: A2SInfo
    players: Array<A2SPlayer>
}

export interface LiveServerProps {
    address: string
}

export interface SortedA2SPlayers {
    [index: string]: Array<A2SPlayer>
}


// ===============================================================================================
// Auth  =========================================================================================
// ===============================================================================================

export interface LoginProps {
    username: string
    password: string
    token: string,
    visitorId: string
}

export interface RegistrationProps {
    userName: string
    password: string
    displayName: string
    token: string,
    visitorId: string
}

export interface Credentials {
    id: number
    display_name: string
    created: string
    last_online: string
    proof: string
    auth: string
}

export interface OAuthResponse {
    tokenType: string
    accessToken: string
}

export interface BaseContainerProps {
    header?: any
    body?: any
    footer?: any
}

export interface BearerToken {
    roles: Array<string>
    aud: string
    exp: number
    iat: number
    iss: string
    name: string
    sub: string
    metadata: Array<any>
}

export interface AuthState {
    isLoggedIn: boolean
    token: BearerToken | null
}

export interface DisplayNameResponse {
    display_name: string | null
    is_available: boolean
}

export interface EmailConfirmationProps {
    username: string
    password: string
    mail_token: string
}

export interface EmailTokenRenewProps {
    username: string
    password: string
}

export interface RegEmailFormProps {
    disableFields: boolean
    email: string | null
    password: string | null
}

export interface RegistrationFormProps {
    displayName: string
}

export interface UserServer {
    id: number,
    current_map: string
    current_player_count: string,
    description: string,
    display_name: string,
    game_type: string,
    host_name: string,
    max_player_count: number,
    port: number
    updated: string
}

export interface CreateUpdateServer {
    description: string,
    display_name: string,
    game_type: string,
    host_name: string,
    max_player_count: number,
    port: number
}

export interface UserServersList {
    servers_limit: number,
    servers: Array<UserServer>
}

export interface ServerCredentials {
    username: number,
    password: string
}