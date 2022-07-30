const AUTH = "auth"

const Auth = {

    signIn: (auth: any) => {
        localStorage.setItem(AUTH, JSON.stringify(auth));
    },
    signOut: () => {
        localStorage.removeItem(AUTH)
    },
    getAuth: () => {
        let authObj = localStorage.getItem(AUTH) as string
        return (authObj===null) ? null : JSON.parse(authObj);
    }
}

export default  Auth;