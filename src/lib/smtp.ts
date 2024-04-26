import Mailjet from "node-mailjet";



export const mailjet = Mailjet.apiConnect(
  import.meta.env.MAILJET_API_KEY,
  import.meta.env.MAILJET_API_SECRET
);