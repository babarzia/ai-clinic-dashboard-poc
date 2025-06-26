# it can be replaced by any llm for chat

def get_ai_reply(message):
    user_msg = message if isinstance(message, str) else message.get("message", "")
    return f"This is a sample AI reply to: {user_msg}"