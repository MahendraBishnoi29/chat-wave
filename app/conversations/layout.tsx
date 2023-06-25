import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

interface ConversationLayoutProps {
  children: React.ReactNode;
}

export default async function ConversationLayout({
  children,
}: ConversationLayoutProps) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">{children}</div>
      <ConversationList users={users} initialItems={conversations} />
    </Sidebar>
  );
}
