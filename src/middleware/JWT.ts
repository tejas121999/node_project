import { sign, verify } from "jsonwebtoken"

export const createToken = (user: any) => {
    const accessToken = sign(
        { username: user.username, id: user.id },
        "jwtsecretplschange",
        { expiresIn: '24h' }
    )
    return accessToken;
}

export const validateToken = (req: any, res: any, next: any) => {
    const accessToken = req.header('x-auth-token');
    console.log("accessToken", accessToken)
    if (!accessToken)
        return res.status(401).json({ error: "User not Authenticated!" });
    try {
        const validToken = verify(accessToken, "jwtsecretplschange");
        console.log("validToken", validToken)
        if (validToken) {
            req.authenticated = true;
            req.user =
                validToken
            return next();
        }
    } catch (err) {
        return res.status(401).json({ error: err });
    }
}

