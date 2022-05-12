import { Component, OnInit, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent {

  //@Input() formUpLink: FormGroup | any

  constructor() {

    /*this.form.valueChanges.pipe(
      debounceTime(150),
    ).subscribe(
      d => console.log(`sub`, d))*/
      //this.form 
     // this.formUpLink = this.form// = this.form
     /*this.formUpLink = new FormGroup ({
      request: new FormControl ('', Validators.minLength(3)),
    });*/
   }

  ngOnInit(): void {
    //this.formUpLink = this.form
  }
    
    form = new FormGroup ({
      request: new FormControl ('', Validators.minLength(3)),
    });
  
    get request(): any {
      return this.form.get('request');
    }
  
    onSubmit(): void {
      console.log(this.form.value);  
     
    }
  
    setValue() {
      this.form.setValue({first: 'Carson', last: 'Drew'});
    }
    
}
