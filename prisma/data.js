const user = [
  {
    email: "clientuser1@gmail.com",
    password: "password1",
    type: "Client"  
  },
  {
    email: "clientuser2@gmail.com",
    password: "password1",
    type: "Client"  
  },
  {
    email: "modeluser1@gmail.com",
    password: "password1",
    type: "Model"  
  },
  {
    email: "modeluser2@gmail.com",
    password: "password1",
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
      height: 182,
      bust: 34,
      waist: 26,
      hip: 34,
      shoeSize: 39,
      weight: 66,
      complexion: "Dark",
      DOB: new Date("2001-01-06"),
      social: {"facebook": "www.facebook.com/newmodel1"},
      state: "Lagos",
      country: "Nigeria",
      address: "No 13, Celestial road Igando"
    },
    {
      userId: user2.id,
      firstname: "Lira",
      lastname: "Shannon",
      height: 182,
      bust: 42,
      waist: 22,
      hip: 44,
      shoeSize: 41,
      weight: 72,
      complexion: "Light",
      DOB: new Date("2002-05-07"),
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

const job = (client) => {
  return [
    {
      clientId: client.id,
      jobRole: "Glamour model",
      jobDescription: "A modelling job for a glamour magazine.",
      locations: "Lekki phase 1",
      salary: "50,000",
      jobType: "Glamour",
      jobLength: "2 days"
    },
    {
      clientId: client.id,
      jobRole: "Runway model",
      jobDescription: "Ajob for arunway shoot.",
      locations: "Ajah",
      salary: "150,000",
      jobType: "Runway",
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