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
      'condition': [
        {'name': 'councilRefAllocated', 'value': true}
      ]
    }
  ],
  'state': [
    {'name': 'targetOrg', 'value': 4},
    {'name': 'agentOrApplicant', 'value': 1},
    {'name': 'councilRefAllocated', 'value': false},
    {'name': 'refNumber', 'value': 'Abc1234'}
  ]
}
