import scrollUpButton from './common/scrollUpButton';
import sideLinksManagement from './common/sideLinksManagement';
import sideMenuManagement from './common/sideMenu';
import majorSectionsSlideIn from './common/majorSectionsSlideIn';
import topMenuManagement from './sections/header/topMenu';
import wwwAcademyModalManagement from './popAndModals/wwwAcademyModal';
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
wwwAcademyModalManagement();

// sections
hookManagement();
projectsManagement();
stackManagement();
formManagement();