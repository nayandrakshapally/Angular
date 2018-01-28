import { Component, OnInit, Input } from '@angular/core';
 import { Dish } from '../shared/dish';

 

@Component({
  selector: 'app-menudetails',
  templateUrl: './menudetails.component.html',
  styleUrls: ['./menudetails.component.scss']
})
export class MenudetailsComponent implements OnInit {
  @Input()
  dish: Dish;


  constructor() { }

  ngOnInit() {
  }

}
