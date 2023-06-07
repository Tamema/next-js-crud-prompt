import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'

export const metadata = {
  title: 'PromptJo',
  description: 'Discover AI prompts',
}

type LayoutProps = {
  children: React.ReactNode;
  session: any;
};

const RootLayout: React.FC<LayoutProps> = ({ children, session }) => (
  <html lang='en'>
    <body>
      <Provider session={session}>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
