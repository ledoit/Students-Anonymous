import os
# from dotenv import load_dotenv
# from pathlib import Path
import twilio
from twilio.rest import Client

# dotenv_path = Path('./.env')
# load_dotenv(dotenv_path=dotenv_path)


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
# account_sid = os.environ['TWILIO_ACCOUNT_SID']
# auth_token = os.environ['TWILIO_AUTH_TOKEN']

account_sid = 'ACd62766a8658cd7c38a49b344eaa7e1bd'
auth_token = '95100a0c90e41bda70540caa60e7b252'
client = Client(account_sid, auth_token)

message = client.messages.create(
    body='Hi there',
    from_='+19016688748',
    to='+19294782461'
)

print(message.sid)
