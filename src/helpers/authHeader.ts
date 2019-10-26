let user: IUser | null = null;
let retrievedUser: string | null = localStorage.getItem("user");
if (retrievedUser) {
    user = JSON.parse(retrievedUser);
}

export default {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: user ? `Bearer ${user.token}` : ""
};