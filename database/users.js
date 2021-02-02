var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

// Schema stores username and password.
var userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true,
            minlength: 4,
            maxlength: 20
        },
        
        password: {
            type: String, 
            required: [true, 'Password required'], 
            minlength: 8, 
        },
        
    },schemaOptions);


    // Hashes the password before saving it in database
    userSchema.pre("save", function(next) {
        if(!this.isModified("password")) {
            return next();
        }
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    });

    // returns unhashed version of password to compare
    userSchema.methods.comparePassword = function(plaintext, callback) {
        return callback(null, bcrypt.compareSync(plaintext, this.password));
    };

var User = mongoose.model('User', userSchema);
module.exports = User;