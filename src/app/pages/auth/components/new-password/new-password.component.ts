import { Component } from '@angular/core';
import {UserService} from "../../../gestionnaire/service/user.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  providers: [MessageService]
})
export class NewPasswordComponent {
    username:string='';

    constructor(private userService: UserService, private msgSrv: MessageService) {
    }

    save(){
      this.userService.newPassword(this.username).subscribe({
        next: (res) => {
          console.log(res)
          if (res.msg.includes("compte"))
          {
              this.msgSrv.add({ severity: 'error', summary: 'Error', detail: res.msg });
              return
          }
          else { 
              this.msgSrv.add({ severity: 'success', summary: 'Success', detail: res.msg });
              return
          }
      },
      error: (error) =>{
          this.msgSrv.add({ severity: 'error', summary: 'Error', detail: error.message });
          return
      }
      })
    }


}
