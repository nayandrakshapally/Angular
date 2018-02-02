import { Component, OnInit } from '@angular/core';
 import { Dish } from '../shared/dish';
 import { DishService } from '../services/dish.service';

 import { Params, ActivatedRoute } from '@angular/router';
 import { Location } from '@angular/common';

 

@Component({
  selector: 'app-menudetails',
  templateUrl: './menudetails.component.html',
  styleUrls: ['./menudetails.component.scss']
})
export class MenudetailsComponent implements OnInit {
  
  dish: Dish;


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {

    let id = +this.route.snapshot.params['id'];
    this.dish = this.dishservice.getDish(id);
  }

 goBack(): void {
    this.location.back();
  }
}









// import { Component, OnInit, Input } from '@angular/core';
//  import { Dish } from '../shared/dish';

 

// @Component({
//   selector: 'app-menudetails',
//   templateUrl: './menudetails.component.html',
//   styleUrls: ['./menudetails.component.scss']
// })
// export class MenudetailsComponent implements OnInit {
//   @Input()
//   dish: Dish;


//   constructor() { }

//   ngOnInit() {
//   }

// }
