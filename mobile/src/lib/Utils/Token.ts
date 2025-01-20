export function IsTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
}

export function IsValidToken(token: string): boolean {
    try {
        // Split the JWT into its parts
        const [header, payload] = token.split(".");

        // Base64 URL decode
        const base64UrlDecode = (base64Url: string): string => {
            let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            while (base64.length % 4) {
                base64 += "=";
            }
            return atob(base64);
        };

        // Decode the payload
        const decodedPayload = JSON.parse(base64UrlDecode(payload));

        // Ensure the decoded payload has the 'exp' field (expiration timestamp)
        if (typeof decodedPayload.exp !== "number") {
            return false;
        }

        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

        // Check if the token has expired
        if (decodedPayload.exp < currentTime) {
            return false;
        }

        // If no issues, the token is valid
        return true;
    } catch (e) {
        return false;
    }
}

export function getID(token: string): number {
    const payload = token.split(".")[1];
    const paddedPayload = payload.padEnd(
        payload.length + ((4 - (payload.length % 4)) % 4),
        "="
    );
    const decodedPayload = JSON.parse(atob(paddedPayload));
    const sub = decodedPayload.sub;
    return sub;
}
