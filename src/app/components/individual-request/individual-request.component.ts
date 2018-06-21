import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sales-individual-request',
  templateUrl: './individual-request.component.html',
  styleUrls: ['./individual-request.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class IndividualRequestComponent implements OnInit {
  panelOpenState: boolean = false;
  zeroFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  taxFormGroup: FormGroup;
  countries;
  parsedJson;
  financialFirstFormGroup: FormGroup;
  financialSecondFormGroup: FormGroup;

  startedEditing: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private router: Router){}

  ngOnInit(){

    this.parsedJson = JSON.parse(JSON.stringify(this.json));

    for(let section of this.parsedJson.sections){
      section.form = new FormGroup({});
      for (let question of section.question_list) {
        if (question.qtype == 'multi-choice') {
          for (let choice of question.qchoices) {
            const control: FormControl = new FormControl(choice.selected, Validators.required);
            section.form.addControl(choice.key, control);
          }
        }
        else if(question.qtype == 'single-choice') {
          const control: FormControl = new FormControl(question.answer, Validators.required);
          section.form.addControl(question.key, control);
        }
        else if(question.qtype == 'table') {
          for(let row of question.row){
            for(let columnQuestion of row.columns){
              if(columnQuestion.qtype == 'single-choice'){
                const control: FormControl = new FormControl(columnQuestion.answer, Validators.required);
                section.form.addControl(columnQuestion.key, control);
              }
            }
          }

        }
      }
    }
    this.financialFirstFormGroup = this._formBuilder.group({
      hosCtrl: false,
      hogCtrl: [''],
      spCtrl: [''],
      jCtrl: [''],
      mCtrl: [''],
      opCtrl: [''],
    });
    this.financialSecondFormGroup = this._formBuilder.group({
      hosCtrl: false,
      hogCtrl: [''],
      spCtrl: [''],
      jCtrl: [''],
      mCtrl: [''],
      opCtrl: [''],
    });

    this.firstFormGroup = this._formBuilder.group({
      titleCtrl: ['', Validators.required],
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      documentIdCtrl: ['', Validators.required],
      dateCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      phoneCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.email],
      mobileCtrl: ['', Validators.required],
      faxCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      streetCtrl: ['', Validators.required],
      numberCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      postalCtrl: ['', Validators.required],
      additionalInfoCtrl: [''],
      stateCtrl: ['', Validators.required],
      countryCtrl: ['', Validators.required]
  });
    this.taxFormGroup = this._formBuilder.group({
      countryCtrl: ['', Validators.required],
      taxIdCtrl: ['', Validators.required],
  });
  }

  saveSuitability(){
    console.log(this.parsedJson);
    console.log(this.parsedJson.sections[0].form.valid);
  }

  json: any = {
    "name": "Individual Customer",
    "sections": [
      {
        "section_id": "A",
        "section_name": "Knowledge and Experience",
        "section_type": "normal",
        "section_headers": [],
        "question_list": [
          {
            "qid": 0,
            "qtype": "table",
            "headers": [
              {"name": ""},
              {"name": "Sufficient knowledge to understand the risks involved"},
              {"name": "Transactions already made in past"}
            ],
            "row": [
              {
                "columns": [
                  {
                    "name": "Equities", "qtype": "label"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r1q1"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r1q2"
                  }
                ]
              },
              {
                "columns": [
                  {
                    "name": "Have you ever invested in financial instruments exposed to a currency other than your reference currency?", "qtype": "label"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r2q1"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r2q2"
                  }
                ]
              },
              {
                "columns": [
                  {
                    "name": "Hedge funds (single, etc.)", "qtype": "label"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r3q1"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r3q2"
                  }
                ]
              },
              {
                "columns": [
                  {
                    "name": "Alternative investments (private equity, real estate, etc.)", "qtype": "label"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r4q1"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r4q2"
                  }
                ]
              },
              {
                "columns": [
                  {
                    "name": "Cash", "qtype": "label"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r5q1"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r5q2"
                  }
                ]
              },
              {
                "columns": [
                  {
                    "name": "Commodities (precious metals, etc.)", "qtype": "label"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r6q1"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r6q2"
                  }
                ]
              },
              {
                "columns": [
                  {
                    "name": "Bonds and money market investments", "qtype": "label"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r7q1"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r7q2"
                  }
                ]
              },
              {
                "columns": [
                  {
                    "name": "Structured products", "qtype": "label"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r8q1"
                  },
                  {
                    "qtype": "single-choice",
                    "qchoices": [
                      {
                        "value": "yes",
                        "text": "Yes"
                      },
                      {
                        "value": "no",
                        "text": "No"
                      },
                    ],
                    "answer": "",
                    "key": "r8q2"
                  }
                ]
              },
            ]
          },
          {
            "qid": "1",
            "qtext": "Have you ever invested in financial instruments exposed to a currency other than your reference\n" +
            "currency?",
            "qchoices": [
              {
                "value": "yes",
                "text": "Yes"
              },
              {
                "value": "no",
                "text": "No"
              },
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "conditions": [],
            "qpoints": 0,
            "answer": "",
            "key": "a1"
          },
          {
            "qid": "2",
            "qtext": "Have you made an average of ten significant transactions (i.e. exceeding EUR 50,000 or equivalent) per quarter on the financial instruments markets over the past four quarters?",
            "qchoices": [
              {
                "value": "yes",
                "text": "Yes"
              },
              {
                "value": "no",
                "text": "No"
              },
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "conditions": [],
            "qpoints": 0,
            "answer": "",
            "key": "a2"

          },
          {
            "qid": "3",
            "qtext": "Does the value of your portfolio of financial instruments, defined to include bank deposits and " +
            "financial instruments, exceed EUR 500,000?",
            "qchoices": [
              {
                "value": "yes",
                "text": "Yes"
              },
              {
                "value": "no",
                "text": "No"
              }
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "conditions": [],
            "qpoints": 0,
            "answer": "",
            "key": "a3"

          },
          {
            "qid": "4",
            "qtext": "Have you worked or have you been working in the financial sector for at least one year in a " +
            "professional position, which requires knowledge of the transactions or services envisaged?",
            "qchoices": [
              {
                "value": "yes",
                "text": "Yes"
              },
              {
                "value": "no",
                "text": "No"
              }
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "conditions": [],
            "qpoints": 0,
            "answer": "",
            "key": "a4"


          },
          {
            "qid": "5",
            "qtext": "Do you have access or have you ever had access to privileged information (i)?",
            "qchoices": [
              {
                "value": "yes",
                "text": "Yes"
              },
              {
                "value": "no",
                "text": "No"
              }
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "conditions": [],
            "qpoints": 0,
            "answer": "",
            "key": "a5"


          },
        ]
      },
    ]
  };
}
