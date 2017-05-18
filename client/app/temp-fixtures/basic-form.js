export default {
  'formTemplate': {
    // Ignore for now
  },
  'components': [
    {
      'name': 'targetOrg',
      'label': 'Application To',
      'help': 'Select the target regional or district council which is appropriate',
      'type': 'select',
      'options': [
        {'value': 1, 'label': 'Marlborough District Council'},
        {'value': 4, 'label': 'Otago Regional Council'},
        {'value': 5, 'label': 'Queenstown Lakes District Council'}
      ],
      'repeatable': false
    },
    {
      'name': 'agentOrApplicant',
      'label': 'Are you an...',
      'type': 'radio',
      'options': [
        {'value': 1, 'label': 'Applicant'},
        {'value': 2, 'label': 'Agent'}
      ],
      'repeatable': false
    },
    {
      'name': 'councilRefAllocated',
      'label': 'Has a council reference been allocated?',
      'type': 'radio',
      'options': [
        {'value': true, 'label': 'Yes'},
        {'value': false, 'label': 'No'}
      ],
      'repeatable': false
    },
    {
      'name': 'refNumber',
      'label': 'Reference number',
      'type': 'text',
      'repeatable': false,
      'conditions': [
        {'name': 'councilRefAllocated', 'value': true}
      ]
    },
    {
      'name': 'affectedParties',
      'label': 'Affected Parties',
      'type': 'text',
      'repeatable': true
    },
    {
      'name': 'affectedAreas',
      'label': 'Which area is affected?',
      'type': 'radio',
      'options': [
        {'value': 1, 'label': 'Coastal'},
        {'value': 2, 'label': 'Forest'},
        {'value': 3, 'label': 'Lakes'},
        {'value': 4, 'label': 'Plains'}
      ],
      'repeatable': true
    },
    {
      'name': 'applications',
      'type': 'section',
      'repeatable': true,
      'components': [
        {
          'name': 'applicantType',
          'label': 'Type',
          'type': 'radio',
          'options': [
            {'value': 1, 'label': 'Individual'},
            {'value': 2, 'label': 'Company'},
            {'value': 3, 'label': 'Trust'}
          ]
        },
        {
          'name': 'individual',
          'type': 'section',
          'conditions': [{
            'name': 'applicantType', 'value': 1
          }],
          'components': [
            {
              'name': 'firstName',
              'label': 'First name(s)',
              'help': 'Some help text',
              'type': 'text'
            },
            {
              'name': 'lastName',
              'label': 'Last Name',
              'type': 'text'
            }
          ]
        },
        {
          'name': 'company',
          'type': 'section',
          'conditions': [{'name': 'applicantType', 'value': 2}],
          'components': [
            {
              'name': 'companyName',
              'label': 'Company Name',
              'help': 'Some help text',
              'type': 'text'
            },
            {
              'name': 'companyNumber',
              'label': 'Registered Company Number',
              'type': 'text'
            }
          ]
        },
        {
          'name': 'trust',
          'type': 'section',
          'conditions': [{'name': 'applicantType', 'value': 3}],
          'components': [
            {
              'name': 'trustName',
              'label': 'Trust Name',
              'help': 'Some help text',
              'type': 'text'
            },
            {
              'name': 'trustNumber',
              'label': 'Registered Trust Number',
              'type': 'text'
            }
          ]
        }
      ]
    }
  ],

  'state': {
    targetOrg: [4],
    agentOrApplicant: [1],
    councilRefAllocated: [false],
    affectedParties: ['Peter', 'Michael'],
    affectedAreas: [null],
    applications: [{
      applicantType: [2]
    }]
  }
  // state: [
  //   {'name': 'targetOrg', 'value': [4]},
  //   {'name': 'agentOrApplicant', 'value': [1]},
  //   {'name': 'councilRefAllocated', 'value': [false]},
  //   {'name': 'refNumber', 'value': ['Abc1234']},
  //   {'name': 'affectedParties', 'value': ['Peter', 'Michael']}
  // ]
  // ]
}
