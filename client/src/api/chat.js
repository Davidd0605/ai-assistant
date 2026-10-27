// Sends a message to the backend and returns the assistant's reply.
// Throws if the server responds with an error or no reply.
export async function sendChatMessage(message) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  if (!data.reply) throw new Error(data.error ?? 'Something went wrong');
  return data.reply;
}
