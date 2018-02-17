import { Component, OnInit, Inject } from '@angular/core';
 import { Dish } from '../shared/dish';
 import { DishService } from '../services/dish.service';
 
 import { Params, ActivatedRoute } from '@angular/router';
 import { Location } from '@angular/common';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { Rating } from '../shared/rating';
 import { visibility, expand, flyInOut } from '../animations/app.animation';


 import 'rxjs/add/operator/switchMap';
 

@Component({
  selector: 'app-menudetails',
  templateUrl: './menudetails.component.html',
  styleUrls: ['./menudetails.component.scss'],
    animations: [
    visibility(),
    expand(),
    flyInOut()
  ]
})
export class MenudetailsComponent implements OnInit {
  
  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  date;
  dishErrMess : string; 
  ratingForm: FormGroup;
  rating: Rating;
  visibility = 'shown';

  formErrors = {
    'firstname': '',
    'message': '',
   
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
     'message': {
      'required':      'Comment is required.',
     
    }

  };

 
   

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { 

       this.createForm();
    }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
    errmess => this.dishErrMess  = <any>errmess);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
          errmess => { this.dish = null; this.dishErrMess = <any>errmess; });
    // this.route.params
    //   .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
    //   .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); });
  }
   // let id = +this.route.snapshot.params['id'];
    //  this.dishservice.getDish(id)
    //  .subscribe(dish=>this.dish=dish);

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }
   
  

 goBack(): void {
    this.location.back();
  }

    createForm() {
       this.ratingForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      message: ['', [Validators.required]]
    });
      this.ratingForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.ratingForm) { return; }
    const form = this.ratingForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
   
    onSubmit() {
    this.rating = this.ratingForm.value;
    console.log(this.rating);
    // var data=[];
    // data.push( this.rating);
    // console.log("jdkfkjsbfdjb",data);
    // this.info = data;

      var d = new Date();
      this.date = d.toISOString();
    
     this.dishcopy.comments.push(this.rating);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });

    this.ratingForm.reset({
      firstname: '',
      message: ''
    });
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
