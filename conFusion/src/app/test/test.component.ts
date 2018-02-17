import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
 import { DishService } from '../services/dish.service';
 
 import { Params, ActivatedRoute } from '@angular/router';
 import { Location } from '@angular/common';



 import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  dishErrMess : string; 

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,@Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
    errmess => this.dishErrMess  = <any>errmess);
    // this.route.params
    //   .switchMap((params: Params) => {  return this.dishservice.getDish(+params['id']); })
    //   .subscribe(dish => { this.dish = dish;},
    //       errmess => { this.dish = null; this.dishErrMess = <any>errmess; });
    // this.route.params
    //   .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
    //   .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); });
      let id = +this.route.snapshot.params['id'];
     this.dishservice.getDish(id)
     .subscribe(dish=>this.dish=dish);
  }
 
  }


