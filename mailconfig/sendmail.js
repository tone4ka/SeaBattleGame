import mailjet from "node-mailjet";

mailjet.connect(
  "e81f45dcc6a31552f79e4f380185376c",
  "ff0f6c1a720ab5a0fb00058b09149231"
);

function sendMail(email, name) {
  const request = mailjet.post("send", { version: "v3" }).request({
    FromEmail: "toniamik@gmail.com",
    FromName: "Antonina",
    Recipients: [
      {
        Email: email,
        Name: name,
      },
    ],
    Subject: "Sea Battle!",
    "Text-part": "Authentification on Sea Battle was success!",
    "Html-part": `
      <h3>Authentification on Sea Battle was success!</h3>
      <p>Accaunt created with email - ${email}</p>
      <a href="http://localhost:3000/">Sea Battle</a>
      `,
  });
  request
    // .then((result) => {
    //   console.log("all fine!!!!!!!!!!!!!!");
    //   console.log(result.body);
    // })
    .catch((err) => {
      console.log("error!!!!!!!!!!!!!!");
      console.log(err.statusCode);
    });
}

function resetPassSendMail(email, token) {
  const request = mailjet.post("send", { version: "v3" }).request({
    FromEmail: "toniamik@gmail.com",
    FromName: "Antonina",
    Recipients: [
      {
        Email: email,
        Name: "",
      },
    ],
    Subject: "Restoring access",
    "Text-part": `Restoring access to your account ${email}`,
    "Html-part": `
      <h3>Have you forgotten your password?</h3>
      <p>If not, please ignore this letter.</p>
      <p>Otherwise click on the link below:</p>
      <a href="http://localhost:3000/auth/password/${token}">Restore password</a>
      <hr />
      <a href="http://localhost:3000/">Sea Battle</a>
      `,
  });
  request
    // .then((result) => {
    //   console.log("all fine!!!!!!!!!!!!!!");
    //   console.log(result.body);
    // })
    .catch((err) => {
      console.log("error!!!!!!!!!!!!!!");
      console.log(err.statusCode);
    });
}

export default {
  sendMail,
  resetPassSendMail,
};
