import { getAccountByUserId } from "@/lib/account";
import { currentUser } from "@/lib/auth";
import { Settings } from "./_components/settings";

const SettingsPage = async () => {
  const user = await currentUser();
  if (!user?.id) return <>No user found</>;
  const account = await getAccountByUserId(user.id);
  const account1 = !!account;

  return <Settings user={user} account={account1} />;
};

export default SettingsPage;
