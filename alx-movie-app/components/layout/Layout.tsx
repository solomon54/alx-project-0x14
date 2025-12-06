import { ComponentProps } from '@/interfaces';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<ComponentProps> = ({ children }: ComponentProps) => {
  return (
    <div>
      <Header />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
