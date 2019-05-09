import { isMobile } from 'react-device-detect';

const shouldAutoFocus = () => !isMobile && process.env.NODE_ENV !== 'test';

export default shouldAutoFocus;
