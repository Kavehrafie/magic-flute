import type { Handler } from "@netlify/functions";
// import { } from "@netlify/plugin-emails";

const handler: Handler = async function(event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as {
    email: string;
    local: string;
    links: { [key: string]: string };
    emailTemplate?: string;
  };

  //automatically generated snippet from the email preview
  //sends a request to an email handler for a subscribed email
  await fetch(`${process.env.URL}/.netlify/functions/emails/events`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      from: "Rumination Podcast <noreply@sandboxa79810dc69fd4bd9a82d78f7df057643.mailgun.org>",
      to: requestBody.email,
      subject: "Rumination: Upcoming Event Invitation",
      parameters: {
        eventDate: "",
        readingLink: requestBody.links.reading, 
        meetingLink: requestBody.links.meeting
      },
    }),
  });


  return {
    statusCode: 200,
    body: JSON.stringify("Subscribe email sent!"),
  };
};

export { handler };
