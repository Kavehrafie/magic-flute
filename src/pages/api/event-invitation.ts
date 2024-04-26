import type { APIRoute } from 'astro';
import { mailjet } from "@lib/smtp.ts";

export const POST:  APIRoute = async ({ request }) => {
  const form = await request.formData();
  const links = form.get('links')


  const response = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "no-reply@ah201.online",
            "Name": "Rumination podcast"
          },
          "To": [
            {
              "Email": form.get("email"),
              "Name": "A Friend"
            }
          ],
          "Subject": "Upcoming Event Invitation",
          "TextPart": "Dear Friend, welcome to rumination podcast! The details of the upcoming event are as follows",
          "HTMLPart": "<h3>Dear Friend, welcome to <a href=\"https://www/rumination.netlify.com/\">rumination podcast</a>!</h3><br /> " +
            "The details of the upcoming event are as follows: " +
            `<a href='${links?.reading}'>📘 Reading link</a> <br />` +
            `<a href='${links?.meeting}'>📇 Meeting link </a> <br />`
        }
      ]
    })
  response
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
      return new Response(JSON.stringify({
          message: "event.invitation.success"
        }), {
          status: 400
        }
      )
    })

  return new Response(JSON.stringify({
      message: "event.invitation.success"
    }), {
      status: 200
    }
  )
}