import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

interface ConversationLayoutProps {
  children: React.ReactNode;
}

export default async function ConversationLayout({
  children,
}: ConversationLayoutProps) {
  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">{children}</div>
      <ConversationList />
    </Sidebar>
  );
}
