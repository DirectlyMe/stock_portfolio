interface Account {
    type: string;
    username: string;
    accountId: number;
    accountAuth: ExternalAccountAuth;
}

interface ExternalAccountAuth {
    expires_in: string;
    token_type: string;
    scope: string;
    refresh_token: string;
    mfa_code: string;
    mfa_required: boolean;
    backup_code: string;
    access_token: string|null;
}

interface AccountType {
    typeId: number;
    name: string;
    connectionUrl: string;
}

interface StoredAccounts {
    accounts: Account[]
}