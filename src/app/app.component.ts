import { Component, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { SlideControlComponent } from 'ng-spc';
import { ControlInput, VertifyQuery} from 'ng-spc';@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listVersion: any;
  listGenerations: any;
  title = 'test-ng-spc';
  @ViewChild(SlideControlComponent, {static: true})
  slide: SlideControlComponent;

  public controlInput: ControlInput;

  private query: VertifyQuery;
  constructor(
    private dataService: DataService
    ) {}

  ngOnInit(): void {
    this.controlInput = new ControlInput(
      'https://api.xfunction.cn/slide/get',
      'https://api.xfunction.cn/slide/vertify',
      false
    );
    this.dataService.sendGetRequest("pokemon/ditto").subscribe((data :any)=>{
      this.listVersion = data.game_indices;
    })
    this.dataService.sendGetRequest("generation").subscribe((data :any)=>{
      this.listGenerations = data.results;
    })  
  }

  private reset() {
    this.query.move = undefined;
    this.query.action = [];
    this.slide.reset();
  }

  successMatch( query: VertifyQuery) {   
    console.log(query);
    this.query = query;
  }

}
