const AUTH = "auth"

const Auth = {

    signIn: (auth: any) => {
        localStorage.setItem(AUTH, JSON.stringify(auth));
        return true
    },
    signOut: () => {
        const items = { ...localStorage };
        for (const key in items) {
            localStorage.removeItem(key)
        }
        localStorage.removeItem(AUTH)
        localStorage.removeItem("token")
        return true
    },
    getAuth: () => {
        let authObj = localStorage.getItem(AUTH) as string
        return (authObj===null) ? null : JSON.parse(authObj);
    },
    getAuthToken: () => {
        return localStorage.getItem("token")
    },
    isAuthenticated: () => {
        let authObj = localStorage.getItem(AUTH)
        return (authObj!==null)
    }
}

export default  Auth;