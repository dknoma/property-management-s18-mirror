import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

/* TODO: Have all other components inherit from this
so we don't have to import all of this stuff everywhere.
*/
class Root extends Component {

}

/* Need the classes prop types for recomended method of doing styling in react */
Root.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default Root;
