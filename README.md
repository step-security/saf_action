[![StepSecurity Maintained Action](https://raw.githubusercontent.com/step-security/maintained-actions-assets/main/assets/maintained-action-banner.png)](https://docs.stepsecurity.io/actions/stepsecurity-maintained-actions)

# saf_action
GitHub Action for the [SAF CLI](https://github.com/mitre/saf)

## Input and Output Arguments
### Input
#### `command_string` (Required)

Command string to be executed by SAF CLI. The action will run `saf <command_string>`.

Example:

* `convert asff2hdf -i asff-findings.json -o output-file-name.json`
* More examples can be found at [SAF CLI Usage](https://github.com/mitre/saf#usage).
* NOTE: This action does not support `view heimdall` or input file-type detection (i.e omission of the expected conversion type).

### Output

As determined by input command.

## Secrets

This action does not use any GitHub secrets.

## Example

Below is an example action.

```
on: [push]
jobs:
  saf_hdf_conversion:
    runs-on: ubuntu-latest
    name: SAF CLI Convert ASFF to HDF
    steps:
      - name: Checkout
        uses: actions/checkout@v7
      - name: Convert ASFF
        uses: step-security/saf_action@v1
        with:
          command_string: 'convert asff2hdf -i asff_sample.json -o asff_sample_hdf.json'
      - name: Artifacts
        uses: actions/upload-artifact@v7
        if: success()
        with:
          name: asff
          path: asff_sample_hdf.json
```

For more examples, check out [this workflow](https://github.com/step-security/saf_action/blob/main/.github/workflows/example-usages.yml).

## Issues and Support

### Issues and Support

Please feel free to contact us by **opening an issue** on the issue board, or, at [security@stepsecurity.io](mailto:security@stepsecurity.io) should you have any suggestions, questions or issues.

### NOTICE

© 2022 The MITRE Corporation.
Copyright 2026 StepSecurity

Approved for Public Release; Distribution Unlimited. Case Number 18-3678.

### NOTICE

MITRE hereby grants express written permission to use, reproduce, distribute, modify, and otherwise leverage this software to the extent permitted by the licensed terms provided in the LICENSE.md file included with this project.

### NOTICE

This software was produced for the U. S. Government under Contract Number HHSM-500-2012-00008I, and is subject to Federal Acquisition Regulation Clause 52.227-14, Rights in Data-General.

No other use other than that granted to the U. S. Government, or to those acting on behalf of the U. S. Government under that Clause is authorized without the express written permission of The MITRE Corporation.

For further information, please contact The MITRE Corporation, Contracts Management Office, 7515 Colshire Drive, McLean, VA 22102-7539, (703) 983-6000.
