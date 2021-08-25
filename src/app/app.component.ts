import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listVersion: any;
  listGenerations: any;

  constructor(
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest("pokemon/ditto").subscribe((data :any)=>{
      this.listVersion = data.game_indices;
    })
    this.dataService.sendGetRequest("generation").subscribe((data :any)=>{
      this.listGenerations = data.results;
    })  
  }
  
   private validateEmailsField(item: string) {
    let result = true;
     const regex = /(a+)+b/; // Sensitive
      const regex2 = new RegExp("(a+)+b"); // Sensitive

      str.search("(a+)+b"); // Sensitive
      str.match("(a+)+b"); // Sensitive
      str.split("(a+)+b"); // Sensitive
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const control = this.emailForm.controls[item];
    let errors = control.errors;
    const emailArray = this.splitEmailsString(item, control);
    if (emailArray && emailArray.length > 0) {
      result = emailArray.every(email => {
        return re.test(email);
      });
    }
  }
}
