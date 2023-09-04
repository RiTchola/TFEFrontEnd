import {Component, OnDestroy} from '@angular/core';
import {AuthenticationRequest} from "../../../../core/models/authentication-request";
import {AuthService} from "../../../../core/services/auth.service";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnDestroy{

    private subscriptions: Subscription[] = [];
    authRequest: AuthenticationRequest = {
        username: "",
        password: ""
    };

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
    }

    login(){
        this.subscriptions.push(
            this.authService.authenticate(this.authRequest).subscribe(
                {
                    next: (res)=>{
                        sessionStorage.setItem('accessToken', res.accessToken);
                        this.authService.setLoggedIn(true);
                        this.router.navigate(["/"]);
                    },
                    error: (err)=>{
                        this.messageService.add({severity: "error", summary: "Error ("+err.status+")", detail: "Invalid username or password ("+err.message+")" });
                    }
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
}
