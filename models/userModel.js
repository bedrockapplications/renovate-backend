const mongoose = require("mongoose");

const secQuesSchema = mongoose.Schema(
    {
      schoolName: String,
      bornCity: String,
    },
    { _id: false }
  );

const companySchema = mongoose.Schema(
    {
      companyName: String,
      companyPhNumber: Number,
      companycurrentAddress: {
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
      },
      emergencyContact: {
        fullName: String,
        contactNum: Number,
        relationship: String,
      },
    },
    { _id: false }
  );

const billingSchema = mongoose.Schema(
    {
      achRoutingNumber: Number,
      achAccountNumber: Number,
      BillingAddress: {
        street: {type:String},
        city: {type:String},
        state: {type:String},
        zipcode: {type:String},
        country: {type:String},
      },
      BillingContact: {
        fullName:{type:String},
        contactNum:{type: Number},
        billEmail: {type:String},
      },
    },
    { _id: false }
  );

const userSchema = new mongoose.Schema(
  {
    // firstName: {
    //   type: String,
    //   required: [true, "please add a firstname"],
    // },
    // lastName: {
    //   type: String,
    //   required: [true, "please add a lastname"],
    // },
    fullName:{type: String,},
    email: {
      type: String,
      required: [true, "please add a email"],
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "please add a Phone Number"],
    },
    profilePic:{type: String},
    role: {
        type: String, enum:["owner","contractor"],
    },
    organizationName:{type: String, },
    ownerId: { type: mongoose.Schema.Types.ObjectId }, // ref: "br_user_profile"
    resetPassword:{
      type: Boolean,
      default: false
    },
    servicesProvided:[{type: String,}],
    updateDetail:{
      type: Boolean,
      default: true
    },
    securityQuestions:{
      questionId:{ type: mongoose.Schema.Types.ObjectId },
      answer:{
        type: String
      }
    },

    // securityQuestions: secQuesSchema,

    // TODO need check to see it can be made as a saparate collection
    companyInformation: companySchema,
    // billingInformation: billingSchema,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("br_user_profile", userSchema);
