from langchain_groq import ChatGroq
from langchain.tools import tool
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv

load_dotenv()

@tool
def calculator(a: float, b: float) -> str:
    """Add two numbers together. Always use this tool for any addition."""
    return f"The sum of {a} and {b} is {a + b}"

model = ChatGroq(model="openai/gpt-oss-120b", temperature=0)

agent = create_react_agent(
    model,
    [calculator],
    prompt="You are a helpful assistant. Always use the available tools for math.",
)