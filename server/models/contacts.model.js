import mongoose from 'mongoose'
import crypto from 'crypto'

// Utility function (if needed for hashing later, but not for a simple contact)
// const { createHmac, randomBytes } = await import('crypto')

const contactsSchema = new mongoose.Schema({
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
    // Adding optional fields based on your Postman samples
    phone: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    // Adding a general created date field is good practice for contacts
    created: {
        type: Date,
        default: Date.now
    },
    created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  salt: String
});
contactsSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
    //this.hashed_password = password;
  })
  .get(function() {
    return this._password;
  });
contactsSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);
contactsSchema.methods = {
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
//module.exports = mongoose.model('User', UserSchema);

export default mongoose.model('Contact', contactsSchema);
