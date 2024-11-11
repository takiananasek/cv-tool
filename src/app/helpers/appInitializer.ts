import { catchError, finalize, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export function appInitializer(authenticationService: AuthenticationService) {
}