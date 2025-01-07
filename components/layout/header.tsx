export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <header className="bg-slate-200 text-black p-4">
          <div className="container mx-auto flex justify-end items-center">
            {children}
          </div>
        </header>
      );
}
