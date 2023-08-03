import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";
import { IvrTester, similarTo, press, hangUp } from "ivr-tester";

const config = {
  transcriber: googleSpeechToText({ languageCode: "en-GB" }),
  twilioAuth: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
};

new IvrTester(config).run(
  { from: "0046736589529", to: "0046736589529" },
  {
    name: "Customer is provided a menu after their account number confirmed",
    steps: [
      {
        whenPrompt: similarTo("Please enter your account number"),
        then: press("184748"),
        silenceAfterPrompt: 3000,
        timeout: 6000,
      },
      {
        whenPrompt: similarTo(
          "press 1 for booking a repair or 2 for changing your address"
        ),
        then: hangUp(),
        silenceAfterPrompt: 3000,
        timeout: 6000,
      },
    ],
  }
);
