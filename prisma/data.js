const bcrypt = require('bcryptjs');

const user = [
  {
    email: "clientuser1@gmail.com",
    password: bcrypt.hashSync("password1", 8),
    type: "Client"  
  },
  {
    email: "clientuser2@gmail.com",
    password: bcrypt.hashSync("password1", 8),
    type: "Client"  
  },
  {
    email: "modeluser1@gmail.com",
    password: bcrypt.hashSync("password1", 8),
    type: "Model"  
  },
  {
    email: "modeluser2@gmail.com",
    password: bcrypt.hashSync("password1", 8),
    type: "Model"  
  }
];

const client = (user1, user2) => {
  return [
    {
      userId: user1.id,
      companyName: "Stars aligned",
      phone: "02334669933",
      social: {"facebook": "www.facebook.com/newClient1"},
      state: "Lagos",
      country: "Nigeria",
      address: "No 16, Staten cruise Street"
    },
    {
      userId: user2.id,
      companyName: "Top Notch Stars",
      phone: "02334343434",
      social: {"facebook": "www.facebook.com/newClient2"},
      state: "Lagos",
      country: "Nigeria",
      address: "No 13, Celestial road Igando"
    },
  ];
}


const model = (user1, user2) => {
  return [
    {
      userId: user1.id,
      firstname: "Sandra",
      lastname: "McQueen",
      gender: "Male",
      height: 182,
      bust: 34,
      waist: 26,
      hip: 34,
      shoeSize: 39,
      weight: 66,
      complexion: "Dark",
      dob: new Date("2001-01-06"),
      social: {"facebook": "www.facebook.com/newmodel1"},
      state: "Lagos",
      country: "Nigeria",
      address: "No 13, Celestial road Igando"
    },
    {
      userId: user2.id,
      firstname: "Lira",
      lastname: "Shannon",
      gender: "Female",
      height: 182,
      bust: 42,
      waist: 22,
      hip: 44,
      shoeSize: 41,
      weight: 72,
      complexion: "Light",
      dob: new Date("2002-05-07"),
      social: {"facebook": "www.facebook.com/newmodel2"},
      state: "Lagos",
      country: "Nigeria",
      address: "No 13, Celestial road Igando"
    }
  ]
}

const contract = (client, model, jobs) => {
  return [
    {
      clientId: client[0].id,
      modelId: model[0].id,
      jobId: jobs[0].id
    },
    {
      clientId: client[0].id,
      modelId: model[0].id,
      jobId: jobs[0].id
    },
  ];
}

const job = (client1, client2) => {
  return [
    {
      clientId: client1.id,
      jobRole: "Glamour model",
      jobDescription: "A modelling job for a glamour magazine.",
      locations: "Lekki phase 1",
      fee: 50000,
      jobType: "Glamour",
      jobLength: "2 days"
    },
    {
      clientId: client1.id,
      jobRole: "Fitness",
      jobDescription: "A fitness shoot.",
      locations: "Ajah",
      fee: 70000,
      jobType: "Fitness",
      jobLength: "1 day"
    },
    {
      clientId: client1.id,
      jobRole: "Promotional model",
      jobDescription: "Promotional",
      locations: "Victoria Island",
      fee: 200000,
      jobType: "Promotional",
      jobLength: "5 days"
    },
    {
      clientId: client2.id,
      jobRole: "Plus size model",
      jobDescription: "A plus size shoot for a clothing line.",
      locations: "Ikoyi",
      fee: 450000,
      jobType: "PLus size",
      jobLength: "1 day"
    },
    {
      clientId: client2.id,
      jobRole: "child model",
      jobDescription: "Child modelling",
      locations: "Lekki phase 1",
      fee: 50000,
      jobType: "child",
      jobLength: "1 days"
    },
    {
      clientId: client2.id,
      jobRole: "Lingerie",
      jobDescription: "A Lingerie shoot",
      locations: "Badore",
      fee: 180000,
      jobType: "Lingerie",
      jobLength: "1 day"
    },
  ];
}

module.exports = {
  user,
  client,
  model,
  contract,
  job,
};