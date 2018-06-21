import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-sales-regulated-request',
  templateUrl: './regulated-request.component.html',
  styleUrls: ['./regulated-request.component.css']
})
export class RegulatedRequestComponent implements OnInit, AfterViewInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  image1 = true;
  image2 = false;
  image3 = false;
  corporateFirstFormGroup: FormGroup;
  corporateSecondFormGroup: FormGroup;

  suitabilityFirstFormGroup: FormGroup;
  suitabilitySecondFormGroup: FormGroup;
  employee: string;
  parsedJson;
  parsedJson2;

  parsedCorporateJson;
  financialFirstFormGroup: FormGroup;
  financialSecondFormGroup: FormGroup;
  economicSectorInfo: any;
  financialAssets = [];
  economicSectors = [];

  countries;
  authorityLink: string = null;


  activeIdentificationId;

  clarification = false;
  customerId_clar;
  appId_clar;


  constructor(private _formBuilder: FormBuilder,
              private cdRef: ChangeDetectorRef,
  ){
  }

  ngOnInit(){
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

    this.parsedJson = JSON.parse(JSON.stringify(this.suitability));
    this.parsedJson2 = JSON.parse(JSON.stringify(this.regulatedCustomer));
    this.parsedCorporateJson = JSON.parse(JSON.stringify(this.corporateJson));


    for(let section of this.parsedJson.sections){
      section.form = new FormGroup({});
      for (let question of section.question_list) {
        if (question.qtype == 'multi-choice') {
          for (let choice of question.qchoices) {
            const control: FormControl = new FormControl(choice.selected, Validators.required);
            section.form.addControl(choice.key, control);
          }
        }
        else {
          const control: FormControl = new FormControl(question.answer, Validators.required);
          section.form.addControl(question.key, control);
        }
      }
    }

    for(let section of this.parsedJson2.sections){
      section.form  = new FormGroup({});
      if(section.section_type == 'normal') {
        for (let question of section.question_list) {
          if (question.qtype == 'input-text') {
            let control : FormControl;
            if(question.required == true){
              control = new FormControl(question.answer, Validators.required);
            }
            else{
              control = new FormControl(question.answer);
            }
            section.form.addControl(question.key, control);
          }
          if (question.qtype == 'input-text-sec') {
            const control: FormControl = new FormControl(question.answer, Validators.required);
            section.form.addControl(question.key, control);
          }
          if (question.qtype == 'input-email') {
            const control: FormControl = new FormControl(question.answer, Validators.email);
            section.form.addControl(question.key, control);
          }
          if (question.qtype == 'multi-choice') {
            for (let choice of question.qchoices) {
              const control: FormControl = new FormControl(choice.selected);
              section.form.addControl(choice.key, control);
            }
          }
          else {
            const control: FormControl = new FormControl(question.answer);
            section.form.addControl(question.key, control);
          }
        }
      }
    }
    for(let section of this.parsedCorporateJson.sections){
      section.form  = new FormGroup({});
      if(section.section_name !== 'Done' && section.section_name !== 'Shareholders Representation') {
        for (let question of section.question_list) {
          if (question.qtype == 'input-array') {
            let objectArr = new FormArray([]); // Ex: Shareholders, Board members. Array of those objects.
            let type;
            console.log("QUESTION");
            console.log(question);
            if(question.answer.length == 0){
              let group;
              if(section.section_name == 'Shareholders') {
                type = "shareholders";
                group = new FormGroup({
                  id: new FormControl("", Validators.required),
                  name: new FormControl("", Validators.required),
                  percentage: new FormControl("", Validators.required),
                  country: new FormControl(""),
                  nationality: new FormControl(""),
                  personal_number: new FormControl(""),
                  date_of_birth: new FormControl(""),
                  expiration_date: new FormControl(""),
                });
              }
              if(section.section_name == 'Board Members'){
                type = "boardmembers";
                group = new FormGroup({
                  id: new FormControl("", Validators.required),
                  name: new FormControl("", Validators.required),
                });
              }
              objectArr.push(group);
            }
            for(let row of question.answer){
              let group;
              if(section.section_name == 'Shareholders') {
                type = "shareholders";
                group = new FormGroup({
                  id: new FormControl(row.id, Validators.required),
                  name: new FormControl(row.name, Validators.required),
                  percentage: new FormControl(row.percentage, Validators.required)
                });
              }
              if(section.section_name == 'Board Members'){
                type = "boardmembers";
                group = new FormGroup({
                  id: new FormControl(row.id, Validators.required),
                  name: new FormControl(row.name, Validators.required),
                });
              }
              objectArr.push(group);
            }
            section.form.addControl(type, objectArr);
          }
        }
      }
    }

    this.buildFinancialQuestions();
  }
  ngAfterViewInit() {

  }

  // setTimeout(() =>{
  //   this.parsedJson2.sections[0].form.controls['clientName'].setValue("ASDASD");
  // }, 1);


  initObjectArr(id?, name?, scannedData?) {
    if(id && name && scannedData){
      return new FormGroup({
        type: new FormControl(scannedData.type, Validators.required),
        id: new FormControl(id, Validators.required),
        name: new FormControl(name, Validators.required),
        percentage: new FormControl("", Validators.required),
        country: new FormControl(scannedData.country),
        nationality: new FormControl(scannedData.nationality),
        personal_number: new FormControl(scannedData.personal_number),
        date_of_birth: new FormControl(scannedData.date_of_birth),
        expiration_date: new FormControl(scannedData.expiration_date),
      });
    }
    return new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      percentage: new FormControl('', Validators.required)
    });
  }
  addSection(form, type, id?, name?, scannedData?) {
    console.log('scannedData');
    console.log(scannedData);
    console.log(type);
    console.log(form);
    const control = <FormArray>form.get(type);
    console.log(control);
    control.push(this.initObjectArr(id,name,scannedData));
    console.log(this.parsedCorporateJson);
  }

  getSections(form, type) {
    if(type == 'shareholders'){
      return form.controls.shareholders.controls;
    }
    if(type == 'boardmembers'){
      return form.controls.boardmembers.controls;
    }
  }

  public removeSection(form, i, type){
    const control = <FormArray>form.get(type);
    control.removeAt(i);
  }

  saveFinancial(){
    console.log(this.financialFirstFormGroup);
    console.log(this.financialSecondFormGroup);
  }

  buildFinancialQuestions(){
    let financialAssetsList = ["Currency Trading", "Directional Trading", "Long Short Equity", "Charity", "Diversified Arbitrage",
      "Fixed Income Arbitrage", "Fixed Income", "Derivatives", "Financial Futures", "Other"];
    let economicSectorsList = ["Casino and Gaming", "Trading in diamonds / precious stones", "Trading in works of art", "Charity",
      "Banks of financial institutions goverened by religious rules", "Other"];

    let economicSectorList = [
      {text: "Casino and Gaming", value: "cng"},
      {text: "Trading in diamonds / precious stones", value: "diamonds"},
      {text: "Trading in works of art", value: "art"},
      {text: "Charity", value: "charity"},
      {text: "Banks of financial institutions governed by religious rules", value: "cag"},
      {text: "Other", value: "other"},
    ];
    for(let type in financialAssetsList){
      let finMod: any = financialAssetsList[type];
      this.financialAssets.push(finMod)
    }
    this.economicSectors = economicSectorList;
  }

  validateFinancialAssetValues(): boolean{
    let valid = true;
    for(let asset in this.financialAssets){
      let assetItem: any  = this.financialAssets[asset];
      if(assetItem.selected && (assetItem.amount == 0 || assetItem.currency.length <= 0)){
        valid = false
      }
    }

    return valid;
  }

  regulatedCustomer = {
    "name": "Regulated Company - Customer Identification",
    "sections": [
      {
        "section_id": "A",
        "section_name": "Authority Details",
        "section_type": "normal",
        "question_list": [
          {
            "qid": "1",
            "key": "regulatoryAuthority",
            "required": true,
            "hidden": true,
            "qtext": "Regulatory Authority",
            "qchoices": [
              {
                "value": "fca",
                "text": "FCA"
              },
              {
                "value": "sec",
                "text": "SEC"
              },
              {
                "value": "amf",
                "text": "AMF"
              },
              {
                "value": "cftc",
                "text": "CFTC"
              },
              {
                "value": "nfa",
                "text": "NFA"
              },
              {
                "value": "cboi",
                "text": "Central Bank of Ireland"
              },
              {
                "value": "mas",
                "text": "MAS"
              },

            ],
            "qtype": "authority"
          },
          {
            "qid": "2",
            "key": "identificationId",
            "qtext": "Registration ID",
            "qtype": "input-text-sec",
            "answer": "",
            "required": true
          },
          {
            "qid": "3",
            "key": "clientName",
            "qtext": "Client Name",
            "qtype": "input-text",
            "answer": "",
            "required": true
          }
        ]
      },
      {
        "section_id": "A2",
        "section_name": "Identity Details",
        "section_type": "normal",
        "question_list": [
          {
            "qid": "4",
            "key": "placeOfBusiness",
            "qtext": "Client Place of Business",
            "qtype": "input-text",
            "answer": "",
            "required": false
          },
          {
            "qid": "5",
            "key": "clientOrigin",
            "qtext": "Client Origin",
            "qtype": "select-country",
            "answer": "US",
            "required": false
          },
          {
            "qid": "6",
            "key": "politicalExposedType",
            "qtext": "Political Exposed Person",
            "answer": "",
            "qchoices": [
              {
                "value": "HEAD_OF_STATE",
                "text": "Head of State"
              },
              {
                "value": "HEAD_OF_GOV",
                "text": "Head of Gov."
              },
              {
                "value": "SENIOR_POLITICAN",
                "text": "Senior Politician"
              },
              {
                "value": "JURIDICAl_OFFICIAL",
                "text": "Judical Official"
              },
              {
                "value": "MILITARY_OFFICIAL",
                "text": "Military Official"
              },
              {
                "value": "OTHER",
                "text": "Other Political / Public Function"
              }
            ],
            "qtype": "single-choice"
          }
        ]
      },
      {
        "section_id": "B",
        "section_name": "Contact Details",
        "section_type": "normal",
        "question_list": [
          {
            "qid": "1",
            "key": "phone",
            "qtext": "Phone",
            "qtype": "input-text",
            "answer": "",
            "required": false
          },
          {
            "qid": "2",
            "key": "mobile",
            "qtext": "Mobile",
            "qtype": "input-text",
            "answer": "",
            "required": false
          },
          {
            "qid": "3",
            "key": "email",
            "qtext": "Email",
            "qtype": "input-email",
            "answer": "",
            "required": false
          },
          {
            "qid": "4",
            "key": "fax",
            "qtext": "Fax",
            "qtype": "input-text",
            "answer": "",
            "required": false
          }
        ]
      },
      {
        "section_id": "C",
        "section_name": "Address Details",
        "section_type": "normal",
        "question_list": [
          {
            "qid": "1",
            "key": "street",
            "qtext": "Street",
            "qtype": "input-text",
            "answer": "",
            "required": false
          },
          {
            "qid": "2",
            "key": "number",
            "qtext": "Number",
            "qtype": "input-text",
            "answer": "",
            "required": false
          },
          {
            "qid": "3",
            "key": "addtlInformation",
            "qtext": "Additional Information",
            "qtype": "input-text",
            "answer": "",
            "required": false
          },
          {
            "qid": "4",
            "key": "city",
            "qtext": "City",
            "qtype": "input-text",
            "answer": "",
            "required": false
          },
          {
            "qid": "5",
            "key": "postalCode",
            "qtext": "Postal Code",
            "qtype": "input-text",
            "answer": "",
            "required": false
          },
          {
            "qid": "6",
            "key": "state",
            "qtext": "State",
            "qtype": "input-text",
            "answer": "",
            "required": false
          },
          {
            "qid": "7",
            "key": "country",
            "qtext": "Country",
            "qtype": "select-country",
            "answer": "",
            "required": false
          }
        ]
      },
      {
        "section_id": "Y",
        "section_name": "Documents",
        "section_type": "file"
      },
      {
        "section_id": "X",
        "section_name": "Done",
        "section_type": "done"
      }
    ]
  };
  suitability = {
    "name": "Regulated Customer",
    "sections": [
      {
        "section_id": "A",
        "section_name": "SUITABILITY TEST",
        "section_type": "normal",
        "section_headers": [],
        "question_list": [
          {
            "qid": "1",
            "qtext": "Investment experience",
            "key": "a1",
            "qchoices": [
              {
                "value": "a",
                "text": "Less than 1 year"
              },
              {
                "value": "b",
                "text": "Between 1 year and 5 years"
              },
              {
                "value": "c",
                "text": "More than 5 years"
              }
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "answer": "",
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "2",
            "qtext": "Investment frequency",
            "key": "a2",
            "qchoices": [
              {
                "value": "a",
                "text": "No investments up to this date"
              },
              {
                "value": "b",
                "text": "Less than 20 transactions per year"
              },
              {
                "value": "c",
                "text": "Betweeh 20 and 100 transactions per year"
              },
              {
                "value": "d",
                "text": "More than 100 transactions per year"
              }
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "answer": "",
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "3",
            "key": "a3",
            "qtext": "Does the client have sufficient experience to understand, and recognise, the risks of the relevant investment strategies and particular investments?",
            "qchoices": [
              {
                "value": "a",
                "text": "Yes"
              },
              {
                "value": "b",
                "text": "No, the Client needs some assistance"
              }
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "conditions": [],
            "answer": "",
            "qpoints": 0
          },
          {
            "qid": "4",
            "key": "a4",
            "qtext": "Does the Client feel comfortable to assess the suitability recomendations for investments?",
            "qchoices": [
              {
                "value": "a",
                "text": "Yes"
              },
              {
                "value": "b",
                "text": "No, the Client would love to get some assistance"
              }
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "answer": "",
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "5",
            "key": "a5",
            "qtext": "Did the Client receive specialized investment consultancy in the past?",
            "qchoices": [
              {
                "value": "a",
                "text": "Yes, from our company"
              },
              {
                "value": "b",
                "text": "No"
              }
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "answer": "",
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "6",
            "qtext": "Which of the following products did the client use int he past?",
            "qchoices": [
              {
                "value": "",
                "text": "Currency Trading",
                "selected": false,
                "key": "a6a",
                "currency": ""
              },
              {
                "value": "b",
                "text": "Directional Trading",
                "selected": false,
                "key": "a6b",
                "currency": ""
              },
              {
                "value": "c",
                "text": "Long/Short Equity",
                "selected": false,
                "key": "a6c",
                "currency": ""

              },
              {
                "value": "d",
                "text": "Emerging Markets",
                "selected": false,
                "key": "a6d",
                "currency": ""

              },
              {
                "value": "e",
                "text": "Macro Global Arbitrage",
                "selected": false,
                "key": "a6e",
                "currency": ""

              },
              {
                "value": "f",
                "text": "Diversified Arbitrage / Fixed Income",
                "selected": false,
                "key": "a6f",
                "currency": ""

              },
              {
                "value": "g",
                "text": "Equity Index Arbitrage",
                "selected": false,
                "key": "a6g",
                "currency": ""

              },
              {
                "value": "h",
                "text": "Equity Risk Arbitrage",
                "selected": false,
                "key": "a6h",
                "currency": ""

              },
              {
                "value": "i",
                "text": "Fixed Income",
                "selected": false,
                "key": "a6i",
                "currency": ""

              },
              {
                "value": "j",
                "text": "Derivatives or Commodities",
                "selected": false,
                "key": "a6j",
                "currency": ""

              },
              {
                "value": "k",
                "text": "Financial Futures",
                "selected": false,
                "key": "a6k",
                "currency": ""

              },
              {
                "value": "l",
                "text": "Options",
                "selected": false,
                "key": "a6l",
                "currency": ""

              },
              {
                "value": "m",
                "text": "Commodity Funds",
                "selected": false,
                "key": "a6m",
                "currency": ""

              },
              {
                "value": "n",
                "text": "Derivatives Funds",
                "selected": false,
                "key": "a6n",
                "currency": ""

              },
              {
                "value": "o",
                "text": "Equities",
                "selected": false,
                "key": "a6o",
                "currency": ""

              }
            ],
            "qtype": "multi-choice",
            "qcategory": null,
            "answer": [],
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "7",
            "qtext": "Is the Customer interested in other instruments as well?",
            "key": "a7",
            "qchoices": [
              {
                "value": "a",
                "text": "Yes"
              },
              {
                "value": "b",
                "text": "No"
              }
            ],
            "qtype": "single-choice",
            "qcategory": null,
            "answer": "",
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "8",
            "qtext": "Please select which other products are interesting for the Customer?",
            "qchoices": [
              {
                "value": "a",
                "text": "Currency Trading",
                "selected": false,
                "key": "a8a"

              },
              {
                "value": "b",
                "text": "Directional Trading",
                "selected": false,
                "key": "a8b"

              },
              {
                "value": "c",
                "text": "Long/Short Equity",
                "selected": false,
                "key": "a8c"

              },
              {
                "value": "d",
                "text": "Emerging Markets",
                "selected": false,
                "key": "a8d"

              },
              {
                "value": "e",
                "text": "Macro Global Arbitrage",
                "selected": false,
                "key": "a8e"

              },
              {
                "value": "f",
                "text": "Diversified Arbitrage / Fixed Income",
                "selected": false,
                "key": "a8f"

              },
              {
                "value": "g",
                "text": "Equity Index Arbitrage",
                "selected": false,
                "key": "a8g"

              },
              {
                "value": "h",
                "text": "Equity Risk Arbitrage",
                "selected": false,
                "key": "a8h"

              },
              {
                "value": "i",
                "text": "Fixed Income",
                "selected": false,
                "key": "a8i"

              },
              {
                "value": "j",
                "text": "Derivatives or Commodities",
                "selected": false,
                "key": "a8j"

              },
              {
                "value": "k",
                "text": "Financial Futures",
                "selected": false,
                "key": "a8k"

              },
              {
                "value": "l",
                "text": "Options",
                "selected": false,
                "key": "a8l"

              },
              {
                "value": "m",
                "text": "Commodity Funds",
                "selected": false,
                "key": "a8m"

              },
              {
                "value": "n",
                "text": "Derivatives Funds",
                "selected": false,
                "key": "a8n"

              },
              {
                "value": "o",
                "text": "Equities",
                "selected": false,
                "key": "a8o"

              }
            ],
            "qtype": "multi-choice",
            "qcategory": null,
            "answer": [],
            "conditions": [],
            "qpoints": 0
          }
        ]
      }
    ]
  };

  corporateJson = {
    "name": "Regulated Company - Corporate Structure",
    "sections": [
      {
        "section_id": "A",
        "section_name": "Shareholders",
        "section_type": "normal",
        "formArray": "shareholders",
        "question_list": [
          {
            "qid": "1",
            "key": "name",
            "key2": "percentage",
            "key0": "id",
            "required": true,
            "answer": [
            ],
            "qtext": "Name",
            "qtext2": "% of Ownership",
            "qtext0": "ID",
            "qtype": "input-array"
          }
        ]
      },
      {
        "section_id": "Y",
        "section_name": "Shareholders Representation",
        "section_type": "chart"
      },
      {
        "section_id": "B",
        "section_name": "Board Members",
        "section_type": "normal",
        "formArray": "boardmembers",
        "question_list": [
          {
            "qid": "1",
            "key": "name",
            "key0": "id",
            "required": true,
            "answer": [

            ],
            "qtext": "Name",
            "qtext0": "ID",
            "qtype": "input-array"
          }
        ]
      },
      {
        "section_id": "X",
        "section_name": "Done",
        "section_type": "done"
      }
    ]
  };

  financialJson = {
    "name": "Regulated Company - Financial Information",
    "sections": [
      {
        "section_id": "A",
        "section_name": "Economic Sector",
        "section_type": "normal",
        "formArray": "shareholders",
        "question_list": [
          {
            "qid": "1",
            "key": "name",
            "key2": "percentage",
            "required": true,
            "answer": [
            ],
            "qtext": "Name",
            "qtext2": "% of Ownership",
            "qtype": "input-array"
          }
        ]
      },
      {
        "section_id": "B",
        "section_name": "Assets Under Management",
        "section_type": "normal",
        "formArray": "boardmembers",
        "question_list": [
          {
            "qid": "1",
            "key": "name",
            "required": true,
            "answer": [

            ],
            "qtext": "Name",
            "qtype": "input-array"
          }
        ]
      },
      {
        "section_id": "X",
        "section_name": "Done",
        "section_type": "done"
      }
    ]
  };
}
