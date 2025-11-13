import mongoose from 'mongoose'
import crypto from 'crypto'
// Removed unused imports

const educationSchema = new mongoose.Schema({
    // Contact/User Fields
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    firstName: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last name is required'
    },
    
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    
    // General Fields (Fixed duplicate 'created' definition)
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    
    // 🛑 COMMENTED OUT: Authentication Fields (These require a password)
    /*
    hashed_password: {
        type: String,
        required: 'Password is required'
    },
    salt: String
    */
});

// 🛑 COMMENTED OUT: Virtual Field 'password' (This is what triggers the hashed_password requirement)
/*
educationSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password;
    });
*/

// 🛑 COMMENTED OUT: Validation (This enforces the password requirement)
/*
educationSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);
*/

// 🛑 COMMENTED OUT: Authentication Methods (These support the virtual field)
/*
educationSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}
*/

export default mongoose.model('Education', educationSchema);