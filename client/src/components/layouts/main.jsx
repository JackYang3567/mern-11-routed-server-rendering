

import { HeaderMenu, FooterMenu } from './menus.jsx';
export const PageTemplate = ({children}) =>
    <div>
        <HeaderMenu />
        <div className="container-fluid">
            <main  className="main">
                {children}
            </main>
            <FooterMenu />    
        </div>
       
    </div>
    
