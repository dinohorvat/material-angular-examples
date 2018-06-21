import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  parsedJson;
  config: any[] = [];

  constructor(private _formBuilder: FormBuilder){}
  ngOnInit(){
    this.parsedJson = JSON.parse(JSON.stringify(this.regulatedCustomer));
    console.log(this.parsedJson);
    for(let section of this.parsedJson.sections){

      console.log(section);
      // titleCtrl: ['', Validators.required],
      //   firstNameCtrl: ['', Validators.required],
      //   lastNameCtrl: ['', Validators.required],
      //   documentIdCtrl: ['', Validators.required],
      //   dateCtrl: ['', Validators.required]
      section.form  = new FormGroup({});
      for(let question of section.question_list){
        if(question.qtype == 'input-text') {
          const control: FormControl = new FormControl(question.answer, Validators.required);
          section.form.addControl(question.key, control);
        }
          if(question.qtype == 'multi-choice'){
          for(let choice of question.qchoices){
            const control: FormControl = new FormControl(choice.selected, Validators.required);
            section.form.addControl(choice.key, control);
          }
        }
        else{
          const control: FormControl = new FormControl(question.answer, Validators.required);
          section.form.addControl(question.key, control);
        }
      }
    }
  }


  json = {
    "name": "Regulated Customer",
    "sections": [
      {
        "section_id": "A",
        "section_name": "SUITABILITY TEST",
        "section_type": "normal",
        "section_headers": [],
        "question_list": [
          {
            "qid": "0",
            "name": "q0",
            "qtext": "Please enter some text",
            "qtype": "input",
            "answer": ""
          },
          {
            "qid": "1",
            "name": "q1",
            "qtext": "Investment experience",
            "answer": "a",
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
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "2",
            "name": "q2",
            "qtext": "Investment frequency",
            "answer": "b",
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
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "3",
            "name": "q3",
            "qtext": "Does the client have sufficient experience to understand, and recognise, the risks of the relevant investment strategies and particular investments?",
            "answer": "b",
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
            "qpoints": 0
          },
          {
            "qid": "4",
            "name": "q4",
            "qtext": "Does the Client feel comfortable to assess the suitability recomendations for investments?",
            "answer": "a",
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
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "5",
            "name": "q5",
            "qtext": "Did the Client receive specialized investment consultancy in the past?",
            "answer": "a",
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
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "6",
            "name": "q6",
            "qtext": "Which of the following products did the client use int he past?",
            "qchoices": [
              {
                "key": "q6a",
                "selected": false,
                "value": "a",
                "text": "Currency Trading"
              },
              {
                "key": "q6b",
                "selected": false,
                "value": "b",
                "text": "Directional Trading"
              },
              {
                "key": "q6c",
                "selected": false,
                "value": "c",
                "text": "Long/Short Equity"
              },
              {
                "key": "q6d",
                "selected": true,
                "value": "d",
                "text": "Emerging Markets"
              },
              {
                "key": "q6e",
                "selected": false,
                "value": "e",
                "text": "Macro Global Arbitrage"
              },
              {
                "key": "q6f",
                "selected": false,
                "value": "f",
                "text": "Diversified Arbitrage / Fixed Income"
              },
              {
                "key": "q6g",
                "selected": false,
                "value": "g",
                "text": "Equity Index Arbitrage"
              },
              {
                "key": "q6h",
                "selected": false,
                "value": "h",
                "text": "Equity Risk Arbitrage"
              },
              {
                "key": "q6i",
                "selected": false,
                "value": "i",
                "text": "Fixed Income"
              },
              {
                "key": "q6j",
                "selected": false,
                "value": "j",
                "text": "Derivatives or Commodities"
              },
              {
                "key": "q6k",
                "selected": false,
                "value": "k",
                "text": "Financial Futures"
              },
              {
                "key": "q6l",
                "selected": false,
                "value": "l",
                "text": "Options"
              },
              {
                "key": "q6m",
                "selected": false,
                "value": "m",
                "text": "Commodity Funds"
              },
              {
                "key": "q6n",
                "selected": false,
                "value": "n",
                "text": "Derivatives Funds"
              },
              {
                "key": "q6o",
                "selected": false,
                "value": "o",
                "text": "Equities"
              }
            ],
            "qtype": "multi-choice",
            "qcategory": null,
            "conditions": [],
            "qpoints": 0
          },
          {
            "qid": "7",
            "name": "q7",
            "qtext": "Is the Customer interested in other instruments as well?",
            "answer": "b",
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
            "conditions": [],
            "qpoints": 0
          }

        ]
      }
    ]
  };
  jsonTest = {
    "name": "Regulated Customer",
    "sections": [
      {
        "section_id": "A",
        "section_name": "SUITABILITY TEST",
        "section_type": "normal",
        "section_headers": [],
        "question_list": [
          {
            "name": "investmentExperience",
            "qid": "1",
            "answer": "b",
            "qtext": "Investment experience",
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
            "conditions": [],
            "qpoints": 0
          }]
      }]};
      checkForm(){
        console.log(this.parsedJson);
      }


  regulatedCustomer =  {
    "name": "Regulated Company - Customer Identification",
    "sections": [
      {
        "section_id": "A",
        "section_name": "Identity Details",
        "section_type": "normal",
        "question_list": [
          {
            "qid": "1",
            "key": "regulatoryAuthority",
            "required": true,
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
              }
            ],
            "qtype": "single-choice"
          },
          {
            "qid": "2",
            "key": "identificationId",
            "qtext": "Registration ID",
            "qtype": "input-text",
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
          },
          {
            "qid": "4",
            "key": "placeOfBusiness",
            "qtext": "Client Place of Business",
            "qtype": "input-text",
            "answer": "",
            "required": true
          },
          {
            "qid": "5",
            "key": "clientOrigin",
            "qtext": "Client Origin",
            "qtype": "select-country",
            "answer": "US",
            "required": true
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
            "qtype": "single-choice",
          }
        ]
      }
    ]
  };
  countries = [
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'},
    {name: 'AndorrA', code: 'AD'},
    {name: 'Angola', code: 'AO'},
    {name: 'Anguilla', code: 'AI'},
    {name: 'Antarctica', code: 'AQ'},
    {name: 'Antigua and Barbuda', code: 'AG'},
    {name: 'Argentina', code: 'AR'},
    {name: 'Armenia', code: 'AM'},
    {name: 'Aruba', code: 'AW'},
    {name: 'Australia', code: 'AU'},
    {name: 'Austria', code: 'AT'},
    {name: 'Azerbaijan', code: 'AZ'},
    {name: 'Bahamas', code: 'BS'},
    {name: 'Bahrain', code: 'BH'},
    {name: 'Bangladesh', code: 'BD'},
    {name: 'Barbados', code: 'BB'},
    {name: 'Belarus', code: 'BY'},
    {name: 'Belgium', code: 'BE'},
    {name: 'Belize', code: 'BZ'},
    {name: 'Benin', code: 'BJ'},
    {name: 'Bermuda', code: 'BM'},
    {name: 'Bhutan', code: 'BT'},
    {name: 'Bolivia', code: 'BO'},
    {name: 'Bosnia and Herzegovina', code: 'BA'},
    {name: 'Botswana', code: 'BW'},
    {name: 'Bouvet Island', code: 'BV'},
    {name: 'Brazil', code: 'BR'},
    {name: 'British Indian Ocean Territory', code: 'IO'},
    {name: 'Brunei Darussalam', code: 'BN'},
    {name: 'Bulgaria', code: 'BG'},
    {name: 'Burkina Faso', code: 'BF'},
    {name: 'Burundi', code: 'BI'},
    {name: 'Cambodia', code: 'KH'},
    {name: 'Cameroon', code: 'CM'},
    {name: 'Canada', code: 'CA'},
    {name: 'Cape Verde', code: 'CV'},
    {name: 'Cayman Islands', code: 'KY'},
    {name: 'Central African Republic', code: 'CF'},
    {name: 'Chad', code: 'TD'},
    {name: 'Chile', code: 'CL'},
    {name: 'China', code: 'CN'},
    {name: 'Christmas Island', code: 'CX'},
    {name: 'Cocos (Keeling) Islands', code: 'CC'},
    {name: 'Colombia', code: 'CO'},
    {name: 'Comoros', code: 'KM'},
    {name: 'Congo', code: 'CG'},
    {name: 'Congo, The Democratic Republic of the', code: 'CD'},
    {name: 'Cook Islands', code: 'CK'},
    {name: 'Costa Rica', code: 'CR'},
    {name: 'Cote D\'Ivoire', code: 'CI'},
    {name: 'Croatia', code: 'HR'},
    {name: 'Cuba', code: 'CU'},
    {name: 'Cyprus', code: 'CY'},
    {name: 'Czech Republic', code: 'CZ'},
    {name: 'Denmark', code: 'DK'},
    {name: 'Djibouti', code: 'DJ'},
    {name: 'Dominica', code: 'DM'},
    {name: 'Dominican Republic', code: 'DO'},
    {name: 'Ecuador', code: 'EC'},
    {name: 'Egypt', code: 'EG'},
    {name: 'El Salvador', code: 'SV'},
    {name: 'Equatorial Guinea', code: 'GQ'},
    {name: 'Eritrea', code: 'ER'},
    {name: 'Estonia', code: 'EE'},
    {name: 'Ethiopia', code: 'ET'},
    {name: 'Falkland Islands (Malvinas)', code: 'FK'},
    {name: 'Faroe Islands', code: 'FO'},
    {name: 'Fiji', code: 'FJ'},
    {name: 'Finland', code: 'FI'},
    {name: 'France', code: 'FR'},
    {name: 'French Guiana', code: 'GF'},
    {name: 'French Polynesia', code: 'PF'},
    {name: 'French Southern Territories', code: 'TF'},
    {name: 'Gabon', code: 'GA'},
    {name: 'Gambia', code: 'GM'},
    {name: 'Georgia', code: 'GE'},
    {name: 'Germany', code: 'DE'},
    {name: 'Ghana', code: 'GH'},
    {name: 'Gibraltar', code: 'GI'},
    {name: 'Greece', code: 'GR'},
    {name: 'Greenland', code: 'GL'},
    {name: 'Grenada', code: 'GD'},
    {name: 'Guadeloupe', code: 'GP'},
    {name: 'Guam', code: 'GU'},
    {name: 'Guatemala', code: 'GT'},
    {name: 'Guernsey', code: 'GG'},
    {name: 'Guinea', code: 'GN'},
    {name: 'Guinea-Bissau', code: 'GW'},
    {name: 'Guyana', code: 'GY'},
    {name: 'Haiti', code: 'HT'},
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
    {name: 'Holy See (Vatican City State)', code: 'VA'},
    {name: 'Honduras', code: 'HN'},
    {name: 'Hong Kong', code: 'HK'},
    {name: 'Hungary', code: 'HU'},
    {name: 'Iceland', code: 'IS'},
    {name: 'India', code: 'IN'},
    {name: 'Indonesia', code: 'ID'},
    {name: 'Iran, Islamic Republic Of', code: 'IR'},
    {name: 'Iraq', code: 'IQ'},
    {name: 'Ireland', code: 'IE'},
    {name: 'Isle of Man', code: 'IM'},
    {name: 'Israel', code: 'IL'},
    {name: 'Italy', code: 'IT'},
    {name: 'Jamaica', code: 'JM'},
    {name: 'Japan', code: 'JP'},
    {name: 'Jersey', code: 'JE'},
    {name: 'Jordan', code: 'JO'},
    {name: 'Kazakhstan', code: 'KZ'},
    {name: 'Kenya', code: 'KE'},
    {name: 'Kiribati', code: 'KI'},
    {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
    {name: 'Korea, Republic of', code: 'KR'},
    {name: 'Kuwait', code: 'KW'},
    {name: 'Kyrgyzstan', code: 'KG'},
    {name: 'Lao People\'S Democratic Republic', code: 'LA'},
    {name: 'Latvia', code: 'LV'},
    {name: 'Lebanon', code: 'LB'},
    {name: 'Lesotho', code: 'LS'},
    {name: 'Liberia', code: 'LR'},
    {name: 'Libyan Arab Jamahiriya', code: 'LY'},
    {name: 'Liechtenstein', code: 'LI'},
    {name: 'Lithuania', code: 'LT'},
    {name: 'Luxembourg', code: 'LU'},
    {name: 'Macao', code: 'MO'},
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
    {name: 'Madagascar', code: 'MG'},
    {name: 'Malawi', code: 'MW'},
    {name: 'Malaysia', code: 'MY'},
    {name: 'Maldives', code: 'MV'},
    {name: 'Mali', code: 'ML'},
    {name: 'Malta', code: 'MT'},
    {name: 'Marshall Islands', code: 'MH'},
    {name: 'Martinique', code: 'MQ'},
    {name: 'Mauritania', code: 'MR'},
    {name: 'Mauritius', code: 'MU'},
    {name: 'Mayotte', code: 'YT'},
    {name: 'Mexico', code: 'MX'},
    {name: 'Micronesia, Federated States of', code: 'FM'},
    {name: 'Moldova, Republic of', code: 'MD'},
    {name: 'Monaco', code: 'MC'},
    {name: 'Mongolia', code: 'MN'},
    {name: 'Montserrat', code: 'MS'},
    {name: 'Morocco', code: 'MA'},
    {name: 'Mozambique', code: 'MZ'},
    {name: 'Myanmar', code: 'MM'},
    {name: 'Namibia', code: 'NA'},
    {name: 'Nauru', code: 'NR'},
    {name: 'Nepal', code: 'NP'},
    {name: 'Netherlands', code: 'NL'},
    {name: 'Netherlands Antilles', code: 'AN'},
    {name: 'New Caledonia', code: 'NC'},
    {name: 'New Zealand', code: 'NZ'},
    {name: 'Nicaragua', code: 'NI'},
    {name: 'Niger', code: 'NE'},
    {name: 'Nigeria', code: 'NG'},
    {name: 'Niue', code: 'NU'},
    {name: 'Norfolk Island', code: 'NF'},
    {name: 'Northern Mariana Islands', code: 'MP'},
    {name: 'Norway', code: 'NO'},
    {name: 'Oman', code: 'OM'},
    {name: 'Pakistan', code: 'PK'},
    {name: 'Palau', code: 'PW'},
    {name: 'Palestinian Territory, Occupied', code: 'PS'},
    {name: 'Panama', code: 'PA'},
    {name: 'Papua New Guinea', code: 'PG'},
    {name: 'Paraguay', code: 'PY'},
    {name: 'Peru', code: 'PE'},
    {name: 'Philippines', code: 'PH'},
    {name: 'Pitcairn', code: 'PN'},
    {name: 'Poland', code: 'PL'},
    {name: 'Portugal', code: 'PT'},
    {name: 'Puerto Rico', code: 'PR'},
    {name: 'Qatar', code: 'QA'},
    {name: 'Reunion', code: 'RE'},
    {name: 'Romania', code: 'RO'},
    {name: 'Russian Federation', code: 'RU'},
    {name: 'RWANDA', code: 'RW'},
    {name: 'Saint Helena', code: 'SH'},
    {name: 'Saint Kitts and Nevis', code: 'KN'},
    {name: 'Saint Lucia', code: 'LC'},
    {name: 'Saint Pierre and Miquelon', code: 'PM'},
    {name: 'Saint Vincent and the Grenadines', code: 'VC'},
    {name: 'Samoa', code: 'WS'},
    {name: 'San Marino', code: 'SM'},
    {name: 'Sao Tome and Principe', code: 'ST'},
    {name: 'Saudi Arabia', code: 'SA'},
    {name: 'Senegal', code: 'SN'},
    {name: 'Serbia and Montenegro', code: 'CS'},
    {name: 'Seychelles', code: 'SC'},
    {name: 'Sierra Leone', code: 'SL'},
    {name: 'Singapore', code: 'SG'},
    {name: 'Slovakia', code: 'SK'},
    {name: 'Slovenia', code: 'SI'},
    {name: 'Solomon Islands', code: 'SB'},
    {name: 'Somalia', code: 'SO'},
    {name: 'South Africa', code: 'ZA'},
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
    {name: 'Spain', code: 'ES'},
    {name: 'Sri Lanka', code: 'LK'},
    {name: 'Sudan', code: 'SD'},
    {name: 'Suriname', code: 'SR'},
    {name: 'Svalbard and Jan Mayen', code: 'SJ'},
    {name: 'Swaziland', code: 'SZ'},
    {name: 'Sweden', code: 'SE'},
    {name: 'Switzerland', code: 'CH'},
    {name: 'Syrian Arab Republic', code: 'SY'},
    {name: 'Taiwan, Province of China', code: 'TW'},
    {name: 'Tajikistan', code: 'TJ'},
    {name: 'Tanzania, United Republic of', code: 'TZ'},
    {name: 'Thailand', code: 'TH'},
    {name: 'Timor-Leste', code: 'TL'},
    {name: 'Togo', code: 'TG'},
    {name: 'Tokelau', code: 'TK'},
    {name: 'Tonga', code: 'TO'},
    {name: 'Trinidad and Tobago', code: 'TT'},
    {name: 'Tunisia', code: 'TN'},
    {name: 'Turkey', code: 'TR'},
    {name: 'Turkmenistan', code: 'TM'},
    {name: 'Turks and Caicos Islands', code: 'TC'},
    {name: 'Tuvalu', code: 'TV'},
    {name: 'Uganda', code: 'UG'},
    {name: 'Ukraine', code: 'UA'},
    {name: 'United Arab Emirates', code: 'AE'},
    {name: 'United Kingdom', code: 'GB'},
    {name: 'United States', code: 'US'},
    {name: 'United States Minor Outlying Islands', code: 'UM'},
    {name: 'Uruguay', code: 'UY'},
    {name: 'Uzbekistan', code: 'UZ'},
    {name: 'Vanuatu', code: 'VU'},
    {name: 'Venezuela', code: 'VE'},
    {name: 'Viet Nam', code: 'VN'},
    {name: 'Virgin Islands, British', code: 'VG'},
    {name: 'Virgin Islands, U.S.', code: 'VI'},
    {name: 'Wallis and Futuna', code: 'WF'},
    {name: 'Western Sahara', code: 'EH'},
    {name: 'Yemen', code: 'YE'},
    {name: 'Zambia', code: 'ZM'},
    {name: 'Zimbabwe', code: 'ZW'}
  ];

}




