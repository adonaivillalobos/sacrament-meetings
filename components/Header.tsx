import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import NavLinks from './NavLinks';

export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-blue-800 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
        <div>
          <span className="text-xl font-bold block">Riverside Ward</span>
          <span className="text-sm text-blue-100">{today}</span>
        </div>

        <div className="flex items-center gap-4">
          <NavLinks />

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-50">
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}