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
  
 
}
