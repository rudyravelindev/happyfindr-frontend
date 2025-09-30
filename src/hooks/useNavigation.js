import { useNavigate } from 'react-router-dom';

export default function useNavigation() {
  const navigate = useNavigate();

  const goToPage = (path, sectionId = null) => {
    if (sectionId) {
      // Pass state to indicate which section to scroll to
      navigate(path, { state: { scrollToSection: sectionId } });
    } else {
      navigate(path);
    }
  };

  return { goToPage };
}
