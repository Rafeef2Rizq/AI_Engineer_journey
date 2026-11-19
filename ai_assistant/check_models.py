from groq import Groq
from dotenv import load_dotenv

load_dotenv()
for m in Groq().models.list().data:
    print(m.id)