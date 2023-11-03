
// This is your new function. To start, set the name and path on the left.

exports.handler = function (context, event, callback) {
  console.log(`Incoming message: ${event.Body}`);
  // Here's an example of setting up some TWiML to respond to with this function
  const twiml = new Twilio.twiml.MessagingResponse();
  twiml.message("Thanks for your submission! 📸");

  console.log(`TwiML was ${twiml}`);


  // This callback is what is returned in response to this function being invoked.
  // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
  // Or you might return JSON data to a studio flow. Don't forget it!
  return callback(null, twiml);
};


exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  const gallery = [];
  /*[
              {
                src: "https://placekitten.com/200/300",
                description: "Look at this kitteh",
                alt: "A kitteh",
                thumbnailWidth: "200px",
              },
            ];
  */
  const messages = await client.messages.list({to: context.TWILIO_NUMBER});
  for (const message of messages) {
    const pics = await message.media().list();
    for (const pic of pics) {
      gallery.push({
        src: "https://api.twilio.com" + pic.uri.replace(".json", ""),
        description: message.body,
        alt: message.body,
        thumbnailWidth: "200px",
      });
    }
  }
  return callback(null, gallery);
};