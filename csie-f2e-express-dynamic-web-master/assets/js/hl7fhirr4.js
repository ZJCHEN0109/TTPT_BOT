const Person = [
    {
        "resourceType": "Person",
        "active": "",
        "id": "",
        "image":"",
        "email": "",
        "identifier":
        {
            "use": ["usual", "official", "temp", "secondary", "old"],
            "type": "",
            "system": "",
            "value": "",
            "period": "",
            "assigner": "",
            "Facebook": "",
            "Line": "",
            "email": "",
            "nhicord":""
        },
        "name":
        {
            "use": ["usual", "official", "temp", "nickname", "anonymous", "old", "maiden"],
            "text": "",
            "family": "",
            "given": ""
        },
        "telecom": 
            {
                "use": [{"home":""},{"mobile":""}],
                "system": "phone",
                "value": ""
            },
    "gender": "",
    "birthDate": "",
    "address": 
            {
                "use": "home",
                "line": "",
                "city": "",
                "state": "",
                "postalCode": ""
            },
    "qualification": 
              {
                "identifier":{
                    "system": "",
                    "value": ""
                  },
                "code": {
                  "coding":
                    {
                      "system": "",
                      "code": "",
                      "display": ""
                    },
                },
                "period": {
                    "start": ""
                  },
                  "issuer": {
                    "display": ""
                  },
                  "text": ""
                },
    "link":
        {
          "target": {
             "reference": "",
               "display": ""
                    }
        }
            
      }
]

const Schedule = [
    {
        "resourceType": "Schedule",
        "id": "example",
        "text": {
            "status": "generated",
            "div": ""
        },
        "identifier": [
            {
                "use": "usual",
                "system": "",
                "value": ""
            }
        ],
        "active": true,
        "serviceCategory": [
            {
                "coding": [
                    {
                        "code": "",
                        "display": ""
                    }
                ]
            }
        ],
        "serviceType": [
            {
                "coding": [
                    {
                        "code": "",
                        "display": ""
                    }
                ]
            }
        ],
        "specialty": [
            {
                "coding": [
                    {
                        "code": "",
                        "display": ""
                    }
                ]
            }
        ],
        "actor": [
            {
                "reference": "",
                "display": ""
            }
        ],
        "planningHorizon": {
            "start": "",
            "end": ""
        },
        "comment": ""
    }
]

const Appointment = [
    {
        "resourceType": "Appointment",
        "id": "example",
        "text": {
            "status": "generated",
            "div": ""
        },
        "status": "booked",
        "serviceCategory": [
            {
                "coding": [
                    {
                        "system": "",
                        "code": "",
                        "display": ""
                    }
                ]
            }
        ],
        "serviceType": [
            {
                "coding": [
                    {
                        "code": "",
                        "display": ""
                    }
                ]
            }
        ],
        "specialty": [
            {
                "coding": [
                    {
                        "system": "",
                        "code": "",
                        "display": ""
                    }
                ]
            }
        ],
        "appointmentType": {
            "coding": [
                {
                    "system": "",
                    "code": "",
                    "display": ""
                }
            ]
        },
        "reasonReference": [
            {
                "reference": "",
                "display": ""
            }
        ],
        "priority": 5,
        "description": "",
        "start": "",
        "end": "",
        "created": "",
        "comment": "",
        "basedOn": [
            {
                "reference": ""
            }
        ],
        "participant": [
            {
                "actor": {
                    "reference": "",
                    "display": ""
                },
                "required": "",
                "status": ""
            },
            {
                "type": [
                    {
                        "coding": [
                            {
                                "system": "",
                                "code": ""
                            }
                        ]
                    }
                ],
                "actor": {
                    "reference": "",
                    "display": ""
                },
                "required": "",
                "status": ""
            },
            {
                "actor": {
                    "reference": "",
                    "display": ""
                },
                "required": "",
                "status": ""
            }
        ]
    }
]

const AppointmentResponse = [
    {
        "resourceType": "AppointmentResponse",
        "id": "example",
        "text": {
            "status": "generated",
            "div": ""
        },
        "appointment": {
            "reference": "",
            "display": ""
        },
        "actor": {
            "reference": "",
            "display": ""
        },
        "participantStatus": ""
    }
]