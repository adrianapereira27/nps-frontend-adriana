import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
 
interface CloseButtonProps{
    onClick: () => void;
}
 
export const CloseButton: React.FC<CloseButtonProps> = ({ onClick}) => {
  return (
    <button
       onClick={onClick}
       style={{ fontSize: '15px', cursor: 'pointer', position: 'absolute', border: 'none', backgroundColor: 'transparent', top: '10px', right: '10px' }}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};
 