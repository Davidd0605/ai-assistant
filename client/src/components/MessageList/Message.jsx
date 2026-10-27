export default function Message({ role, content }) {
  return <div className={`msg msg-${role}`}>{content}</div>;
}
