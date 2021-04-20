import Auth from "@aws-amplify/auth"

const signOut = () => {
    Auth.signOut();
}




export default signOut;

