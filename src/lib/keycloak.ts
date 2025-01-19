const getAdminToken = async () => {
    try {
        const response = await fetch(process.env.AUTH_KEYCLOAK_TOKEN_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.AUTH_KEYCLOAK_ID!,
                client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
                scope: 'openid'
            })
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed to get admin token: ${text}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Admin token error:', error);
        return null;
    }
};

export const createKeycloakUser = async (userData: any) => {
    const adminToken = await getAdminToken();
    if (!adminToken) throw new Error('Failed to get admin token');

    // Fix the URL format by removing /realms/ from the admin endpoint
    const realmName = process.env.AUTH_KEYCLOAK_ISSUER!.split('/realms/')[1];
    const adminUrl = `${process.env.AUTH_KEYCLOAK_ISSUER!.split('/realms/')[0]}/admin/realms/${realmName}/users`;

    const response = await fetch(adminUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            enabled: true,
            emailVerified: true,
            firstName: userData.firstName,
            lastName: userData.lastName,
            credentials: [{
                type: "password",
                value: userData.credentials.value,
                temporary: false
            }]
        })
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('Registration response:', error);
        throw new Error(`Failed to create user: ${error}`);
    }

    return true;
};
