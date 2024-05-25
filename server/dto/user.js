class UserDTO{
    constructor(user){
        this._id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.fullname =user.name;
        this.profileImage = user.profileImage;
    }
}

module.exports = UserDTO