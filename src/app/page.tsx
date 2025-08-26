"use client";

import { useLogin, usePrivy, useLinkAccount } from "@privy-io/react-auth";

export default function Home() {
  const { ready, authenticated, user, login, logout, linkWallet } = usePrivy();
  const { login: openLogin } = useLogin();
  const { linkWallet: openLinkWallet } = useLinkAccount();

  const linkedWallets = user?.linkedAccounts?.filter((a: any) => a.type === "wallet") || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black text-foreground p-6">
      <div className="max-w-xl mx-auto py-16">
        <div className="rounded-2xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 backdrop-blur p-6 shadow-sm">
          <h1 className="text-2xl font-semibold mb-2">Privy Auth Example</h1>
          <p className="text-sm text-black/60 dark:text-white/60 mb-6">Login, link a wallet, and view linked wallets.</p>

          {!ready ? (
            <div className="text-sm">Initializing…</div>
          ) : !authenticated ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => openLogin({ loginMethods: ["twitter"] })}
                className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                Login with Twitter
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-black/60 dark:text-white/60">Signed in as</div>
                  <div className="font-mono text-sm">
                    {user?.email?.address || user?.wallet?.address || user?.id}
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/20 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Logout
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openLinkWallet()}
                  className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  Link wallet
                </button>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-2">Linked wallets</h2>
                {linkedWallets.length === 0 ? (
                  <div className="text-sm text-black/60 dark:text-white/60">No wallets linked yet.</div>
                ) : (
                  <ul className="space-y-2">
                    {linkedWallets.map((w: any, i: number) => (
                      <li key={i} className="flex items-center justify-between rounded-md border border-black/10 dark:border-white/15 px-3 py-2">
                        <div className="font-mono text-sm truncate">{w.address}</div>
                        <span className="text-xs text-black/60 dark:text-white/60">{w.chainType}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
