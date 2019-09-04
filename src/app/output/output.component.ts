import { Component, OnInit, Injector } from '@angular/core';
import { PaoEncodeService } from '../pao-encode.service';
import { range } from 'rxjs';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.less']
})
export class OutputComponent implements OnInit {
  paoEncodeService: PaoEncodeService;
  celebData: string[];
  firstDigit: number = 0;
  secondDigit: number = 0;
  generateForm = new FormGroup({
    firstDig: new FormControl(),
    secondDig: new FormControl(),
    systemName: new FormControl(),
    celebData: new FormControl()
  });;
  system: string = 'MajorSystem';
  optionRange: number[];

  constructor(
    private injector: Injector,
    private fb: FormBuilder
  ){ 
    this.optionRange = [...Array(10).keys()];
    console.log(this.optionRange);
    this.generateForm = this.fb.group({
      firstDig: 0,
      secondDig:0,
      systemName: 'MajorSystem',
      celebData: []
    })
  }

  ngOnInit() {
    this.paoEncodeService = this.injector.get(PaoEncodeService);
  }

  generate() {
    console.log(this.generateForm.controls['firstDig'].value, this.generateForm.controls['secondDig'].value, this.generateForm.controls['systemName'].value);
    const position: number = parseFloat(this.generateForm.controls['firstDig'].value)*10 + parseFloat(this.generateForm.controls['secondDig'].value);
    this.celebData = this.paoEncodeService.generateCelebs(position, this.generateForm.controls['systemName'].value);
  }

}
