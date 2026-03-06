import { Header } from './Header';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
};
