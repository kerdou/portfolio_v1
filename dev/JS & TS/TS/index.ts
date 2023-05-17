import scrollUpButton from './common/scrollUpButton';
import sideLinksManagement from './common/sideLinksManagement';
import sideMenuManagement from './common/sideMenu';
import majorSectionsSlideIn from './common/majorSectionsSlideIn';
import topMenuManagement from './sections/header/topMenu';
import bioManagement from './sections/mainSection/bio';
import hookManagement from './sections/mainSection/hook';
import projectsManagement from './sections/mainSection/projects';
import stackManagement from './sections/mainSection/stack';
import formManagement from './sections/mainSection/form';

// common
scrollUpButton();
sideLinksManagement();
topMenuManagement();
majorSectionsSlideIn();
sideMenuManagement();

// sections
bioManagement();
hookManagement();
projectsManagement();
stackManagement();
formManagement();