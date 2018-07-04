import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-kyc-institution-request',
  templateUrl: './institution-request.component.html',
  styleUrls: ['./institution-request.component.css']
})

export class InstitutionRequestComponent implements OnInit {


  corporateStructureForm: FormGroup;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.corporateStructureForm = this.fb.group({
      shareholders: this.fb.array([]),
      boardmembers: this.fb.array([])
    });
  }
  ngOnInit(){}


  addShareHolder(id?, name?, percentage?){
    const control = new FormGroup({
      id: new FormControl(id ? id : "", Validators.required),
      name: new FormControl(name ? name : "", Validators.required),
      percentage: new FormControl(percentage ? percentage : "", Validators.required),
    });
    (<FormArray>this.corporateStructureForm.get('shareholders')).push(control);
  }

  addBoardMember(id?, name?){
    const control = new FormGroup({
      id: new FormControl(id, Validators.required),
      name: new FormControl(name, Validators.required),
      file: new FormControl(null, Validators.required)

    });
    (<FormArray>this.corporateStructureForm.get('boardmembers')).push(control);
  }

  onFileChange(event, control) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        control.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
    console.log(control);
  }
}
