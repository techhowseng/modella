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

const contract = (client, model) => {
  return [
    {
      clientId: client.id,
      modelId: model.id,
      locations: "Lekki phase 1",
      startDate: new Date("2023-03-03"),
      startTime: new Date(1676817624900), 
      hours: 2,
      days: 1,
      fee: 50000.00
    },
  ];
}

const job = (client1, client2) => {
  return [
    {
      clientId: client1.id,
      jobRole: "Glamour model",
      jobDescription: "A modelling job for a glamour magazine.",
      location: "Lekki phase 1",
      salary: "50,000",
      jobType: "Glamour",
      jobLength: "2 days"
    },
    {
      clientId: client1.id,
      jobRole: "Fitness",
      jobDescription: "A fitness shoot.",
      location: "Ajah",
      salary: "70,000",
      jobType: "Fitness",
      jobLength: "1 day"
    },
    {
      clientId: client1.id,
      jobRole: "Promotional model",
      jobDescription: "Promotional",
      location: "Victoria Island",
      salary: "200,000",
      jobType: "Promotional",
      jobLength: "5 days"
    },
    {
      clientId: client2.id,
      jobRole: "Plus size model",
      jobDescription: "A plus size shoot for a clothing line.",
      location: "Ikoyi",
      salary: "450,000",
      jobType: "PLus size",
      jobLength: "1 day"
    },
    {
      clientId: client2.id,
      jobRole: "child model",
      jobDescription: "Child modelling",
      location: "Lekki phase 1",
      salary: "50,000",
      jobType: "child",
      jobLength: "1 days"
    },
    {
      clientId: client2.id,
      jobRole: "Lingerie",
      jobDescription: "A Lingerie shoot",
      location: "Badore",
      salary: "180,000",
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