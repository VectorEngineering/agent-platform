import DashboardPage from "@/components/dashboard";
import { getUserAndSubscription } from "@/lib/data-fetching";
import { constructMetadata } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Dashboard",
  description: "Manage your account, billing, and team preferences.",
  canonical: "/dashboard",
});

export default async function Dashboard() {
  const {
    user,
    subscription,
    redirect: redirectTo,
    openAppQueryParams,
  } = await getUserAndSubscription();

  if (redirectTo || !user) {
    return redirect(redirectTo ?? "/signin");
  }

  return (
    <div className="py-[5%]">
      <DashboardPage
        subscription={subscription}
        openAppQueryParams={openAppQueryParams}
        user={user}
      />
    </div>
  );
}
